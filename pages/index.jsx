import { gql } from "@apollo/client";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import client from "../apollo-client";
import locales from "../content/locale";

const messages = defineMessages({
  sampleText: {
    id: "test",
    description: "sampleText",
    defaultMessage: locales.en.test,
  },
});
export default function Home({ data }) {
  const { formatMessage } = useIntl();
  return (
    <div className="page-container">
      <div className="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
      <div>{data.hello}</div>
      <div>{formatMessage(messages.sampleText)}</div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query hello {
        hello
      }
    `,
  });
  return {
    props: {
      data,
    },
  };
}
