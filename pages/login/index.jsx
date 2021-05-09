import { Heading } from "@chakra-ui/react";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import LoginForm from "../../components/LoginForm";
import locales from "../../content/locale";

const messages = defineMessages({
  login: {
    id: "login",
    description: locales.en.login,
    defaultMessage: locales.en.login,
  },
});

export default function Login() {
  const { formatMessage } = useIntl();
  return (
    <div className="smol-page-container">
      <Heading as="h1" mb={10}>
        {formatMessage(messages.login)}
      </Heading>
      <LoginForm />
    </div>
  );
}
