import React from 'react'

import { CustomAppShell } from '~/components/AppShell/CustomAppShell'
import { protectPage } from '~/features/auth/protectPage'

const ProtectedLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  await protectPage()
  return (
    <CustomAppShell>
      {children}
    </CustomAppShell>
  )
}

export default ProtectedLayout
