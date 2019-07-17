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
      setShowFreeformField(true);
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
        }
      });
    }
    handleInputChange(e);
  };

  const basicProps = {
    id: "license",
    label: "License",
    name: "license",
  };

  const licenseOptions = licenses.map(value => ({ value, name: value }));

  return showFreeformField ? (
    <InputField inputRef={ref} {...basicProps} placeholder="Custom license" />
  ) : (
    <SelectField
      {...basicProps}
      handleChange={handleChange}
      options={licenseOptions}
      placeholder="Select a License"
    />
  );
}
