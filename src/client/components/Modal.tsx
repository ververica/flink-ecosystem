import React, { useState, useEffect, useRef, ReactNode } from "react";
import cx from "classnames";
import ReactDOM from "react-dom";

const Dialog = (props: DialogProps) => {
  const ref = useRef<HTMLDivElement>(document.createElement("div"));

  const handleClick = (e: any) => {
    if (ref.current.contains(e.target)) return;
    props.hideModal();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  return (
    <div className="modal-dialog" role="document" ref={ref}>
      {props.children}
    </div>
  );
};

const useModal = (props: ModalProps) => {
  const [modalShown, setModalShown] = useState(false);
  const [modalDisplay, setModalDisplay] = useState("none");
  const modalRef = useRef(null);

  const showModal = () => setModalDisplay("block");
  const hideModal = () => setModalShown(false);

  // To get the transition to work, you have to set 'display:block' *before*
  // you add add the class to start the transition
  useEffect(() => {
    if (modalDisplay === "block") setTimeout(() => setModalShown(true));
  }, [modalDisplay]);

  // Allow the modal to be controlled from outside.
  useEffect(() => {
    setTimeout(() => {
      if (props.open) showModal();
      else hideModal();
    });
  }, [props.open]);

  // Wait for the transition to end before hiding the modal.
  const onTransitionEnd = (e: any) => {
    // We only want to run this timeout on some specific conditions
    // 1. Are we already trying to hide the modal
    // 2. Is the modal it self what fired this event
    // 3. is the property that finished the 'opacity'
    if (
      !modalShown &&
      modalRef.current === e.target &&
      e.propertyName === "opacity"
    ) {
      setTimeout(() => setModalDisplay("none"));
      props.onModalHidden();
    }
  };

  const modalProps = {
    ref: modalRef,
    onTransitionEnd,
    className: cx("modal fade", { show: modalShown }),
    style: { display: modalDisplay },
  };

  const backdrop = modalDisplay === "block" && (
    <div className={cx("modal-backdrop fade", { show: modalShown })} />
  );

  return { hideModal, modalProps, backdrop, modalDisplay };
};

export default function Modal(props: ModalProps) {
  const { hideModal, modalProps, backdrop } = useModal(props);

  // Dialog needs to be unrendered while the modal is hidden so the click
  // handler is not active all the time. Side benefit, it unmounts the children
  // too. (Form resets, nice!) :)
  return ReactDOM.createPortal(
    <>
      <div {...modalProps} tabIndex={-1} role="dialog">
        {modalProps.style.display === "block" && (
          <Dialog hideModal={hideModal}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={hideModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{props.children}</div>
              <div className="modal-footer">{props.actions}</div>
            </div>
          </Dialog>
        )}
      </div>
      {backdrop}
    </>,
    document.body
  );
}

Modal.defaultProps = {
  onModalHidden: () => {},
};

type DialogProps = {
  hideModal: () => void;
  children: ReactNode;
};

type ModalProps = {
  actions?: ReactNode;
  title: string;
  children: ReactNode;
  open: boolean;
} & Readonly<typeof Modal.defaultProps>;
