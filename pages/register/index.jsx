import { Heading } from "@chakra-ui/react";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import RegisterForm from "../../components/RegisterForm";
import locales from "../../content/locale";

const messages = defineMessages({
  createAcct: {
    id: "create-acct",
    description: locales.en["create-acct"],
    defaultMessage: locales.en.test,
  },
});

export default function Register() {
  const { formatMessage } = useIntl();
  return (
    <div className="smol-page-container">
      <Heading as="h1" mb={10}>
        {formatMessage(messages.createAcct)}
      </Heading>
      <RegisterForm />
    </div>
  );
}
