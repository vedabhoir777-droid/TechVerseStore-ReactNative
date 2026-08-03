import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
};

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", {
        ascending: false
      });

    if (!error) {
      setProducts(data || []);
    }
  }

  function ProductCard({
    item
  }: {
    item: Product
  }) {

    return (
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Featured
          </Text>
        </View>

        {/* Wishlist */}

        <TouchableOpacity style={styles.heart}>
          <Ionicons
            name="heart-outline"
            size={18}
            color="#64748B"
          />
        </TouchableOpacity>

        {/* Product Image */}

        <View style={styles.imageBox}>
          <Image
            source={{
              uri: item.image
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {item.name}
        </Text>

        <Text style={styles.brand}>
          {item.brand}
        </Text>

        <View style={styles.ratingRow}>

          <Ionicons
            name="star"
            size={15}
            color="#FBBF24"
          />

          <Text style={styles.rating}>
            4.8
          </Text>

          <Text style={styles.review}>
            120 Reviews
          </Text>
        </View>

        <Text style={styles.price}>
          ₹ {Number(item.price).toLocaleString("en-IN")}
        </Text>

        <Text style={styles.delivery}>
          ✓ Free Delivery
        </Text>
      </View>
    );
  }
  return (

    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>
          ⭐ Featured Products
        </Text>

        <TouchableOpacity>
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {
        products.length === 0 ? (
          <Text style={styles.empty}>
            No products available
          </Text>
        )
          :
          (
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductCard item={item} />
              )}
            />
          )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },
  viewAll: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "800",
  },
  empty: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 20,
  },
  card: {
    width: 185,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginRight: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ECEFF4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  heart: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    zIndex: 100,
    elevation: 20,
  },
  imageBox: {
    width: "100%",
    height: 135,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    marginBottom: 10,
  },
  image: {
    width: "95%",
    height: "95%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
  },
  brand: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 4,
  },
  review: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginTop: 8,
  },
  delivery: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16A34A",
    marginTop: 9,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 11,
  },
});
