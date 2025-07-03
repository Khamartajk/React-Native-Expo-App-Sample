import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";



const BASE_URL = "https://backend-mobileapp-django.onrender.com";

const EditBook = () => {
  const { id } = useLocalSearchParams(); // get book ID from route
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    published_date: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing book data
  const fetchBookById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books/${id}/`);
      setForm({
        title: response.data.title,
        author: response.data.author,
        published_date: response.data.published_date,
      });
    } catch (error) {
      console.error("Failed to load book:", error);
      Alert.alert("Error", "Could not load book details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookById();
    }
  }, [id]);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async () => {
    if (!form.title || !form.author || !form.published_date) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.put(`${BASE_URL}/api/update/${id}/`, form, {
        headers: { "Content-Type": "application/json" },
      });

      Alert.alert("Success", "Book updated successfully!");
      router.push("/(tabs)/home"); // or your books list screen
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "Failed to update book.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-gray-600 mt-4">Loading book details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      <ScrollView>
        <Text className="text-2xl font-bold mb-6 text-center text-blue-700">
          Edit Book
        </Text>

        <Text className="text-gray-600 mb-2">Title</Text>
        <TextInput
          value={form.title}
          onChangeText={(value) => handleChange("title", value)}
          placeholder="Book Title"
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <Text className="text-gray-600 mb-2">Author</Text>
        <TextInput
          value={form.author}
          onChangeText={(value) => handleChange("author", value)}
          placeholder="Author Name"
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <Text className="text-gray-600 mb-2">Published_Year</Text>
        <TextInput
          value={form.published_date}
          onChangeText={(value) => handleChange("published_date", value)}
          placeholder="Published_year"
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6"
        />

        <TouchableOpacity
          onPress={handleUpdate}
          disabled={isSubmitting}
          className={`bg-blue-600 py-3 rounded-lg ${
            isSubmitting ? "opacity-50" : ""
          }`}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {isSubmitting ? "Updating..." : "Update Book"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditBook;
