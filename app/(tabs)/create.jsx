import {
  Platform,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';

//const BASE_URL = "http://10.0.2.2:8000"; // Android emulator's localhost




const BASE_URL = "https://backend-mobileapp-django.onrender.com";


const Create = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    published_date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.author || !form.published_date) {
      Alert.alert("Validation Error", "Please fill all the fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${BASE_URL}/api/add/`,
        {
          title: form.title,
          author: form.author,
          published_date: form.published_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "Book added successfully!");
      setForm({ title: "", author: "", description: "" }); // reset form

      router.push("/(tabs)/home"); // redirect only after success
    } catch (error) {
      console.error("An error occurred while creating the book record:", error);

      if (error.response?.data) {
        Alert.alert("Error", JSON.stringify(error.response.data));
      } else {
        Alert.alert("Error", "Something went wrong. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <ScrollView>
        <Text className="text-2xl font-bold mb-4 text-center">Add New Book</Text>

        <Text className="text-gray-600 mb-2">Title</Text>
        <TextInput
          value={form.title}
          onChangeText={(value) => handleChange("title", value)}
          placeholder="Book Title"
          className="border border-gray-400 rounded-lg px-4 py-3 mb-4"
        />

        <Text className="text-gray-600 mb-2">Author</Text>
        <TextInput
          value={form.author}
          onChangeText={(value) => handleChange("author", value)}
          placeholder="Author Name"
          className="border border-gray-400 rounded-lg px-4 py-3 mb-4"
        />

        <Text className="text-gray-600 mb-2">Published_Year</Text>
        <TextInput
          value={form.published_date}
          onChangeText={(value) => handleChange("published_date", value)}
          placeholder="published_year"
          multiline
          numberOfLines={4}
          className="border border-gray-400 rounded-lg px-4 py-3 mb-6 text-base"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          className={`bg-blue-600 rounded-lg px-4 py-3 ${
            isSubmitting ? "opacity-50" : ""
          }`}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {isSubmitting ? "Adding..." : "Add Book"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
