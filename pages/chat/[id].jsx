import { useRouter } from "next/router";
import React from "react";

export default function Chat() {
  const router = useRouter();
  const { name } = router.query;
  return <div className="page-container">Chat: {name}</div>;
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
