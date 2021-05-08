import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const ERROR_MESSAGES = {
  emailMissing: "",
};

const RegisterSchema = Yup.object().shape({
  email: Yup.string().required(ERROR_MESSAGES.emailMissing),
});

const RegisterForm = ({ ...formikProps }) => {
  const text = "We'll never share your email";
  return (
    <Form className="col-6">
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>{text}</FormHelperText>
      </FormControl>
    </Form>
  );
};

export const EnhancedRegisterForm = withFormik({
  enabledReinitialize: true,
  handleSubmit: () => {},
  validationSchema: () => RegisterSchema,
  validateOnBlur: false,
  validateOnChange: false,
})(RegisterForm);

export default EnhancedRegisterForm;
