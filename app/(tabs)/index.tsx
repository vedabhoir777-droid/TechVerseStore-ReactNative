import ProductSection from "@/components/ProductSection";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySection from "../../components/CategorySection";
import { supabase } from "../../lib/supabase";

const { width } = Dimensions.get("window");
export default function HomeScreen() {
  const [logoutHover, setLogoutHover] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: 40,
//         }}
//       >
//         {/* HEADER */}
//         <View style={styles.header}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.welcome}>
//               Welcome Back👋
//             </Text>

//             <Text style={styles.logo}>
//               ⚡ TechVerse Store
//             </Text>

//             <Text style={styles.tagline}>
//               Explore the Latest Tech
//             </Text>

//           </View>

//           <Pressable
//             style={styles.iconButton}
//             onPress={handleLogout}
//           >

//             <Ionicons
//               name="log-out-outline"
//               size={22}
//               color="#111827"
//             />

//           </Pressable>
//         </View>

//         {/* SEARCH BAR */}

//         <View style={styles.searchBar}>

//           <Ionicons
//             name="search"
//             size={22}
//             color="#64748B"
//           />

//           <TextInput
//             placeholder="Search mobiles, laptops, watches..."
//             placeholderTextColor="#94A3B8"
//             style={[
//               styles.searchInput,
//               Platform.OS === "web" &&
//               ({ outlineStyle: "none" } as any)
//             ]}
//           />

//           <Ionicons
//             name="options-outline"
//             size={22}
//             color="#2563EB"
//           />
//         </View>

//         {/* HERO BANNER */}

//         <LinearGradient
//           colors={[
//             "#0F172A",
//             "#3B82F6"
//           ]}

//           start={{
//             x: 0,
//             y: 0.5
//           }}

//           end={{
//             x: 1,
//             y: 0.5
//           }}

//           style={styles.heroContainer}

//         >

//           <View style={styles.heroContent}>
//             <View style={styles.saleBadge}>
//               <Text style={styles.saleText}>
//                 🔥 MEGA TECH SALE
//               </Text>
//             </View>
//             <Text style={styles.heroTitle}>
//               Upgrade Your Setup
//             </Text>

//             <Text style={styles.heroOffer}>
//               Save up to 40%
//             </Text>

//             <Text style={styles.heroDescription}>
//               Laptops • Mobiles • Watches • Audio
//             </Text>

//             <TouchableOpacity
//               style={styles.shopNowButton}
//             >

//               <Text style={styles.shopNowText}>
//                 Shop Now
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.heroImageBox}>

//             <Image
//               source={
//                 require("../../assets/images/product.png")
//               }
//               resizeMode="contain"
//               style={styles.heroImage}
//             />
//           </View>
//         </LinearGradient>

//         {/* CATEGORIES */}
//         <CategorySection />

//         {/* TECH DEALS */}

//         <TouchableOpacity
//           style={styles.dealCard}
//         >

//           <View>

//             <Text style={styles.dealTitle}>
//               🔥 Tech Deals of the Day
//             </Text>

//             <Text style={styles.dealSubtitle}>
//               Save up to 50% on Premium Gadgets
//             </Text>
//             <Text style={styles.offerText}>
//               Limited Time Offer
//             </Text>

//             <View style={styles.shopButton}>

//               <Text style={styles.shopButtonText}>
//                 Shop Deals
//               </Text>

//             </View>
//           </View>

//           <View style={styles.dealImageContainer}>
//             <Image
//               source={require("../../assets/images/deals.png")}
//               style={styles.dealImage}
//               resizeMode="contain"
//             />
//           </View>
//         </TouchableOpacity>

//         {/* PRODUCTS */}

//         <ProductSection />
//       </ScrollView>
//     </SafeAreaView>
//   );
return (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: "#EEF2F7",
    }}
    edges={["top"]}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 10,      // ← was creating extra space
        paddingBottom: 110,  // enough space above bottom tabs
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>
            Welcome Back👋
          </Text>

          <Text style={styles.logo}>
            ⚡ TechVerse Store
          </Text>

          <Text style={styles.tagline}>
            Explore the Latest Tech
          </Text>
        </View>

        <Pressable
          style={styles.iconButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#111827"
          />
        </Pressable>
      </View>

      {/* SEARCH BAR */}

      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={22}
          color="#64748B"
        />

        <TextInput
          placeholder="Search mobiles, laptops, watches..."
          placeholderTextColor="#94A3B8"
          style={[
            styles.searchInput,
            Platform.OS === "web" &&
              ({ outlineStyle: "none" } as any),
          ]}
        />

        <Ionicons
          name="options-outline"
          size={22}
          color="#2563EB"
        />
      </View>

      {/* HERO */}

      <LinearGradient
        colors={["#0F172A", "#3B82F6"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.heroContainer}
      >
        <View style={styles.heroContent}>
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>
              🔥 MEGA TECH SALE
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            Upgrade Your Setup
          </Text>

          <Text style={styles.heroOffer}>
            Save up to 40%
          </Text>

          <Text style={styles.heroDescription}>
            Laptops • Mobiles • Watches • Audio
          </Text>

          <TouchableOpacity
            style={styles.shopNowButton}
          >
            <Text style={styles.shopNowText}>
              Shop Now
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroImageBox}>
          <Image
            source={require("../../assets/images/product.png")}
            resizeMode="contain"
            style={styles.heroImage}
          />
        </View>
      </LinearGradient>

      <CategorySection />

      <TouchableOpacity style={styles.dealCard}>
        <View>
          <Text style={styles.dealTitle}>
            🔥 Tech Deals of the Day
          </Text>

          <Text style={styles.dealSubtitle}>
            Save up to 50% on Premium Gadgets
          </Text>

          <Text style={styles.offerText}>
            Limited Time Offer
          </Text>

          <View style={styles.shopButton}>
            <Text style={styles.shopButtonText}>
              Shop Deals
            </Text>
          </View>
        </View>

        <View style={styles.dealImageContainer}>
          <Image
            source={require("../../assets/images/deals.png")}
            style={styles.dealImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <ProductSection />
    </ScrollView>
  </SafeAreaView>
);
 }
 const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: "#EEF2F7",
   },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  welcome: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "600",
  },
  logo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 4,
  },
  tagline: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 4,
  },
  searchBar: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#111827",
  },
  heroContainer: {
    marginHorizontal: 12,
    height: width < 600 ? 290 : 230,
    borderRadius: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: width < 600 ? 20 : 0,
    marginBottom: 18,
  },
  heroContent: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: width < 600 ? 10: 0,
  },
  heroSmallText: {
    color: "#DBEAFE",
    fontSize: 13,
    fontWeight: "700",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: width < 600 ? 20 : 24,
    fontWeight: "900",
    marginTop: 6,
  },
  heroOffer: {
    color: "#FFFFFF",
    fontSize: width < 600 ? 18 : 22,
    fontWeight: "800",
    marginTop: 4,
  },
  heroDescription: {
    color: "#E0F2FE",
    fontSize: width < 600 ? 12 : 14,
    marginTop: 8,
    lineHeight: 20,
  },
  shopNowButton: {
    width: 130,
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    elevation: 4,
    borderWidth: 1,
    alignSelf: "flex-start",
    borderColor: "#E2E8F0",
  },
  shopNowText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "800",
  },
  heroImageBox: {
    flex: width < 600 ? 1.4 : 1.2,
    width: width < 600 ? "50%" : "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: width < 600 ? "125%" : "112%",
    height: width < 600 ? "125%" : "112%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  dealCard: {
    marginHorizontal: 18,
    marginBottom: 24,
    borderRadius: 24,
    padding: width < 600 ? 16 : 22,
    minHeight: width < 600 ? 180 : 160,
    backgroundColor: "#111827",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 6,
  },
  dealTitle: {
    color: "#FFFFFF",
    fontSize: width < 600 ? 18 : 20,
    fontWeight: "900",
  },

  dealSubtitle: {
    color: "#D1D5DB",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
    width: width < 600 ? 140 : 220,
    fontWeight: "600",
  },
  dealImageContainer: {
    width: width < 600 ? 140 : 210,
    height: width < 600 ? 150 : 180,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dealImage: {
    width: width < 600 ? 150 : 190,
    height: width < 600 ? 150 : 190,
    marginRight: 10,   // Try 20–30
  },
  shopButton: {
    marginTop: width < 600 ? 14 : 16,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: width < 600 ? 20 : 22,
    paddingVertical: width < 600 ? 10 : 11,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  shopButtonText: {
    color: "#2563EB",
    fontWeight: "800",

  },
  saleBadge: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
     marginBottom: width < 600 ? 10 : 0,
  },
  saleText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  offerText: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "800",
  },
});
