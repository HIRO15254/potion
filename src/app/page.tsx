import React from "react";

import {LogoutButton} from "~/features/auth/components/LogoutButton";
import {protectPage} from "~/features/auth/protectPage";
import {InstallPrompt} from "~/features/pwa/InstallPrompt";
import {PushNotificationManager} from "~/features/pwa/PushNotificationManager";

export default async function Home() {
  await protectPage();

  return (
    <main>
      <div>
        <h1>
          Create T3 App
        </h1>
        <div>
          <h3>Documentation →</h3>
          <div>
            Learn more about Create T3 App, the libraries it uses, and how
            to deploy it.
          </div>
        </div>

        <PushNotificationManager />
        <InstallPrompt />
        <LogoutButton />
      </div>
    </main>
  );
}
