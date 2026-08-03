import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup() {
    Keyboard.dismiss();

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Signup Failed", error.message);
      return;
    }

    Alert.alert(
      "Success",
      "Account created successfully!"
    );

    router.replace("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // enabled={Platform.OS === "ios"}
         keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingTop: isMobile ? 45 : 30,
              paddingHorizontal: isMobile ? 24 : 80,
              paddingBottom: isMobile ? 70 : 30,
            },
          ]}
        >
          <View
            style={[
              styles.header,
              {
                maxWidth: isMobile ? "100%" : 480,
                alignSelf: "center",
              },
            ]}
          >
            <View
              style={[
                styles.logoCircle,
                {
                  width: isMobile ? 92 : 74,
                  height: isMobile ? 92 : 74,
                  borderRadius: isMobile ? 46 : 37,
                },
              ]}
            >
              <Ionicons
                name="bag-handle"
                size={isMobile ? 36 : 32}
                color="#fff"
              />
            </View>

            <Text
              style={[
                styles.title,
                {
                  fontSize: isMobile ? 30 : 38,
                },
              ]}
            >
              TechVerse Store
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.subtitle}>Create Your Account</Text>
              <Text
                style={{
                  fontSize: isMobile ? 20 : 24,
                  marginLeft: 5,
                }}
              >
                🚀
              </Text>
            </View>

            <Text
              style={[
                styles.description,
                {
                  fontSize: isMobile ? 15 : 14,
                },
              ]}
            >
              Join TechVerse Store and start shopping.
            </Text>
          </View>

          <View
            style={[
              styles.formContainer,
              {
                maxWidth: isMobile ? "100%" : 480,
                alignSelf: "center",
                width: "100%",
              },
            ]}
          >
            {/* Full Name */}

            <View
              style={[
                styles.inputBox,
                {
                  height: isMobile ? 55 : 50,
                },
              ]}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color="#64748B"
              />

              <TextInput
                style={[
                  styles.input,
                  Platform.OS === "web"
                    ? ({ outlineStyle: "none" } as any)
                    : null,
                ]}
                placeholder="Full Name"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            {/* Email */}
            <View
              style={[
                styles.inputBox,
                {
                  height: isMobile ? 55 : 50,
                },
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color="#64748B"
              />

              <TextInput
                style={[
                  styles.input,
                  Platform.OS === "web"
                    ? ({ outlineStyle: "none" } as any)
                    : null,
                ]}
                placeholder="Email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            {/* Password */}
            <View
              style={[
                styles.inputBox,
                {
                  height: isMobile ? 55 : 50,
                },
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#64748B"
              />

              <TextInput
                style={[
                  styles.input,
                  Platform.OS === "web"
                    ? ({ outlineStyle: "none" } as any)
                    : null,
                ]}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
              />


              <TouchableOpacity
                onPress={() => setHidePassword(!hidePassword)}
              >
                <Ionicons
                  name={
                    hidePassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />

              </TouchableOpacity>

            </View>
            {/* Confirm Password */}

            <View
              style={[
                styles.inputBox,
                {
                  height: isMobile ? 55 : 50,
                },
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#64748B"
              />

              <TextInput
                style={[
                  styles.input,
                  Platform.OS === "web"
                    ? ({ outlineStyle: "none" } as any)
                    : null,
                ]}
                placeholder="Confirm Password"
                placeholderTextColor="#94A3B8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
              />

              <TouchableOpacity
                onPress={() => setHidePassword(!hidePassword)}
              >
                <Ionicons
                  name={
                    hidePassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />

              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.signupButton,
              {
                width: isMobile ? "100%" : "36%",
                alignSelf: "center",
              },
              loading && { opacity: 0.7 },
            ]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupText}>
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={[
              styles.orContainer,
              {
                width: isMobile ? "100%" : "65%",
                alignSelf: "center",
              },
            ]}
          >
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.login}>
              Already have an account?
              <Text style={styles.loginBold}> Log In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F7",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  card: {
    width: "90%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  logoCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  formContainer: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2563EB",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: "#D9E2EC",   // ← Light grey instead of blue
    paddingHorizontal: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },
  description: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 5,
    textAlign: "center",
  },
  signupButton: {
    marginTop: 12,
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  orText: {
    marginHorizontal: 12,
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },
  login: {
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
  },
  loginBold: {
    color: "#2563EB",
    fontWeight: "bold",
  },
});