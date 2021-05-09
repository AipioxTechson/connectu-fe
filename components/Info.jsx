import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Info = ({ name, description, photo }) => {
  // const course = "CSC108";
  const byline = "DETAILS";
  // const description = "";
  return (
    <>
      <Flex m={[120, 40]}>
        <Box w="700px" h="500px">
          <div p={[15, 5]}>
            <Text p={[15, 5]} fontSize="15px" color="grey">
              {" "}
              {byline}{" "}
            </Text>
            <Heading p={[10, 5]} as="h2" size="2xl">
              {" "}
              {name}{" "}
            </Heading>
            <Text p={[10, 5]} fontSize="15px" color="grey">
              {" "}
              {description}{" "}
            </Text>
          </div>
        </Box>

        <Box
          align="center"
          justify="center"
          w="700px"
          h="500px"
          as={Link}
          href="/"
          m="2"
        >
          <img
            p={[80, 80]}
            alt=""
            src="/python.png"
            width="500"
            height="500"
            href="/"
          />
        </Box>
      </Flex>
    </>
  );
};
export default Info;
