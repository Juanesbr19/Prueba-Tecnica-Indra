import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import PersonList from "../components/PersonList";

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rick & Morty </Text>
      <Text style={styles.subtitle}>Personajes</Text>
      <PersonList navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#4b0082" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10, color :"#f8f8ff" },
  subtitle:  { fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 5, color :"#f8f8ff" }
});

export default HomeScreen;