/// <reference types="react-scripts" />

declare module "get-form-data";
declare module "react-textarea-autosize";
declare module "console" {
  export = typeof import("console");
}
// remove after github bug fixed
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36198
declare module "history";

// remove after github bug fixed.
// https://github.com/FortAwesome/react-fontawesome/issues/151
// https://github.com/FortAwesome/react-fontawesome/pull/215
declare module "@fortawesome/react-fontawesome";
