import React, { FC, ReactNode } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const ConfirmModal: FC<Props> = props => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClosed={props.onClosed}
      backdropTransition={{ timeout: 75 }}
      modalTransition={{ timeout: 150 }}
    >
      <ModalHeader>{props.header}</ModalHeader>
      <ModalBody>{props.message} </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          color="secondary"
          outline
          onClick={props.handleCancel}
        >
          Cancel
        </Button>
        <Button size="sm" color="danger" onClick={props.handleConfirm}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

type Props = {
  handleCancel: () => void;
  handleConfirm: () => void;
  header: ReactNode;
  isOpen: boolean;
  message: ReactNode;
  onClosed: () => void;
};
