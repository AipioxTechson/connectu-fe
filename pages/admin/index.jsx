// import { gql } from "@apollo/client";
import React from "react";

import RequestsList from "../../components/RequestsList";
import SectionContainer from "../../components/SectionContainer";
import UsersList from "../../components/UsersList";
import mockGroupChats, { mockUsers } from "../../data/mockData";
// import client from "../apollo-client";

export default function Admin({ pending, rejected, banned }) {
  return (
    <div className="page-container">
      <SectionContainer height="">
        <RequestsList heading="PENDING REQUESTS" items={pending} />
        <RequestsList heading="REJECTED REQUESTS" items={rejected} />
        <UsersList heading="BANNED USERS" items={banned} />
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
  const data = {
    pending: mockGroupChats,
    rejected: mockGroupChats,
    banned: mockUsers,
  };
  return {
    props: {
      pending: data.pending,
      rejected: data.rejected,
      banned: data.banned,
    },
  };
}
