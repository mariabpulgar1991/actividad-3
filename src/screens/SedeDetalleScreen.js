import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const SedeDetalleScreen = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/963136-947726-default/branches/{id}/planes') 
      .then((res) => res.json())
      .then((data) => {
        setPlanes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar los planes:', err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.planCard}>
      <Text style={styles.planTitle}>{item.plan_nombre}</Text>
      <Text style={styles.planDescripcion}>{item.plan_descripcion}</Text>
      <Text style={styles.planTurnos}>
        Turnos: {item.plan_turnos.join(', ')}
      </Text>
      <Text style={styles.planPrecio}>${item.plan_precio} / mes</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <Text style={styles.titleText}>Planes disponibles</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={planes}
          keyExtractor={(item) => item.plan_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
};

export default SedeDetalleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  planPrecio: {
    fontSize: 16,
    color: '#007bff',
    marginVertical: 4,
  },
  planDescripcion: {
    fontSize: 14,
    color: '#555',
  },
  titleText: {
    fontSize: 24,
    textAlign:'center',
    paddingBlockStart: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
