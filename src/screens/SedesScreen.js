import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const SedesScreen = () => {
    console.log('🚀 SedesScreen montado correctamente');

  const route = useRoute();
  const navigation = useNavigation();
  const { ciudad } = route.params;

  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSede, setSelectedSede] = useState(null);

  const sedesPorCiudad = {
    Barranquilla: [1, 2, 3, 4, 5, 6],
    Cartagena: [7, 8, 9, 10, 11, 12],
    Montería: [13, 14, 15, 16, 17, 18],
    'Santa Marta': [19, 20, 21, 22, 23, 24],
  };

  const handleSelectedSede = (sede) => {
    setSelectedSede(sede);
    Haptics.selectionAsync();
  };

 const handleConfirm = () => {
  if (selectedSede) {
    navigation.navigate('SedeDetalle', { sede: selectedSede });
  }
};


  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const ids = sedesPorCiudad[ciudad.name];

        const requests = ids.map((id) =>
          fetch(`https://mock.apidog.com/m1/922983-905608-default/sedes/${id}`)
            .then((res) => {
              if (!res.ok) throw new Error(`Error en la sede ${id}`);
              return res.json();
            })
        );

        const results = await Promise.allSettled(requests);
        const sedesExitosas = results
          .filter((r) => r.status === 'fulfilled')
          .map((r) => r.value);

        if (sedesExitosas.length === 0) throw new Error('Todas las sedes fallaron');

        setSedes(sedesExitosas);
      } catch (error) {
        console.error('🔴 Error al cargar las sedes:', error.message);
        Alert.alert('Error', 'No se pudieron cargar las sedes');
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, [ciudad.name]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white px-5 py-6 w-full h-full">
      <Text className="text-2xl font-bold mb-4 text-center">Sedes en {ciudad.name}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        sedes.map((sede, index) => (
          <TouchableOpacity
            key={sede.id || index}
            className={`p-4 rounded mb-3 border ${
              selectedSede?.id === sede.id
                ? 'bg-blue-100 border-blue-500 shadow-md'
                : 'bg-gray-100 border-gray-300'
            }`}
            onPress={() => handleSelectedSede(sede)}
          >
            <Text className="text-lg font-semibold">
              {sede.nombre || 'Nombre no disponible'}
            </Text>
            {sede.descripcion ? (
              <Text className="text-sm text-gray-600 mt-1">{sede.descripcion}</Text>
            ) : null}
          </TouchableOpacity>
        ))
      )}

      <View className="mt-6 w-full">
        <Button
          title="Confirmar ciudad"
          onPress={handleConfirm}
          disabled={!selectedSede}
          color="#007bff"
        />
      </View>
    </ScrollView>
  );
};

export default SedesScreen;
