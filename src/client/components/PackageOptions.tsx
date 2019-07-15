import React, { useState, SyntheticEvent } from "react";
import useOutsideClick from "client/helpers/useOutsideClick";
import cx from "classnames";
import Axios from "axios";
import Modal from "./Modal";
import { Link } from "@reach/router";
import useLocation from "client/helpers/useLocation";
import { Icon } from "./Icon";
import { faTools, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function PackageOptions(props: PackageOptionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { navigate } = useLocation();

  const ref = useOutsideClick(() => {
    if (showDropdown) setShowDropdown(false);
  });

  const handleDeleteClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setConfirm(true);
    setShowDropdown(false);
  };

  const handleDelete = (slug: string) => async (e: SyntheticEvent) => {
    e.preventDefault();
    setShowDropdown(false);

    try {
      await Axios.delete(`/api/v1/packages/${slug}`);
      navigate("/");
    } catch (e) {
      // @TODO show toast for broken request
    }
    setConfirm(false);
  };

  return (
    <>
      <div className={cx("dropdown", { show: showDropdown })}>
        <button
          className="btn btn-light dropdown-toggle btn-sm"
          type="button"
          aria-haspopup="true"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Icon icon={faTools} marginRight={0} title="Tools" />
        </button>
        <div
          className={cx("dropdown-menu dropdown-menu-right", {
            show: showDropdown,
          })}
          ref={ref}
        >
          <Link to="edit" className="dropdown-item">
            <Icon icon={faEdit} fw={false} title="edit" /> Edit
          </Link>
          <a
            href="#delete"
            className="dropdown-item"
            onClick={handleDeleteClick}
          >
            <Icon icon={faTrashAlt} fw={false} title="trash" /> Delete
          </a>
        </div>
      </div>
      <Modal
        open={confirm}
        title="Are you sure?"
        onModalHidden={() => setConfirm(false)}
        actions={
          <>
            <button
              className="btn btn-sm btn-default"
              onClick={() => setConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={handleDelete(props.slug)}
            >
              Delete
            </button>
          </>
        }
      >
        Are you sure you want to delete the package "<code>{props.name}</code>"?
        You cannot undo this action, and the package id <kbd>{props.slug}</kbd>{" "}
        will remain unavailable.
      </Modal>
    </>
  );
}

type PackageOptionsProps = {
  slug: string;
  name: string;
};
