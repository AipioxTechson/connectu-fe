import { Heading } from "@chakra-ui/react";
import React from "react";

import RegisterForm from "../../components/RegisterForm";

export default function Register() {
  return (
    <div className="page-container">
      <Heading>Create your account</Heading>
      <RegisterForm />
    </div>
  );
}
