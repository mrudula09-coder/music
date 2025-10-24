import React from 'react';
import { useMusic } from '../context/MusicContext';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts, removeToast } = useMusic();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;