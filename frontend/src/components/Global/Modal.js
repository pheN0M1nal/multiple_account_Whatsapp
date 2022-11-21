import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxWidth: "max-content",
    borderRadius: "5px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "var(--custom-primary-bg)",
    padding: "2rem 3rem",
    maxHeight: "90vh",
    overflowY: "scroll",
  },
};

Modal.setAppElement("#root");

export const ModalComponent = ({
  children,
  isOpen,
  callbackOnAfterOpen,
  callbackCloseModal,
  modalLabel = "",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={callbackOnAfterOpen}
      onRequestClose={callbackCloseModal}
      style={customStyles}
      contentLabel={modalLabel}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
};
