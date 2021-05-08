// import { gql } from "@apollo/client";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import locales from "../content/locale";

// import client from "../apollo-client";

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
      Hello, thanks for using my template.
      <div>{data.hello}</div>
      <div>{formatMessage(messages.sampleText)}</div>
    </div>
  );
}

export async function getStaticProps() {
  /** const { data } = await client.query({
    query: gql`
      query hello {
        hello
      }
    `,
  });
  */
  const data = { hello: "Hi there" };
  return {
    props: {
      data,
    },
  };
}
