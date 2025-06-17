import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const SedesScreen = () => {
  const route = useRoute();
  const { ciudad } = route.params;

  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapeo de ciudades a IDs de sedes
  const sedesPorCiudad = {
    Barranquilla: [1, 2, 3, 4, 5, 6],
    Cartagena: [7, 8, 9, 10, 11, 12],
    Montería: [13, 14, 15, 16, 17, 18],
    'Santa Marta': [19, 20, 21, 22, 23, 24],
  };

  useEffect(() => {
   const fetchSedes = async () => {
  try {
    const ids = sedesPorCiudad[ciudad.name];
    const requests = ids.map((id) =>
      fetch(`https://mock.apidog.com/m1/922983-905608-default/sedes/${id}`)
        .then((res) => res.json())
    );
    const results = await Promise.all(requests);

    console.log("👉 Resultado individual de sedes:");
    results.forEach((sede, index) => {
      console.log(`Sede ${index + 1}:`, sede);
    });

    setSedes(results);
  } catch (error) {
    Alert.alert('Error', 'No se pudieron cargar las sedes');
  } finally {
    setLoading(false);
  }
};

  

    fetchSedes();
  }, [ciudad.name]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sedes en {ciudad.name}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          sedes.map((sede, index) => (
            <View key={sede.id || index} style={styles.sedeCard}>
              <TouchableOpacity>
                <Text style={styles.sedeName}>
                {sede.nombre || 'Nombre no disponible'}
              </Text>
              {sede.description ? (
                <Text style={styles.sedeDescription}>{sede.description}</Text>
              ) : null}
              </TouchableOpacity>
            </View>
          ))
        )}
    </ScrollView>
  );
};

export default SedesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sedeCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  sedeName: {
    fontSize: 18,
    fontWeight: '600',
  },
  sedeDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});
