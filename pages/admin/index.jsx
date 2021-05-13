import { gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import cookie from "js-cookie";
import React, { useEffect, useState } from "react";

import client from "../../apollo-client";
import Autocomplete from "../../components/Autocomplete";
import RequestsList from "../../components/RequestsList";
import SectionContainer from "../../components/SectionContainer";
import UsersList from "../../components/UsersList";
import { mockUsers } from "../../data/mockData";
import { mapAsOption, openLink } from "../../helpers";

const mockUsersAsValues = mockUsers.map((user) => ({
  label: user.email,
  value: user.email,
}));

export default function Admin() {
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [banned, setBanned] = useState([]);
  const toast = useToast();

  useEffect(async () => {
    const email = cookie.get("email");
    if (!email) openLink("/");
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

    const { data: adminData } = await client.query({
      query: gql`
        query getAdminData(
          $status1: String!
          $status2: String!
          $userStatus: String!
        ) {
          pendingChats: getGroupChatByStatus(status: $status1) {
            id
            name
          }
          rejectedChats: getGroupChatByStatus(status: $status2) {
            id
            name
          }
          bannedUsers: getUsers(status: $userStatus) {
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
    setPending(adminData.pendingChats);
    setRejected(adminData.rejectedChats);
    setBanned(adminData.bannedUsers);
  }, []);

  const modifyRequest = async (id, status) => {
    const {
      data: {
        updateGroupChat: { name, id: groupChatId },
      },
    } = await client.mutate({
      mutation: gql`
        mutation updateGroupChat($id: String!, $status: String!) {
          updateGroupChat(id: $id, status: $status) {
            name
            id
          }
        }
      `,
      variables: {
        id,
        status,
      },
    });
    if (status === "rejected") {
      setRejected((rejectedGroups) => [
        ...rejectedGroups,
        { id: groupChatId, name },
      ]);
    }
    setPending((pendingGroups) =>
      pendingGroups.filter((chat) => chat.id !== groupChatId)
    );
    toast({
      description: `Request ${name} has been ${status}`,
      status: status === "approved" ? "success" : "error",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
  };

  const searchForUsers = async (text) => {
    const {
      data: { searchUsers },
    } = await client.query({
      query: gql`
        query searchUsers($text: String!) {
          searchUsers(text: $text) {
            email
          }
        }
      `,
      variables: {
        text,
      },
    });
    return mapAsOption(searchUsers, "email");
  };

  return (
    <div className="page-container">
      <SectionContainer height="">
        <RequestsList
          heading="PENDING REQUESTS"
          items={pending}
          modifyRequest={modifyRequest}
        />
        <RequestsList heading="REJECTED REQUESTS" items={rejected} />
        <Autocomplete
          name="Search Users"
          options={mockUsersAsValues}
          onSearch={searchForUsers}
        />
        <UsersList heading="BANNED USERS" items={banned} />
      </SectionContainer>
    </div>
  );
}
