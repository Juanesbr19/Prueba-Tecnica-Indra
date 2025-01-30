import React from "react";
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet,TouchableOpacity} from "react-native";
import FetchPerson from "../hooks/FetchPerson";

const PersonList=({navigation}) =>{
    const{data,loading,error}=FetchPerson();

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error{error}</Text>;

    return (
        <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Personajes", { character: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      );
    };

const styles = StyleSheet.create({
    card: { padding: 5, alignItems: "center", backgroundColor: "#adff2f", marginVertical: 10, marginHorizontal:50, borderRadius: 10 },
    image: { width: 100, height: 100, borderRadius: 10 },
    name: { fontSize: 18, fontWeight: "bold" },
    errorText: { color: "red", textAlign: "center", marginTop: 20 },
    });
export default PersonList;

