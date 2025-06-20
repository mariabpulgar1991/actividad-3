import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

const SedeDetalleScreen = () => {
  const navigation = useNavigation();
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectedPlan = (plan) => {
    setSelectedPlan(plan);
    Haptics.selectionAsync();
  };

  const handleConfirm = () => {
    if (selectedPlan) {
      navigation.navigate("Access", { plan: selectedPlan });
    }
  };

  useEffect(() => {
    fetch(
      "https://mock.apidog.com/m1/963136-947726-default/branches/{id}/planes"
    )
      .then((res) => res.json())
      .then((data) => {
        setPlanes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar los planes:", err);
        setLoading(false);
      });
  }, []);

  // const renderItem = ({ item }) => (
  //   <Pressable style={styles.planCard}>
  //     <Text style={styles.planTitle}>{item.plan_nombre}</Text>
  //     <Text style={styles.planDescripcion}>{item.plan_descripcion}</Text>
  //     <Text style={styles.planTurnos}>
  //       Turnos: {item.plan_turnos.join(", ")}
  //     </Text>
  //     <Text style={styles.planPrecio}>${item.plan_precio} / mes</Text>
  //   </Pressable>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Planes disponibles</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        planes.map((plan, index) => (
          <TouchableOpacity
            key={plan.plan_id || index}
            style={[
              styles.planCard,
              selectedPlan?.plan_id === plan.plan_id &&
                styles.planButtonSelected,
            ]}
            onPress={() => handleSelectedPlan(plan)}
          >
            <Text style={styles.planTitle}>
              {plan.plan_nombre || "Nombre no disponible"}
            </Text>
            {plan.plan_descripcion ? (
              <Text style={styles.planDescripcion}>
                {plan.plan_descripcion}
              </Text>
            ) : null}
            <Text style={styles.planTurnos}>
              Turnos: {plan.plan_turnos.join(", ")}
            </Text>
            <Text style={styles.planPrecio}>${plan.plan_precio} / mes</Text>
          </TouchableOpacity>
        ))
        // <FlatList
        //   data={planes}
        //   keyExtractor={(item) => item.plan_id.toString()}
        //   renderItem={renderItem}
        //   contentContainerStyle={{ padding: 20 }}
        // />
      )}
      <View style={styles.confirmButton}>
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  planCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  planPrecio: {
    fontSize: 16,
    color: "#007bff",
    marginVertical: 4,
  },
  planDescripcion: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  planButtonSelected: {
    backgroundColor: "#cce5ff",
  },
  confirmButton: {
    marginTop: 20,
    width: "100%",
  },
});
