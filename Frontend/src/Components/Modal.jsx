const Modal = ({ title, children, onClose, actions }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__actions">{actions}</div>
      </div>
    </div>
  );
};

export default Modal;
