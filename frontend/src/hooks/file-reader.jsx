import ButtonComponent from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Image } from "antd";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";

export const useFileReader = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [File, setFile] = useState({});
  const [Result, setResult] = useState(
    "https://www.certificate.digital/images/theme/resize/cropping.webp",
  );

  useEffect(() => {
    if (
      File.type === "image/jpeg" ||
      File.type === "image/jpg" ||
      File.type === "image/png"
    ) {
      const readerFile = new FileReader();

      readerFile.addEventListener("load", () => {
        setResult(readerFile.result);
      });

      readerFile.addEventListener("error", () => {
        setResult(
          "https://www.certificate.digital/images/theme/resize/cropping.webp",
        );
      });

      readerFile.readAsDataURL(File);
    } else {
      setResult(
        "https://www.certificate.digital/images/theme/resize/cropping.webp",
      );
    }
  }, [File?.type]);

  const FileReaderResult = ({ title, className, ...props }) => (
    <div className={classNames("relative inline-block w-full", className)}>
      <input
        className={"opacity-0 absolute top-0 left-0 -z-10"}
        type={
          Result ===
          "https://www.certificate.digital/images/theme/resize/cropping.webp"
            ? "file"
            : undefined
        }
        onChange={(e) => setFile(e.target.files[0])}
      />
      <Image
        className={"object-cover"}
        src={Result}
        srcSet={Result}
        alt={title}
      />
    </div>
  );

  return { FileReaderResult, Result };
};
