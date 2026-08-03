
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";

export default function AddScreen() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function addProduct() {

    if (!name || !price || !brand || !category || !image) {

      Alert.alert(
        "Validation",
        "Please fill all fields"
      );

      return;
    }
    try {
      setLoading(true);

      const {
        data: {
          user
        },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert(
          "Error",
          "User not logged in"
        );
        return;
      }

      const { error } = await supabase
        .from("products")
        .insert([
          {
            name,
            price: Number(price.replace(/,/g, "")),
            brand,
            category,
            image,
            user_id: user.id,
          },
        ]);

      if (error) {
        Alert.alert(
          "Error",
          error.message
        );
        return;
      }
      console.log("Product added successfully");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      setName("");
      setPrice("");
      setBrand("");
      setCategory("");
      setImage("");

    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
  style={{
    flex: 1,
    backgroundColor: "#EEF2F7",
  }}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
  contentContainerStyle={{
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 120,
  }}
>
          <View style={styles.wrapper}>

            {
              success && (
                <View style={styles.successBox}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#16A34A"
                  />

                  <Text style={styles.successText}>
                    Product added successfully
                  </Text>
                </View>
              )
            }

            <Text style={styles.title}>
              Add Product
            </Text>

            <Text style={styles.subtitle}>
              Create a new product listing
            </Text>

            {/* Image Preview */}
            <View style={styles.imageCard}>
              {
                image ?

                  <Image

                    source={{
                      uri: image,
                    }}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                  :
                  <>
                    <Ionicons
                      name="image-outline"
                      size={50}
                      color="#94A3B8"
                    />

                    <Text style={styles.previewText}>
                      Product Preview
                    </Text>
                  </>
              }
            </View>

            {/* Form */}

            <Text style={styles.sectionTitle}>
              Product Details
            </Text>

            <InputField
              label="Product Name"
              icon="cube-outline"
              placeholder="Enter product name"
              value={name}
              setValue={setName}
              returnKeyType="next"
            />
            <InputField
              label="Price"
              icon="cash-outline"
              placeholder="Enter price"
              keyboardType="numeric"
              value={price}
              setValue={setPrice}
              returnKeyType="next"
            />

            <InputField
              label="Brand"
              icon="business-outline"
              placeholder="Enter brand"
              value={brand}
              setValue={setBrand}
              returnKeyType="next"
            />

            <InputField
              label="Category"
              icon="grid-outline"
              placeholder="Enter category"
              value={category}
              setValue={setCategory}
              returnKeyType="next"
            />
            <InputField

              label="Image URL"
              icon="link-outline"
              placeholder="Paste image URL"
              value={image}
              setValue={setImage}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={addProduct}
              disabled={loading}
            >
              {
                loading ?
                  <ActivityIndicator color="#fff" />
                  :
                  <>
                    <Ionicons
                      name="add-circle-outline"
                      size={22}
                      color="#fff"
                    />

                    <Text style={styles.buttonText}>
                      Add Product
                    </Text>
                  </>
              }

            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function InputField({

  label,
  icon,
  placeholder,
  value,
  setValue,
  keyboardType,
  returnKeyType,

}: any) {

  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.inputBox}>

        <Ionicons
          name={icon}
          size={20}
          color="#64748B"
        />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          style={[
            styles.input,
            Platform.OS === "web"
              ? ({ outlineStyle: "none" } as any)
              : null,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F7",
  },
  wrapper: {
    width: "100%",
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
    marginBottom: 25,
  },
  imageCard: {
    height: 260,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D6E4F0",
  },
  previewImage: {
    width: "90%",
    height: "90%",
  },
  previewText: {
    marginTop: 10,
    color: "#9CA3AF",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 15,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
  },
  inputBox: {
    height: 55,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#111827",
  },
  button: {
    height: 58,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  successBox: {
    width: "100%",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  successText: {
    marginLeft: 8,
    color: "#166534",
    fontWeight: "600",
    fontSize: 15,
  },
});