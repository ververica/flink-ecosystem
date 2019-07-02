import React, { useCallback, useContext, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider } from "./PackageForm";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 200px;
`;

export default function ImageUpload() {
  const { inputs } = useContext(FormProvider);
  const [thumbnail, setThumbnail] = useState(() => {
    if (inputs.image_id) {
      return {
        preview: `http://localhost:3000/api/v1/images/${inputs.image_id}`,
      };
    }
  });

  const onDrop = useCallback(([firstThumbnail]) => {
    const data = new FormData();
    data.append("image", firstThumbnail);
    inputs["image"] = data;

    setThumbnail(
      Object.assign(firstThumbnail, {
        preview: URL.createObjectURL(firstThumbnail),
      })
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    if (thumbnail) {
      return () => {
        // Make sure to revoke the data uris to avoid memory leaks
        URL.revokeObjectURL(thumbnail.preview);
      };
    }
  }, [thumbnail]);

  return (
    <div className="form-group flex-grow-1 d-flex flex-column">
      <label htmlFor="image">Image</label>
      <div
        className="card align-items-center justify-content-center flex-grow-1"
        {...getRootProps()}
      >
        <div className="card-body d-flex flex-column justify-content-center">
          <input name="image" {...getInputProps()} />
          {thumbnail ? (
            <Image src={thumbnail.preview} />
          ) : isDragActive ? (
            <p>Drop your image here ...</p>
          ) : (
            <p>Drag 'n' drop an image, or click to select one.</p>
          )}
        </div>
      </div>
    </div>
  );
}
