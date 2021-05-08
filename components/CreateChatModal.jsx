/* eslint-disable react/jsx-boolean-value */
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
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
import removeDuplicates from "../helpers";

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
  removeLink: {
    id: "remove-link",
    description: locales.en["remove-link"],
    defaultMessage: locales.en["remove-link"],
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
  isCommunity: Yup.boolean().required(),
});

const ChatForm = ({
  errors,
  setFieldValue,
  values: { name, description, links, isCommunity },
}) => {
  const [linkCount, setLinkCount] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isValid = name || description || links || isCommunity;
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
      <FormControl id="type" mt={2} isInvalid={hasSubmitted && errors.type}>
        <FormLabel>{formatMessage(messages.type)}</FormLabel>
        <RadioGroup
          onChange={(val) => setFieldValue("isCommunity", val === "true")}
          value={isCommunity}
        >
          <Stack direction="row">
            <Radio value={false}>Course</Radio>
            <Radio value={true}>Community</Radio>
          </Stack>
        </RadioGroup>
        {hasSubmitted && <Text color="red">{errors.isCommunity}</Text>}
      </FormControl>
      {Array.from({ length: linkCount }, (_, k) => (
        <FormControl
          isRequired
          mt={2}
          // isInvalid={hasSubmitted && errors.name}
        >
          <FormLabel>{formatMessage(messages.link)}</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setFieldValue(
                "links",
                removeDuplicates([...links, e.target.value])
              );
            }}
          />
        </FormControl>
      ))}
      <HStack>
        <Button
          colorScheme="blue"
          disabled={linkCount >= 4}
          rightIcon={<AddIcon />}
          className="w-50 mt-4"
          onClick={() => {
            if (linkCount < 4) setLinkCount(linkCount + 1);
          }}
        >
          {formatMessage(messages.addLink)}
        </Button>
        <Button
          colorScheme="red"
          disabled={linkCount <= 1}
          rightIcon={<DeleteIcon />}
          className="w-50 mt-4"
          onClick={() => {
            if (linkCount > 1) setLinkCount(linkCount - 1);
          }}
        >
          {formatMessage(messages.removeLink)}
        </Button>
      </HStack>
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
    isCommunity: false,
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
