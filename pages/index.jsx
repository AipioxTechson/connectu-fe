import { gql } from "@apollo/client";
import React from "react";

import client from "../apollo-client";

export default function Home({ data }) {
  return (
    <div className="page-container">
      <div className="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
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
