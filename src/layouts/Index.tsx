import { Text } from "react-native";
import React, { useEffect } from "react";

import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";

import { NativeBaseProvider } from "native-base";
import { NotifierWrapper } from "react-native-notifier";

import Authentication from "../stacks/Authentication";
import Home from "../stacks/Home";

export default function Index() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<User | null>();

  function authenticatedNow(user: User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, authenticatedNow);

    return subscriber;
  });

  if (initializing) {
    return <Text>Loading</Text>;
  }

  if (!user) {
    return (
      <NativeBaseProvider>
        <NotifierWrapper>
          <Authentication />
        </NotifierWrapper>
      </NativeBaseProvider>
    );
  }

  return <Home />;
}
