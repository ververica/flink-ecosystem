import React from "react";

export default function Footer() {
  return (
    <div className="row no-gutters text-center small text-muted d-block py-4">
      <p>
        Copyright ©2014-2019&nbsp;
        <a href="https://apache.org/">
          The Apache Software Foundation
        </a>
        . All Rights Reserved.
      </p>
      <p>
        Apache Flink, Flink®, Apache®, and the squirrel logo are either
        registered trademarks or trademarks of The Apache Software Foundation.
      </p>
      <p>
        <a
          href="https://flink.apache.org/privacy-policy.html"
        >
          Privacy Policy
        </a>
        &nbsp;|&nbsp;
        <a
          href="https://flink.apache.org/community.html#mailing-lists"
        >
          Contact Us
        </a>
          &nbsp;|&nbsp;
        <a
              href="https://github.com/sorahn/flink-ecosystem"
          >
              Source Code and Issues
        </a>
      </p>
    </div>
  );
}
