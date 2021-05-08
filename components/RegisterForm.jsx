import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import React from "react";
import { defineMessages, useIntl } from "react-intl";
import * as Yup from "yup";

import locales from "../content/locale";

const messages = defineMessages({
  createAcct: {
    id: "create-acct",
    description: locales.en["create-acct"],
    defaultMessage: locales.en.test,
  },
  emailAddress: {
    id: "email-address",
    description: locales.en["email-address"],
    defaultMessage: locales.en["email-address"],
  },
  emailHelperText: {
    id: "email-helper-text",
    description: locales.en["email-helper-text"],
    defaultMessage: locales.en["email-helper-text"],
  },
  password: {
    id: "password",
    description: locales.en.password,
    defaultMessage: locales.en.password,
  },
  confirmPassword: {
    id: "confirm-password",
    description: locales.en["confirm-password"],
    defaultMessage: locales.en["confirm-password"],
  },
});

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});

const RegisterForm = ({ errors, isValid, setFieldValue }) => {
  const { formatMessage } = useIntl();
  return (
    <Form className="col-6">
      <FormControl id="email" isRequired>
        <FormLabel>{formatMessage(messages.emailAddress)}</FormLabel>
        <Input
          type="email"
          onChange={(e) => setFieldValue("email", e.target.value)}
        />
        <FormHelperText>
          {formatMessage(messages.emailHelperText)}
        </FormHelperText>
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isRequired mt={2}>
        <FormLabel>{formatMessage(messages.password)}</FormLabel>
        <Input
          type="password"
          onChange={(e) => setFieldValue("password", e.target.value)}
        />
      </FormControl>
      <FormControl id="confirmPassword" isRequired mt={2}>
        <FormLabel>{formatMessage(messages.confirmPassword)}</FormLabel>
        <Input
          type="password"
          onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
        />
      </FormControl>
      <Button
        className="w-100 mt-4"
        isDisabled={!isValid}
        colorScheme="green"
        type="submit"
      >
        {formatMessage(messages.createAcct)}
      </Button>
    </Form>
  );
};

export const EnhancedRegisterForm = withFormik({
  enableReinitialize: true,
  handleSubmit: () => {},
  mapPropsToValues: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  validationSchema: () => RegisterSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(RegisterForm);

export default EnhancedRegisterForm;
