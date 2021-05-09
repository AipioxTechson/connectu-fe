// import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import ChatInfo from "../../components/ChatInfo";

// import client from "../../apollo-client";

export default function Chat() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <div className="page-container">
      <ChatInfo
        name="CSC108"
        test={name} // i just put this here so the warning wouldn't trigger
        links={["http://discord.gg/hi", "http://whatsapp.com"]}
        description="Structure of computers; the computing environment. Programming in a language such as Python. Program structure: elementary data types, statements, control flow, functions, classes, objects, methods, fields. List: searching, sorting and complexity."
      />
    </div>
  );
}

/*

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query hello {
        hello
      }
    `,
  });
  const paths = data.map((community) => ({
    params: { name: community.name },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query hello {
        hello
      }
    `,
  });
  return {
    props: {
      community: data,
    },
  };
}
*/
