import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";
import Tilt from "react-vanilla-tilt";

import { openLink } from "../helpers";

export const Card = ({ name, description, links, id }) => {
  const LinksMapped = links.map((link) => {
    if (link.includes("discord")) {
      return { type: "discord" };
    }
    return { type: "whatsapp" };
  });
  return (
    <Tilt onClick={() => openLink(`/chat/${id}`)}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box justifyContent="center">
          <Image
            src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max"
            alt="CourseImage"
          />
        </Box>

        <Box p="6">
          <Box fontWeight="semibold" as="h3" lineHeight="tight">
            {name}
          </Box>

          <Box mt="1" fontWeight="semibold" as="h4" isTruncated>
            {description}
          </Box>
          <Box mt="2">
            {LinksMapped.map(({ type }, index) =>
              type === "discord" ? (
                <FaDiscord key={index} />
              ) : (
                <FaWhatsapp key={index} />
              )
            )}
          </Box>
        </Box>
      </Box>
    </Tilt>
  );
};
export default Card;
