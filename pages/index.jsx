// import { gql } from "@apollo/client";
import React from "react";
import { Text, Heading, Button, Img  } from "@chakra-ui/react"

import SectionContainer from "../components/SectionContainer";
// import client from "../apollo-client";


export default function Home() {
  return (
      <div className="page-container">
          <div className="d-flex row-12 justify-content-center">
              <div className="col-12 align-items-center justify-self-center">

                      <Text fontSize="md" color="grey" m={3}>
                          TOOL
                      </Text>
                      <Heading as="h2" size="2xl" m={3}>
                          Connect, interact, learn.
                      </Heading>
                      <Text fontSize="md" color="grey" m={3}>
                          <Button variant="solid" mt={2}>
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
