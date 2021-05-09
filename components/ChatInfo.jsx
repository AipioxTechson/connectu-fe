import { Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

import LinkIconBar from "./LinkIconBar";

function transformLink(url) {
  return {
    label: url.includes("whatsapp") ? "WhatsApp" : "Discord",
    icon: url.includes("whatsapp") ? "whatsapp" : "discord",
    url,
  };
}

const ChatInfo = ({ name, description, links }) => {
  const linkIcons = links ? links.map((link) => transformLink(link)) : [];

  return (
    <div className="d-flex row-12 justify-content-center">
      <div className="col-6">
        <div className="col-6 m-auto">
          <Text fontSize="md" color="grey" m={2}>
            Details
          </Text>
          <Heading as="h2" size="2xl" m={2}>
            {name}
          </Heading>
          <Text fontSize="md" color="grey" m={2}>
            {description}
          </Text>
          <LinkIconBar
            links={linkIcons}
            boxSize="2em"
            justify="flex-start"
            ml={2}
          />
          <Text fontSize="sm" color="grey" m={2}>
            Created: 01/01/20
          </Text>
          <Text fontSize="sm" color="grey" m={2}>
            Last modified: 01/04/20
          </Text>
        </div>
      </div>

      <div className="col-6">
        <Img alt="Chat image" src="/python.png" />
      </div>
    </div>
  );
};

export default ChatInfo;
