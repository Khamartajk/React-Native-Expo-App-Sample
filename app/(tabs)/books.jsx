import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const BASE_URL = "https://backend-mobileapp-django.onrender.com";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/books/`);
      setBooks(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/delete/${id}/`);
      Alert.alert("Deleted", "Book deleted successfully.");
      fetchBooks(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete book.");
    }
  };
const handleEdit = (id) => {
  router.push({
    pathname: "/profile",
    params: { id: id.toString() }, // pass ID as string
  });
};


  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-gray-600 text-lg mt-4">Loading books...</Text>
      </SafeAreaView>
    );
  }

  if (books.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600 text-lg">No books available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center text-orange-600 mb-4">
        Books List
      </Text>

      <ScrollView>
        {books.map((book) => (
          <View
            key={book.id}
            className="mb-4 border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <Text className="text-lg font-semibold text-blue-700">
              {book.title}
            </Text>
            <Text className="text-sm text-gray-700 mt-1">By: {book.author}</Text>
            <Text className="text-sm text-gray-600 mt-1">
              Published: {book.published_date}
            </Text>

            <View className="flex-row justify-end mt-4 space-x-4">
              {/* Edit Icon */}
              <TouchableOpacity
                onPress={() => handleEdit(book.id)}
                className="bg-yellow-500 p-2 rounded-full"
              >
                <Feather name="edit-3" size={20} color="white" />
              </TouchableOpacity>

              {/* Delete Icon */}
              <TouchableOpacity
                onPress={() => handleDelete(book.id)}
                className="bg-red-600 p-2 rounded-full"
              >
                <MaterialIcons name="delete-outline" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Books;
