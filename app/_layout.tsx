import { Slot, SplashScreen, Stack } from "expo-router";
import '../global.css';
import {useFonts} from 'expo-font';
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import { View, StatusBar} from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded,error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  
  useEffect(() => {
    if (error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
      
  }, [fontsLoaded,error]);

  if (!fontsLoaded && !error) return null;


  return (
  //  <Stack>
  //   <Stack.Screen name="index" options={{headerShown:false}} />
  //   <Stack.Screen name ="auth" options={{headerShown:false}}/>
  //  </Stack>

      // <Slot />
       // StatusBar component to control the status bar appearance
     
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-primary">
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
          >
            <View className="flex-1">
              <StatusBar
                barStyle="light-content"
                backgroundColor="#161622"
                translucent={false}
              />
              <Slot />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
      
        
  
  ) 
}   