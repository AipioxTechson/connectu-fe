import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const AdminChatCard = ({ name, id }) => <Box>{name}</Box>;

const AdminList = ({ heading, items }) => (
  <div className="col-6">
    <div className="row-12">
      <Heading as="h2">{heading}</Heading>
    </div>
    <div className="row-12">
      {items.map((chat, index) => (
        <AdminChatCard key={index} {...chat} />
      ))}
    </div>
  </div>
);

export default AdminList;
