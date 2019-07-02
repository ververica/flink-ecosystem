import React from "react";

export default function Footer() {
  // @TODO add "contact us" #12
  return (
    <div className="row no-gutters text-center d-block py-4">
      <p>
        Copyright © 2014-2019{" "}
        <a href="https://apache.org/">The Apache Software Foundation</a>. All
        Rights Reserved.
      </p>
      <p>
        Apache Flink, Flink®, Apache®, and the squirrel logo are either
        registered trademarks or trademarks of The Apache Software Foundation.
      </p>
      <p>
        <a href="https://flink.apache.org/privacy-policy.html">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
