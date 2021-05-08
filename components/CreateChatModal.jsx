/* eslint-disable react/jsx-boolean-value */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import * as Yup from "yup";

import locales from "../content/locale";

const messages = defineMessages({
  name: {
    id: "name",
    description: locales.en.name,
    defaultMessage: locales.en.name,
  },
  description: {
    id: "description",
    description: locales.en.description,
    defaultMessage: locales.en.description,
  },
  link: {
    id: "link",
    description: locales.en.link,
    defaultMessage: locales.en.link,
  },
  type: {
    id: "type",
    description: locales.en.type,
    defaultMessage: locales.en.type,
  },
  addLink: {
    id: "add-link",
    description: locales.en["add-link"],
    defaultMessage: locales.en["add-link"],
  },
  submit: {
    id: "submit",
    description: locales.en.submit,
    defaultMessage: locales.en.submit,
  },
});

const ChatSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  links: Yup.array().of(Yup.string().url()).required(),
  type: Yup.boolean().required(),
});

const ChatForm = ({
  errors,
  setFieldValue,
  values: { name, description, links, type },
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isValid = name || description || links || type;
  const { formatMessage } = useIntl();
  return (
    <Form className="col-6 w-100">
      <FormControl id="name" isRequired isInvalid={hasSubmitted && errors.name}>
        <FormLabel>{formatMessage(messages.name)}</FormLabel>
        <Input
          type="text"
          onChange={(e) => setFieldValue("name", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.name}</Text>}
      </FormControl>
      <FormControl
        id="description"
        isRequired
        mt={2}
        isInvalid={hasSubmitted && errors.description}
      >
        <FormLabel>{formatMessage(messages.description)}</FormLabel>
        <Textarea
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.description}</Text>}
      </FormControl>
      <FormControl
        id="type"
        isRequired
        mt={2}
        isInvalid={hasSubmitted && errors.type}
      >
        <FormLabel>{formatMessage(messages.type)}</FormLabel>
        <RadioGroup
          onChange={(val) => setFieldValue("type", val === "true")}
          value={type}
        >
          <Stack direction="row">
            <Radio value={false}>Course</Radio>
            <Radio value={true}>Community</Radio>
          </Stack>
        </RadioGroup>
        {hasSubmitted && <Text color="red">{errors.type}</Text>}
      </FormControl>
      <Button
        className="w-100 mt-4"
        isDisabled={!isValid}
        colorScheme="green"
        type="submit"
        onClick={() => setHasSubmitted(true)}
      >
        {formatMessage(messages.submit)}
      </Button>
    </Form>
  );
};

const EnhancedChatForm = withFormik({
  enableReinitialize: true,
  handleSubmit: ({ name, description, links, type }) => {
    // eslint-disable-next-line no-console
    console.log({ name, description, links, type });
  },
  mapPropsToValues: () => ({
    name: "",
    description: "",
    links: [],
    type: false,
  }),
  validationSchema: () => ChatSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(ChatForm);

export default function CreateChatModal({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EnhancedChatForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
