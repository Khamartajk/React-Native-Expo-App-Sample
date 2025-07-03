import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField.jsx";
import CustomButton from "./../../components/CustomButton.jsx";
import { Link, useRouter } from "expo-router";
import { registerUser } from "../../services/auth.js"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

 const BASE_URL = "https://backend-mobileapp-django.onrender.com";


const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setIsSubmitting(true);
  try {
    const response = await axios.post(`${BASE_URL}/api/users/register/`, {
      username : form.username,
      email: form.email,
      password: form.password,
    },
    { headers: {
      "Content-Type": "application/json",
    } ,
  }
  );
    console.log('Signup successful:', response.data);
 

    const { token, user } = response.data;

    // Store token and user info
    await AsyncStorage.setItem("authToken", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    Alert.alert("Signup Successful", "You have successfully signed up!");

    // Redirect to home page

    router.replace("/sign-in"); // redirect to login  on success

  } catch (error) {
    console.log("Signup Error:", error?.response?.data || error.message);

    if (error.response?.data) {
      Alert.alert("Signup Failed", error.response.data.detail || "Check your input");
    } else {
      Alert.alert("Signup Failed", "Network error");
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View className="w-full h-full justify-center px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white font-psemibold mt-10">
              Create a New Account
            </Text>

            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(val) => handleInputChange("username", val)}
              otherStyles="mt-7"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(val) => handleInputChange("email", val)}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(val) => handleInputChange("password", val)}
              otherStyles="mt-7"
              secureTextEntry={true}
            />

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
