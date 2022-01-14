import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { loadFreeCars } from "../store/actions/lessons";
import { addDays } from "../helpers";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const [endDate, setEndDate] = useState(addDays(new Date(), 3));

  const dispatch = useDispatch();

  useEffect(() => {
    setAnimating(false);

    AsyncStorage.getItem("user_jwt").then((value) => {
      if (value === null) {
        navigation.replace("Auth");
      } else {
        // Тут мы побежим в redux запрашивать данные с сервера
        dispatch(
          loadFreeCars(
            moment(startDate).format("YYYY-MM-DD"),
            moment(endDate).format("YYYY-MM-DD")
          )
        );
        navigation.replace("DrawerNavigationRoutes");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2E7ECC" />

      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307ecc",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
