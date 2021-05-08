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
import { Field, FieldArray, Form, withFormik } from "formik";
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
  links: Yup.array()
    .of(Yup.string().url("Must be a valid URL"))
    .required()
    .test({
      name: "Includes Discord/WhatsApp",
      message: "Link must be from Discord or WhatsApp",
      test: (value) =>
        value.every(
          (val) =>
            (val && val.includes("discord")) ||
            (val && val.includes("whatsapp"))
        ),
    }),
  isCommunity: Yup.boolean().required(),
});

const ChatForm = ({
  errors,
  setFieldValue,
  values: { name, description, links, isCommunity },
}) => {
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
            <Radio id="course" value={false}>
              Course
            </Radio>
            <Radio id="community" value={true}>
              Community
            </Radio>
          </Stack>
        </RadioGroup>
        {hasSubmitted && <Text color="red">{errors.isCommunity}</Text>}
      </FormControl>
      <FieldArray
        name="links"
        render={() => (
          <div>
            {links.map((link, index) => (
              <FormControl
                name={`links.${index}`}
                key={index}
                isRequired
                mt={2}
                isInvalid={hasSubmitted && errors.links}
              >
                <FormLabel>{formatMessage(messages.link)}</FormLabel>
                <Input
                  as={Field}
                  name={`links.${index}`}
                  type="text"
                  value={link}
                />
                {hasSubmitted && <Text color="red">{errors.links}</Text>}
              </FormControl>
            ))}
            <HStack>
              <Button
                colorScheme="blue"
                disabled={links.length >= 2}
                rightIcon={<AddIcon />}
                className="w-50 mt-4"
                onClick={() => {
                  if (links.length < 2) setFieldValue("links", [...links, ""]);
                }}
              >
                {formatMessage(messages.addLink)}
              </Button>
              <Button
                colorScheme="red"
                disabled={links.length <= 1}
                rightIcon={<DeleteIcon />}
                className="w-50 mt-4"
                onClick={() => {
                  if (links.length > 1)
                    setFieldValue("links", [
                      ...links.slice(0, links.length - 1),
                    ]);
                }}
              >
                {formatMessage(messages.removeLink)}
              </Button>
            </HStack>
          </div>
        )}
      />
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
  handleSubmit: ({ name, description, links, isCommunity }) => {
    // eslint-disable-next-line no-console
    console.log({ name, description, links, isCommunity });
  },
  mapPropsToValues: () => ({
    name: "",
    description: "",
    links: [""],
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
