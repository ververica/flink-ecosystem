import React, { useState, useContext, useRef } from "react";
import SelectField from "./SelectField";
import InputField from "./InputField";
import { FormProvider } from "./PackageForm";

const licenses = [
  "MIT License",
  "GPLv3",
  "BSD License",
  "LGPL",
  "Apache 2.0",
  "Eclipse License",
  "Other...",
];

export default function LicenseField() {
  const { handleInputChange } = useContext(FormProvider);
  const [showFreeformField, setShowFreeformField] = useState(false);
  const ref = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Other...") {
      e.target.value = "";
      handleInputChange(e);
      setShowFreeformField(true);
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
        }
      });
    }
  };

  const basicProps = {
    id: "license",
    label: "License",
    name: "license",
  };

  return showFreeformField ? (
    <InputField inputRef={ref} {...basicProps} placeholder="Custom license" />
  ) : (
    <SelectField
      {...basicProps}
      handleChange={handleChange}
      options={licenses}
      placeholder="Select a License"
    />
  );
}
