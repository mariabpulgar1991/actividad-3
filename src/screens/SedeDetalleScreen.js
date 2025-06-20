import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

const SedeDetalleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sede } = route.params; // 👈 recibe la sede seleccionada

  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectedPlan = (plan) => {
    setSelectedPlan(plan);
    Haptics.selectionAsync();
};

console.log('🚨 SedeDetalleScreen montado desde:\n', new Error().stack);


  const handleConfirm = () => {
    if (selectedPlan) {
      navigation.navigate("Access", { plan: selectedPlan });
    }
  };

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch(
          `https://mock.apidog.com/m1/963136-947726-default/branches/${sede.id}/planes`
        );
        const data = await response.json();
        setPlanes(data);
      } catch (error) {
        console.error("Error al cargar los planes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, [sede.id]);

  return (
    <View className="p-5 bg-white w-full h-full">
      <Text className="text-2xl font-bold mb-4 text-center">Planes disponibles</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        planes.map((plan, index) => (
          <TouchableOpacity
            key={plan.plan_id || index}
            className={`p-4 rounded mb-3 border ${
              selectedPlan?.plan_id === plan.plan_id
                ? "bg-blue-100 border-blue-500 shadow-md"
                : "bg-gray-100 border-gray-300"
            }`}
            onPress={() => handleSelectedPlan(plan)}
          >
            <Text className="text-lg font-semibold">
              {plan.plan_nombre || "Nombre no disponible"}
            </Text>
            {plan.plan_descripcion ? (
              <Text className="text-sm text-gray-600 mt-1">{plan.plan_descripcion}</Text>
            ) : null}
            <Text className="text-sm mt-1">
              Turnos: {plan.plan_turnos.join(", ")}
            </Text>
            <Text className="text-base text-blue-600 mt-1 font-medium">
              ${plan.plan_precio} / mes
            </Text>
          </TouchableOpacity>
        ))
      )}
      <View className="mt-6 w-full">
        <Button
          title="Confirmar ciudad"
          onPress={handleConfirm}
          disabled={!selectedPlan}
          color="#007bff"
        />
      </View>
    </View>
  );
};

export default SedeDetalleScreen;
