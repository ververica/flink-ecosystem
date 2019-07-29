import Axios from "axios";
import cx from "classnames";
import React, { SyntheticEvent, useState } from "react";
import { ConfirmModal } from "client/components/ConfirmModal";
import { faEdit, faTools, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "client/components/Icon";
import { Link } from "@reach/router";
import { useHistory, useOutsideClick } from "client/helpers";

export default function PackageOptions(props: PackageOptionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { navigate } = useHistory();

  const ref = useOutsideClick(() => {
    if (showDropdown) setShowDropdown(false);
  });

  const handleDeleteClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    setTimeout(() => setConfirm(true));
  };

  const handleDelete = (slug: string) => async () => {
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
      <ConfirmModal
        handleCancel={() => setConfirm(false)}
        handleConfirm={handleDelete(props.slug)}
        header={
          <>
            Are you sure you want to delete the package "
            <code>{props.name}</code>"?
          </>
        }
        isOpen={confirm}
        message={
          <>
            Are you sure you want to delete the package "
            <code>{props.name}</code>"? You cannot undo this action, and the
            package id <kbd>{props.slug}</kbd> will remain unavailable.
          </>
        }
        onClosed={() => setConfirm(false)}
      />
    </>
  );
}

type PackageOptionsProps = {
  slug: string;
  name: string;
};
