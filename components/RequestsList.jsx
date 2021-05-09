import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";

const ChatRequestCard = ({ heading, name }) => (
  <Box
    borderRadius="lg"
    borderWidth="1px"
    rounded="md"
    shadow="lg"
    className="d-flex row-6 justify-content-center"
    mb={4}
  >
    <Heading as="h2" size="lg" m={6}>
      {name}
    </Heading>
    <Spacer />
    {heading === "PENDING REQUESTS" ? (
      <>
        <IconButton
          aria-label="Accept request"
          variant="ghost"
          icon={<CheckIcon />}
          ml={0}
          m={6}
          mr={0}
        />
        <IconButton
          aria-label="Reject request"
          variant="ghost"
          icon={<CloseIcon />}
          ml={0}
          m={6}
          mr={1}
        />
      </>
    ) : (
      <Button m={6}>Review</Button>
    )}
  </Box>
);

const RequestsList = ({ heading, items }) => (
  <div className="col-12 m-5">
    <div className="row-12">
      <Heading as="h2" size="md" mb={2} color="gray.500">
        {heading}
      </Heading>
    </div>
    <div className="row-12">
      {items &&
        items.map((chat, index) => (
          <ChatRequestCard key={index} heading={heading} {...chat} />
        ))}
    </div>
  </div>
);

export default RequestsList;
