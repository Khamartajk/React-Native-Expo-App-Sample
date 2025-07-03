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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://backend-mobileapp-django.onrender.com" ;

const SignIn = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/users/login/`, {
        email: form.email.trim(),
        password: form.password.trim(),
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Login Successful", "You have successfully logged in!");

      router.replace("/(tabs)/home");

    } catch (error) {

      console.log("Login Error:", error?.response?.data || error.message);

      if (error.response?.data) {
        Alert.alert(
          "Login Failed",
          error.response.data.detail || JSON.stringify(error.response.data)
        );
      } else {
        Alert.alert("Login Failed", "Network error. Please check connection or API URL.");
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
              Sign In to Aora
            </Text>

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
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                Sign Up
              </Link>
            </View>
            <Link
                href="/home"
                className="text-lg font-psemibold text-secondary"
              >
                Go to Home
              </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
