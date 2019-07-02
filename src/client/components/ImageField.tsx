import React, { useCallback, useContext, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider } from "./PackageForm";
import styled from "styled-components";
import cx from "classnames";

const Image = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 200px;
`;

const ImageCard = styled.div`
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  padding: 0;
  height: auto;
`;

export default function ImageUpload() {
  const { inputs, error } = useContext(FormProvider);
  const [thumbnail, setThumbnail] = useState(() => {
    if (inputs.image_id) {
      return `http://localhost:3000/api/v1/images/${inputs.slug}`;
    }
  });

  useEffect(() => {
    if (thumbnail) {
      // Make sure to revoke the data uris to avoid memory leaks
      return () => URL.revokeObjectURL(thumbnail);
    }
  }, [thumbnail]);

  const onDrop = useCallback(
    ([firstThumbnail]) => {
      const data = new FormData();
      data.append("image", firstThumbnail);
      inputs["image"] = data;

      setThumbnail(URL.createObjectURL(firstThumbnail));
    },
    [inputs]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="form-group flex-grow-1 d-flex flex-column">
      <label htmlFor="image">Image</label>
      <ImageCard
        {...getRootProps()}
        className={cx("card form-control", {
          "is-invalid": error.id === "image",
        })}
      >
        <div className="card-body d-flex flex-column justify-content-center">
          <input name="image" {...getInputProps()} />
          {thumbnail ? (
            <Image src={thumbnail} />
          ) : isDragActive ? (
            <p>Drop your image here ...</p>
          ) : (
            <p>Drag 'n' drop an image, or click to select one.</p>
          )}
        </div>
      </ImageCard>
      <small className="form-text text-muted">
        Supported image types: gif/png/jpg
      </small>
      <div className="invalid-feedback">{error.message}</div>
    </div>
  );
}
