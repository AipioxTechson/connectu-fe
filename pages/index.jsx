import { gql } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GoSettings } from "react-icons/go";
import { defineMessages, useIntl } from "react-intl";
import { Link } from "react-scroll";

import client from "../apollo-client";
import { Card } from "../components/Card";
import locales from "../content/locale";

const messages = defineMessages({
  getStarted: {
    id: "get-started",
    description: locales.en["get-started"],
    defaultMessage: locales.en["get-started"],
  },
  tagline: {
    id: "tagline",
    description: locales.en.tagline,
    defaultMessage: locales.en.tagline,
  },
  desc1: {
    id: "desc1",
    description: locales.en.desc1,
    defaultMessage: locales.en.desc1,
  },
  desc2: {
    id: "desc2",
    description: locales.en.desc2,
    defaultMessage: locales.en.desc2,
  },
  discover: {
    id: "discover",
    description: locales.en.discover,
    defaultMessage: locales.en.discover,
  },
  findGroupchats: {
    id: "find-groupchats",
    description: locales.en["find-groupchats"],
    defaultMessage: locales.en["find-groupchats"],
  },
  searchCommunityServers: {
    id: "search-community-servers",
    description: locales.en["search-community-servers"],
    defaultMessage: locales.en["search-community-servers"],
  },
});

export default function Home({
  groupChats: { groupChats, totalPages, pageNumber },
}) {
  const { formatMessage } = useIntl();
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [totalPageState, setTotalPage] = useState(totalPages);
  const [groupChatStates, setGroupChats] = useState(groupChats);
  const [isCommunity, setCommunity] = useState(false);

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
              id
            }
            totalPages
            pageNumber
          }
        }
      `,
      variables: {
        text: searchQuery,
        isCommunity,
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
        query searchGroupChats(
          $page: Float
          $text: String
          $isCommunity: Boolean
        ) {
          groupChats: searchGroupChats(
            page: $page
            text: $text
            isCommunity: $isCommunity
          ) {
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
      variables: {
        page: currentPage + 1,
        text: oldSearchQuery,
        isCommunity,
      },
    });
    setGroupChats((oldGroupChats) => [...oldGroupChats, ...newGroupChats]);
    setTotalPage(newTotalPages);
    setCurrentPage(newPageNumber);
  };
  return (
    <div className="page-container">
      <div
        className="d-flex row-12 justify-content-center"
        style={{ height: "75vh", marginTop: "20vh" }}
      >
        <div className="col-6 align-items-center justify-self-center">
          <Heading as="h2" size="2xl" m={3}>
            {formatMessage(messages.tagline)}
          </Heading>
          <Text fontSize="md" color="grey" m={3}>
            {formatMessage(messages.desc1)}
          </Text>
          <Text fontSize="md" color="grey" m={3}>
            {formatMessage(messages.desc2)}
          </Text>
          <Text fontSize="md" color="grey" m={3}>
            <Link
              activeClass="active"
              to="discover"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              <Button variant="solid" colorScheme="teal" mt={2}>
                {formatMessage(messages.getStarted)}
              </Button>
            </Link>
          </Text>
        </div>

        <div className="col-6">
          <Img alt="Chat image" src="/smartphone.png" w="75%" />
        </div>
      </div>
      <div
        className="col-11 align-items-center justify-self-center m-4"
        name="discover"
      >
        <Text fontSize="md" color="grey" m={3}>
          {formatMessage(messages.findGroupchats)}
        </Text>
        <Heading as="h2" size="2xl" m={3}>
          {formatMessage(messages.discover)}
        </Heading>
      </div>
      <div className="col-8">
        <InputGroup>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            mb={4}
          />
          <InputRightElement pr={10}>
            <ButtonGroup isAttached>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                onClick={handleSearch}
              />
              <IconButton
                aria-label="Advanced search settings"
                icon={<GoSettings />}
                onClick={() => {}}
              />
            </ButtonGroup>
          </InputRightElement>
        </InputGroup>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="server" mb="0">
            {formatMessage(messages.searchCommunityServers)}
          </FormLabel>
          <Switch
            id="server"
            onChange={() => setCommunity((community) => !community)}
          />
        </FormControl>
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
