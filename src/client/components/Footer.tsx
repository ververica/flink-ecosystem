import React, { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="row no-gutters text-center small text-muted d-block py-4">
      <p>
        Copyright ©2014-2024&nbsp;
        <a href="https://www.ververica.com/">Ververica</a>. All Rights Reserved.
      </p>
      <p>
        Apache Flink, Flink, Apache and the squirrel logo are either registered
        trademarks or trademarks of the{" "}
        <a href="https://www.apache.org">The Apache Software Foundation</a> in
        the United States and/or other countries, and are{" "}
        <a href="https://www.apache.org/foundation/marks/domains">
          used with permission
        </a>{" "}
        as of November 2019. The Apache Software Foundation has no affiliation
        with and does not endorse or review the materials provided at this
        website, which is managed by Ververica.
      </p>
      <p>
        <a href="https://www.ververica.com/terms-of-service">Terms of Use</a>
        &nbsp;|&nbsp;
        <a href="https://www.ververica.com/privacy-policy">Privacy Policy</a>
        &nbsp;|&nbsp;
        <a href="https://www.ververica.com/contact">Contact Us</a>
        &nbsp;|&nbsp;
        <a href="https://flink.apache.org/community.html">
          Apache Flink Community
        </a>
        &nbsp;|&nbsp;
        <a href="https://github.com/ververica/flink-ecosystem">
          Source Code and Issues
        </a>
      </p>
    </div>
  );
};
