import { useEffect } from "react";

export const useTitle = (title) => {
  useEffect(() => {
    document.title = `Learn Sharp  | ${title}`;
  }, [title]);
};
