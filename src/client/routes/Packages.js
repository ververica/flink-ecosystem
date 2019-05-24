import React, { useState } from "react";
import MainCard from "client/components/MainCard";
import Modal from "client/components/Modal";
import getFormData from "get-form-data";
import axios from "axios";
import { useGet } from "client/helpers/useAxios";

export default function Packages() {
  const [modalOpen, setModalOpen] = useState(false);
  const [packages, loading] = useGet("/api/v1/packages");

  return (
    <>
      <MainCard
        header={
          <>
            <h2 className="h5 mb-0">Most Popular Packages (15)</h2>
            <button
              className="btn btn-primary ml-auto btn-sm"
              onClick={() => setModalOpen(true)}
            >
              Add New Package
            </button>
          </>
        }
      >
        <div>packages</div>
        <pre>{JSON.stringify(packages, null, 2)}</pre>
        <div className="row">
          <div className="col-auto ml-auto" />
        </div>
      </MainCard>
      <Modal
        open={modalOpen}
        onModalHidden={() => setModalOpen(false)}
        title={"Add New Package"}
      >
        <form
          onSubmit={async e => {
            e.preventDefault();
            const data = getFormData(e.target);
            await axios.post("/api/v1/packages", data);
            setModalOpen(false);
          }}
        >
          <div class="form-group">
            <label for="packageName">Package Name</label>
            <input
              type="text"
              class="form-control"
              id="packageName"
              placeholder="Package Name"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Package ID</label>
            <input
              type="text"
              class="form-control"
              id="packageId"
              placeholder="Package ID"
              aria-describedBy="idHelp"
            />
            <small id="idHelp" class="form-text text-muted">
              A unique URL Friendly name for your package. [a-z-_]{"{"}2,{"}"}
            </small>
          </div>
        </form>
      </Modal>
    </>
  );
}
