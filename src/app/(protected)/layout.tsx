import React from "react";

import {protectPage} from "~/features/auth/protectPage";


const ProtectedLayout = async ({children}: Readonly<{ children: React.ReactNode }>) => {
  await protectPage()
  return children;
}

export default ProtectedLayout
