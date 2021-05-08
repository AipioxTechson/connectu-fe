// import { gql } from "@apollo/client";
import React from "react";

import SectionContainer from "../../components/SectionContainer";
// import client from "../apollo-client";

export default function Admin({ pending, rejected, banned }) {
  return (
    <div className="page-container">
      <SectionContainer>
        <div>Admin</div>
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
  const data = { pending: [], rejected: [], banned: [] };
  return {
    props: {
      pending: data.pending,
      rejected: data.rejected,
      banned: data.banned,
    },
  };
}
