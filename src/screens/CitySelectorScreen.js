import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
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
    Haptics.selectionAsync();
  };

  const handleConfirm = () => {
    if (selectedCity) {
      navigation.navigate('Sedes', { ciudad: selectedCity });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      {/* Hero Section */}
      <View className="relative w-full h-[250px]">
        <Image
          source={require('../../src/assets/gym-hero-1.jpg')}
          className="w-full h-full"
          resizeMode="cover"
        />
        <Text className="absolute bottom-0 w-full text-center text-2xl text-white bg-black/70 p-4 rounded">
          ¡Bienvenido a LevelUp!
        </Text>
      </View>

      {/* Selección de ciudad */}
      <View className="p-5 items-center">
        <Text className="text-xl font-bold mb-5">Selecciona tu ciudad</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          cities.map((city) => (
            <TouchableOpacity
              key={city.id}
              className={`p-4 rounded mb-2 w-full items-center ${
                selectedCity?.id === city.id ? 'bg-blue-100' : 'bg-gray-200'
              }`}
              onPress={() => handleSelectCity(city)}
            >
              <Text className="text-base">{city.name}</Text>
            </TouchableOpacity>
          ))
        )}

        <View className="mt-5 w-full">
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
