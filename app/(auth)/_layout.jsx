import { View, Text } from 'react-native'
import { Stack ,Slot} from 'expo-router'
import React from 'react'

const Auth_Layout = () => {
 return (
    // <Stack screenOptions={{headerShown: false,animation: "fade",}} />
    <Slot />
  );
}

export default Auth_Layout;