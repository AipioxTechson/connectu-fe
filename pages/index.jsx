import { gql } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import client from "../apollo-client";
import { Card } from "../components/Card";

export default function Home({
  groupChats: { groupChats, totalPages, pageNumber },
}) {
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [totalPageState, setTotalPage] = useState(totalPages);
  const [groupChatStates, setGroupChats] = useState(groupChats);

  const [searchQuery, setSearchQuery] = useState("");
  const [oldSearchQuery, setOldSearchQuery] = useState("");

  const handleSearch = async () => {
    setCurrentPage(0);
    setOldSearchQuery(searchQuery);
    const {
      data: {
        groupChats: {
          groupChats: newGroupChats,
          totalPages: newTotalPages,
          pageNumber: newPageNumber,
        },
      },
    } = await client.query({
      query: gql`
        query searchGroupChats($text: String, $isCommunity: Boolean) {
          groupChats: searchGroupChats(text: $text, isCommunity: $isCommunity) {
            groupChats {
              name
              description
              links
            }
            totalPages
            pageNumber
          }
        }
      `,
      variables: {
        text: searchQuery,
        isCommunity: false,
      },
    });
    setGroupChats([...newGroupChats]);
    setTotalPage(newTotalPages);
    setCurrentPage(newPageNumber);
  };

  const displayMorePages = async () => {
    setCurrentPage((page) => page + 1);
    const {
      data: {
        groupChats: {
          groupChats: newGroupChats,
          totalPages: newTotalPages,
          pageNumber: newPageNumber,
        },
      },
    } = await client.query({
      query: gql`
        query searchGroupChats($page: Float, $text: String) {
          groupChats: searchGroupChats(page: $page, text: $text) {
            groupChats {
              name
              description
              links
            }
            totalPages
            pageNumber
          }
        }
      `,
      variables: {
        page: currentPage + 1,
        text: oldSearchQuery,
      },
    });
    setGroupChats((oldGroupChats) => [...oldGroupChats, ...newGroupChats]);
    setTotalPage(newTotalPages);
    setCurrentPage(newPageNumber);
  };
  return (
    <div className="page-container">
      <div className="d-flex row-12 justify-content-center">
        <div className="col-12 align-items-center justify-self-center">
          <Heading as="h2" size="2xl" m={3}>
            Connect, interact, learn.
          </Heading>
          <Text fontSize="md" color="grey" m={3}>
            UofT ConnectU is a directory containing all your online school group
            chats!
          </Text>
          <Text fontSize="md" color="grey" m={3}>
            Scroll down to view all our chats or create an account to add your
            own.
          </Text>
          <Text fontSize="md" color="grey" m={3}>
            <Button variant="solid" colorScheme="teal" mt={2}>
              Get Started
            </Button>
          </Text>
        </div>

        <div className="col-6">
          <Img alt="Chat image" src="/smartphone.png" />
        </div>
      </div>
      <Spacer />
      <Spacer />
      <div className="col-12 align-items-center justify-self-center">
        <Text fontSize="md" color="grey" m={3}>
          FIND GROUPCHATS
        </Text>
        <Heading as="h2" size="2xl" m={3}>
          Discover
        </Heading>
      </div>
      <div className="col-11">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          mb={4}
        />
        <Box textAlign="center">
          <Button onClick={handleSearch}>Search</Button>
        </Box>
        <Flex wrap="wrap" justifyContent="flex-start">
          {groupChatStates.map((groupChat, index) => (
            <Card key={index} {...groupChat} />
          ))}
        </Flex>
        {currentPage !== totalPageState ? (
          <Box textAlign="center">
            <Button onClick={displayMorePages}>View More</Button>
          </Box>
        ) : null}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const {
    data: { groupChats },
  } = await client.query({
    query: gql`
      query getGroupChats {
        groupChats: getGroupChats {
          groupChats {
            name
            description
            links
            id
          }
          totalPages
          pageNumber
        }
      }
    `,
  });
  return {
    props: {
      groupChats,
    },
  };
}
