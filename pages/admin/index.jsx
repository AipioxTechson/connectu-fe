import { gql } from "@apollo/client";
import cookie from "js-cookie";
import React, { useEffect } from "react";

import client from "../../apollo-client";
import RequestsList from "../../components/RequestsList";
import SectionContainer from "../../components/SectionContainer";
import UsersList from "../../components/UsersList";
import mockGroupChats, { mockUsers } from "../../data/mockData";
import { openLink } from "../../helpers";

export default function Admin() {
  useEffect(async () => {
    const email = cookie.get("email");
    const { data } = await client.query({
      query: gql`
        query getUser($email: String!) {
          getUser(email: $email) {
            status
          }
        }
      `,
      variables: {
        email,
      },
    });
    if (!data.getUser) openLink("/");
    if (data.getUser.status !== "admin") openLink("/");
    /*
    const { data: adminData } = await client.query({
      query: gql`
        query getAdminData(
          $status1: String!
          $status2: String!
          $userStatus: String!
        ) {
          getGroupChatByStatus(status: $status1) {
            id
            name
          }
          getGroupChatByStatus(status: $status2) {
            id
            name
          }
          getUsersByStatus(status: $userStatus) {
            email
          }
        }
      `,
      variables: {
        status1: "pending",
        status2: "rejected",
        userStatus: "banned",
      },
    });
    console.log(adminData); */
  }, []);

  return (
    <div className="page-container">
      <SectionContainer height="">
        <RequestsList heading="PENDING REQUESTS" items={mockGroupChats} />
        <RequestsList heading="REJECTED REQUESTS" items={mockGroupChats} />
        <UsersList heading="BANNED USERS" items={mockUsers} />
      </SectionContainer>
    </div>
  );
}
