import React, { FC } from "react";
import { MainCard } from "client/components/MainCard";

export const Intro: FC = () => {
  return (
    <MainCard>
      <h5>This page contains third-party projects around Apache Flink</h5>
      <p>
        Users can explore the Flink ecosystem of connectors, extensions, APIs,
        tool and integrations here. Developers in the ecosystem can submit what
        they have build as a new packages. Comments and votes allow users leave
        feedback, get help and assess the quality of a community package.
      </p>
      <p>
        <strong>Note:</strong> Packages listed here are user-submitted, they are
        not not endorsed by the Apache Flink project.
      </p>
    </MainCard>
  );
};
