import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  user_id: string;
  category:string;
};

const { width } = Dimensions.get("window");
const isMobile = width < 600;
const cardWidth = isMobile
  ? (width - 40) / 2
  : 260;

export default function ShopScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const params = useLocalSearchParams<{
    category?: string;
  }>();

  const category =
    params.category && !Array.isArray(params.category)
      ? params.category
      : undefined;

  console.log(category);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [params.category])
  );

  async function fetchProducts() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProducts([]);
        return;
      }

      let query = supabase
        .from("products")
        .select("*")
        .eq("user_id", user.id);

      if (params.category) {
        query = query.eq("category", params.category as string);
      }

      const { data, error } = await query.order("id", {
        ascending: false
      });

      if (error) {
        console.log(error.message);
        return;
      }

      setProducts(data ?? []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = useMemo(() => {
    const text = search.toLowerCase();

    return products.filter(
      (item) =>
        item.name?.toLowerCase().includes(text) ||
        item.brand?.toLowerCase().includes(text) ||
        item.category?.toLowerCase().includes(text)
    );
  }, [products, search]);
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.card}>

      {/* Wishlist */}
      <TouchableOpacity style={styles.heart}>
        <Ionicons
          name="heart-outline"
          size={18}
          color="#64748B"
        />
      </TouchableOpacity>

      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          Trending
        </Text>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Name */}
      <Text
        numberOfLines={1}
        style={styles.productName}
      >
        {item.name}
      </Text>

      {/* Brand */}
      <Text
        numberOfLines={1}
        style={styles.brand}
      >
        {item.brand}
      </Text>

      {/* Rating */}
      <View style={styles.ratingRow}>

        <Ionicons
          name="star"
          size={14}
          color="#FBBF24"
        />

        <Text style={styles.rating}>
          4.8
        </Text>

        <Text style={styles.review}>
          (128)
        </Text>
      </View>

      {/* Price */}
      <Text style={styles.price}>
        ₹ {item.price ?
          item.price.toLocaleString("en-IN") : "0"}
      </Text>

      {/* Add To Cart */}
      <TouchableOpacity style={styles.addButton}>

        <Ionicons
          name="cart-outline"
          size={18}
          color="#FFFFFF"
        />

        <Text style={styles.addText}>
          Add to Cart
        </Text>

      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Shop
        </Text>

        <Text style={styles.subtitle}>
          Explore the latest tech products
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>

        <Ionicons
          name="search"
          size={20}
          color="#64748B"
        />

        <TextInput
          placeholder="Search by product,brand or category.."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
          style={[
            styles.input,
            Platform.OS === "web"
              ? ({ outlineStyle: "none" } as any)
              : null,
          ]}
        />

      </View>

      {/* Result Count */}
      {!loading && (
        <Text style={styles.resultText}>
          {filteredProducts.length} Available Products
          {filteredProducts.length !== 1 ? "s" : ""}
        </Text>
      )}

      {loading ? (

        <View style={{
          alignItems: "center",
          marginTop: 60
        }}>

          <ActivityIndicator
            size="large"
            color="#2563EB"
          />
          <Text style={{
            marginTop: 10,
            color: "#64748B",
            fontSize: 14,
            fontWeight: "600"
          }}>
            Loading products...
          </Text>
        </View>

      ) : filteredProducts.length === 0 ? (

        <View style={styles.empty}>

          <Ionicons
            name="cube-outline"
            size={70}
            color="#CBD5E1"
          />

          <Text style={styles.emptyTitle}>
            No Products Found
          </Text>

          <Text style={styles.emptySubtitle}>
            Add a new product from the Add tab.
          </Text>
        </View>
      ) : (

        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={isMobile ? 2 : 5}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 12,
            marginBottom: 14,
          }}
          contentContainerStyle={{
            paddingBottom: 40,
            alignItems: "flex-start",
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F7",
    paddingTop: 45,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D6E4F0",
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#111827",
  },
  resultText: {
    marginBottom: 14,
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  card: {
    width: cardWidth,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 18,
    elevation: 4,
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 20,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 20,
  },
  badgeText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "800",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "90%",
    height: "90%",
  },
  productName: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },
  brand: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  review: {
    marginLeft: 4,
    fontSize: 11,
    color: "#64748B",
  },
  price: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },
  addButton: {
    marginTop: 14,
    height: 44,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  addText: {
    marginLeft: 6,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    marginTop: 14,
    fontSize: 19,
    fontWeight: "800",
    color: "#1E293B",
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 20,
  },

});