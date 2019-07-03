import React from "react";

export default function Footer() {
  return (
    <div className="row no-gutters text-center d-block py-4">
      <p>
        Copyright ©2014-2019&nbsp;
        <a href="https://apache.org/" rel="noreferrer noopener nofollow">
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
          rel="noreferrer noopener nofollow"
        >
          Privacy Policy
        </a>
        &nbsp;|&nbsp;
        <a
          href="https://flink.apache.org/community.html#mailing-lists"
          rel="noreferrer noopener nofollow"
        >
          Contact Us
        </a>
      </p>
    </div>
  );
}
