// Modal.jsx
import { createPortal } from 'react-dom';

export default function Modal({ children }) {
  const modalRoot = document.getElementById('modal-root');
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    modalRoot
  );
}
