import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const CitySelectorScreen = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        'https://mock.apidog.com/m1/922983-905608-default/cities?apidogApiId=17201449'
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las ciudades');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    Haptics.selectionAsync(); // ✅ Retroalimentación háptica
  };

  const handleConfirm = () => {
    if (selectedCity) {
      navigation.navigate('Sedes', { ciudad: selectedCity });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={require('../../src/assets/gym-hero-1.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <Text style={styles.heroText}>¡Bienvenido a LevelUp!</Text>
      </View>

      {/* Selección de ciudad */}
      <View style={styles.content}>
        <Text style={styles.title}>Selecciona tu ciudad</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          cities.map((city) => (
            <TouchableOpacity
              key={city.id}
              style={[
                styles.cityButton,
                selectedCity?.id === city.id && styles.cityButtonSelected,
              ]}
              onPress={() => handleSelectCity(city)}
            >
              <Text style={styles.cityButtonText}>{city.name}</Text>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.confirmButton}>
          <Button
            title="Confirmar ciudad"
            onPress={handleConfirm}
            disabled={!selectedCity}
            color="#007bff"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CitySelectorScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  hero: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 0,
    fontSize: 28,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 5,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    marginBottom: 20,
  },
  cityButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  cityButtonSelected: {
    backgroundColor: '#cce5ff',
  },
  cityButtonText: {
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    width: '100%',
  },
});
