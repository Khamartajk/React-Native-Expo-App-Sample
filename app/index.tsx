import { ScrollView, Text, View,Image } from "react-native";
import { StatusBar } from "expo-status-bar"; 
import {Link} from "expo-router"; // Import Link from expo-router
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from "../constants";
import CustomButton from "../components/CustomButton.jsx";
import { router } from "expo-router";



export default function App() {
  return (

    <SafeAreaView className="bg-primary h-full">
      
        <ScrollView 
            contentContainerStyle={{
               height: '100%' 
           }}>

             <View className = "w-full justify-center items-center min-h-[85vh] px-4">
                <Image
                   source = {images.logo}
                   className ="w-[130px] min-h-[84px]"
                   resizeMode = "contain"
                />
    
                 <Image 
                    source = {images.cards}
                    className = "max-w-[380px] w-full h-[300px]"
                    resizeMode = "contain"
                 /> 
             

              <View className="relative mt-5">
                  <Text className ="text-3xl text-white font-bold text-center ">
                      Discover Endless Possibilities with {''}
                      <Text className="text-secondary-200">Aora</Text>

                  </Text>
                  <Image 
                    source ={images.path} 
                    className ="w-[136px] h-[15px] absolute -bottom-2 -right-4"
                    resizeMode = "contain"
                   />
                </View>

              <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                Where Creativity meets Innovation : Embark on a journey of limitlessexploration with Aora
              </Text>

              <CustomButton
                 title="Continue with Email"
                 handlePress ={ () => router.push('/sign-in') }
                 containerStyles = "w-full mt-7"
               />
              </View>
        </ScrollView>

      

    </SafeAreaView>
      );
}
