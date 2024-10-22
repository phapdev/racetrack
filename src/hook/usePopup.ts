import { useState } from 'react';

const usePopup = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showPopup = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3500); // Ẩn sau 3 giây
  };

  return { message, showPopup };
};

export default usePopup;