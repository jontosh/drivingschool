export const useURLSearchParams = (name) => {
  return new URLSearchParams(window.location.search).get(name);
};
