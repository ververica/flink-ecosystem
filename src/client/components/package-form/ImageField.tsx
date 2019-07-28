import React, { useCallback, useContext, useState, useEffect, FC } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider } from "./PackageForm";
import styled from "styled-components/macro";
import cx from "classnames";
import { FormFeedback } from "reactstrap";

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

export const ImageField: FC = () => {
  const { inputs, error } = useContext(FormProvider);
  const [imageError, setImageError] = useState(error);

  const [thumbnail, setThumbnail] = useState(() => {
    if (inputs.image_id) {
      return `/api/v1/images/${inputs.slug}`;
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

      try {
        setThumbnail(URL.createObjectURL(firstThumbnail));
        inputs.image = data;
      } catch (e) {
        setImageError({
          id: "image",
          message: "filetype not supported",
        });
      }
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
      <label htmlFor="image">
        Image
        <small className="text-muted font-italic"> - Optional</small>
      </label>
      <ImageCard
        {...getRootProps()}
        className={cx("card form-control", {
          "is-invalid": imageError.id === "image",
        })}
      >
        <div className="card-body d-flex flex-column justify-content-center">
          <input name="image" {...getInputProps()} />
          {thumbnail ? (
            <Image src={thumbnail} />
          ) : isDragActive ? (
            <p>Drop your image here.</p>
          ) : (
            <p>
              Drag 'n' drop an image,
              <br />
              or click to select one.
            </p>
          )}
        </div>
      </ImageCard>
      <FormFeedback>{imageError.message}</FormFeedback>
      <small className="form-text text-muted">
        Supports <code>gif</code>, <code>png</code>, and <code>jpg</code>.
      </small>
    </div>
  );
};
