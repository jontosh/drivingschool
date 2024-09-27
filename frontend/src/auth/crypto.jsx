import CryptoJS from "crypto-js";

export const Crypto = (auth, key) => {
  // Функция для шифрования данных
  function encryptData(data, secretKey) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  }

  // Функция для расшифровки данных
  function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    // Проверка на пустую строку
    if (!decryptedText) {
      throw new Error("Decryption failed or resulted in empty string");
    }
    return JSON.parse(decryptedText);
  }

  // Данные для хранения
  const authData = auth;

  // Секретный ключ для шифрования (выберите свой ключ)
  const secretKey = key;

  // Шифруем данные
  const encryptedAuthData = encryptData(authData, secretKey);

  let decryptedAuthData = null;
  if (auth) {
    try {
      decryptedAuthData = decryptData(auth, secretKey);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  }

  return { decrypted: decryptedAuthData, encrypted: encryptedAuthData };
};
