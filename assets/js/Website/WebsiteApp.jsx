import React from "react";
import { Websites } from "./Websites";

export default function WebsiteApp({ user }) {
  return (
    <>
      <h1>Website index</h1>
      <Websites user={user} />
    </>
  );
}
