import { gql } from "@apollo/client";
import React from "react";

import client from "../apollo-client";

export default function Home({ data }) {
  return (
    <div className="page-container">
      Hello, thanks for using my template.
      <div>{data.hello}</div>
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
