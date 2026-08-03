import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  {
    id: "1",
    name: "Mobiles",
    image: "https://93mobiles.com/wp-content/uploads/2026/03/610Sug7kIML._SL1500_-2.jpg"
  },
  {
    id: "2",
    name: "Laptops",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQNFLPtDHZh92xAgLvs2w39X9z6GAYc_SPLBbDLFYow&s=10"
  },
  {
    id: "3",
    name: "Audio",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Nr59GAYb0do1oxOrTDGCQG953n9SrGN3w27uPOfnEQ&s=10"
  },
  {
    id: "4",
    name: "Smart Watch",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS5hwTT9ypPECaNXoJmS4AmusA9eFiNsiezpW-r5UO6A&s=10"
  },
  {
    id: "5",
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575"
  },
  {
    id: "6",
    name: "Camera",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJSIh4iv6OKJ-IEbeMLsQkLcFc8b0JbHX8hfkhtzQtw&s=10"
  },
  {
    id: "7",
    name: "TV",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8oARQI5XELuo7BjBrjVqSKupPa6r2vZaFmJpbeoW6w&s=10"
  },
  {
    id: "8",
    name: "Accessories",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKX64ucxu5xFCraTtaQaSA-Pb1vltaH4e-se_vySm-g&s=10"
  },
  {
    id: "9",
    name: "Tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
  },
  {
    id: "10",
    name: "Monitors",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
  },
  {
    id: "11",
    name: "Keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
  },
  {
    id: "12",
    name: "Speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d"
  },
  {
    id: "13",
    name: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827"
  },
  {
    id: "14",
    name: "Power Bank",
    image: "https://www.portronics.com/cdn/shop/files/Power_Shutter_wireless_power_bank_for.jpg?v=1730270085"
  },
];
export default function CategorySection() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const scrollOffset = useRef(0);

  const scrollRight = () => {
    scrollOffset.current += 350;

    flatListRef.current?.scrollToOffset({
      offset: scrollOffset.current,
      animated: true,
    });
  };

  const scrollLeft = () => {
    scrollOffset.current = Math.max(scrollOffset.current - 350, 0);

    flatListRef.current?.scrollToOffset({
      offset: scrollOffset.current,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>
          Categories
        </Text>

        <View style={styles.arrowContainer}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={scrollLeft}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color="#2563EB"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.arrow}
            onPress={scrollRight}
          >
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#111827"
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingRight: 20,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/shop",
                params: {
                  category: item.name,
                },
              })
            }
          >
            <View style={styles.imageBox}>
              <Image
                source={{ uri: item.image }}
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  heading: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
  },
  arrowContainer: {
    flexDirection: "row",
  },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 5,
    boxShadow: "0px 3px 10px rgba(0,0,0,0.08)",
  },
  card: {
    width: 88,
    alignItems: "center",
    marginRight: 14,
  },
  imageBox: {
    width: 88,
    height: 88,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  name: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },
});
