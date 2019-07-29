import React from "react";

export default function Footer() {
  return (
    <div className="row no-gutters text-center small text-muted d-block py-4">
      <p>Copyright ©2014-2019&nbsp; Let's see who!</p>
      <p>
        Apache Flink, Flink, Apache and the squirrel logo are either registered
        trademarks or trademarks of the{" "}
        <a href="https://www.apache.org">The Apache Software Foundation</a> in
        the United States and/or other countries
        {/* , and are <a href="https://www.apache.org/foundation/marks/domains">used with permission</a> as of XXXX*/}
        . The Apache Software Foundation has no affiliation with and does not
        endorse or review the materials provided at this website, which is
        managed by YourBigCo.
      </p>
      <p>
        <a href="">Privacy Policy</a>
        &nbsp;|&nbsp;
        <a href="https://flink.apache.org/community.html">
          Apache Flink Community
        </a>
        &nbsp;|&nbsp;
        <a href="https://github.com/sorahn/flink-ecosystem">
          Source Code and Issues
        </a>
      </p>
    </div>
  );
}
