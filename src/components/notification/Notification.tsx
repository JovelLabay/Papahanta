import { View, Text, StatusBar } from "react-native";
import React from "react";
import { styles } from "./notification.styles";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";

function NotificationError(err: string) {
  Notifier.showNotification({
    containerStyle: {
      paddingTop: StatusBar.currentHeight,
    },
    title: "Firebase Message",
    description: err,
    duration: 3000,
    showAnimationDuration: 800,
    showEasing: Easing.ease,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: "error",
    },
  });
}
function NotificationSuccess(res: string) {
  Notifier.showNotification({
    containerStyle: {
      paddingTop: StatusBar.currentHeight,
    },
    title: "Firebase Message",
    description: res,
    duration: 3000,
    showAnimationDuration: 800,
    showEasing: Easing.ease,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: "success",
    },
  });
}

export { NotificationError, NotificationSuccess };
