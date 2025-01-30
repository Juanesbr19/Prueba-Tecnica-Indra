import React, { useEffect, useState }  from "react";
import { Text, Image, StyleSheet, FlatList,ActivityIndicator} from "react-native";
import axios from "axios";

const PersonScreen = ({route}) => {
    const{character} =route.params;
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisodes = async () => {
          try {
            const episodeIds = character.episode.map((url) => url.split("/").pop()); // ✅ Extraemos los IDs de los episodios
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
            setEpisodes(Array.isArray(response.data) ? response.data : [response.data]); // ✅ Convertimos en array si es un solo episodio
          } catch (error) {
            console.error("Error cargando episodios:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchEpisodes();
    }, []);
    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;


    return(
        <FlatList
        ListHeaderComponent ={
          <>
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.info}>Estado: {character.status}</Text>
            <Text style={styles.info}>Especie: {character.species}</Text>
            <Text style={styles.info}>Género: {character.gender}</Text>
            <Text style={styles.info}>Origen: {character.origin.name}</Text>
            <Text style={styles.info}>Ubicación: {character.location.name}</Text>
            <Text style={styles.episodesTitle}>📺 Episodios:</Text>
          </>
        }
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.episodeItem}>🔹 {item.episode} - {item.name}</Text>
        )}
      />
      
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "##adff2f",
    },
    image: {
      width: 150,
      height: 150,
      alignSelf: "center",
      borderRadius: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 10,
    },
    info: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 10,
    },
    episodesTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    episodeItem: {
      padding: 5,
      fontSize: 16,
      backgroundColor: "#ddd",
      borderRadius: 5,
      marginVertical: 2,
    },
  });


export default PersonScreen;
