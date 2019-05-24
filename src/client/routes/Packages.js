import React, { useState } from "react";
import MainCard from "client/components/MainCard";
import Modal from "client/components/Modal";
import getFormData from "get-form-data";
import axios from "axios";
import { useGet } from "client/helpers/useAxios";

export default function Packages(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [packages] = useGet("/api/v1/packages");

  return (
    <>
      <MainCard
        header={
          <>
            <h2 className="h5 mb-0">Most Popular Packages (15)</h2>
            {props.userLogin && (
              <button
                className="btn btn-primary ml-auto btn-sm"
                onClick={() => setModalOpen(true)}
              >
                <i className="far fa-plus mr-2" />
                Add New Package
              </button>
            )}
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
        enableBackdropClick={false}
        open={modalOpen}
        onModalHidden={() => setModalOpen(false)}
        title={"Add New Package"}
      >
        <form
          onSubmit={async e => {
            e.preventDefault();
            const data = getFormData(e.target);
            try {
              await axios.post("/api/v1/packages", data);
              setModalOpen(false);
            } catch (e) {
              if (e.response.status && e.response.status === 403) {
                // require Auth!
                debugger;
              }
            }
          }}
        >
          <div className="form-group">
            <label htmlFor="packageName">Package Name</label>
            <input
              type="text"
              className="form-control"
              id="packageName"
              placeholder="Package Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Package ID</label>
            <input
              type="text"
              className="form-control"
              id="packageId"
              placeholder="Package ID"
              aria-describedby="idHelp"
            />
            <small id="idHelp" className="form-text text-muted">
              A unique URL Friendly name for your package. [a-z-_]{"{"}2,{"}"}
            </small>
          </div>
          <button type="submit">go</button>
        </form>
      </Modal>
    </>
  );
}
