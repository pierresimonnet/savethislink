import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
    document.body.classList.toggle("modal-isopen");
  }

  return { isShowing, toggle };
};

export default useModal;
