import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return ( 
    <>
    
        <View className="flex-1 items-center justify-center">
          <Text className="text-pink-700 text-3xl">Home Page</Text>
        </View>
        
        <View className="flex-1 items-center justify-center">
          <Link href="/(auth)/sign-in" className="text-blue-500 text-lg">
            Go to Sign In
          </Link> 
          </View>
   </>
  )
}

export default Home