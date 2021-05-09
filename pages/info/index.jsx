import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";

import Info from "../../components/Info";

export default function Information() {
  const { formatMessage } = useIntl();
  return (
    <div className="smol-page-container">
      <Info
        name="CSC108"
        description="Structure of computers; the computing environment. Programming in a language such as Python. Program structure: elementary data types, statements, control flow, functions, classes, objects, methods, fields. List: searching, sorting and complexity."
      />
    </div>
  );
}
