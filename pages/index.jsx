// import { gql } from "@apollo/client";
import React from "react";

import SectionContainer from "../components/SectionContainer";
// import client from "../apollo-client";

export default function Home() {
  return (
    <div className="page-container">
      <SectionContainer>
        <div>Hi</div>
      </SectionContainer>
      <SectionContainer headerText="Discover">
        <div>Discover</div>
      </SectionContainer>
    </div>
  );
}

export async function getStaticProps() {
  /*
  const { data } = await client.query({
    query: gql`
      query hello {
        hello
      }
    `,
  }); */
  const data = { hello: "hello" };
  return {
    props: {
      data,
    },
  };
}
