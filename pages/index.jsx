// import { gql } from "@apollo/client";
import { Button, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

// import client from "../apollo-client";

export default function Home() {
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
