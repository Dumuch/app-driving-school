import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { update } from "../../store/actions/user";

const SettingsScreen = () => {
  const showToast = () => {
    ToastAndroid.show("Данные успешно сохранены!", ToastAndroid.SHORT);
  };

  const [name, onChangeName] = useState(null);
  const [email, onChangeEmail] = useState(null);

  const dispatch = useDispatch();
  const userCredentials = useSelector((state) => state.user);

  AsyncStorage.getItem("user_name").then((value) => {
    if (value != null) {
      onChangeName(value);
    }
  });

  AsyncStorage.getItem("user_email").then((value) => {
    if (value != null) {
      onChangeEmail(value);
    }
  });

  const setUserData = () => {
    if (!name) {
      alert("Заполните Имя");
      return;
    }
    if (!email) {
      alert("Введите Email");
      return;
    }

    dispatch(update(name, email));
    showToast(); // Это повесим на условие, если сохранение прошло успешно
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Ваше имя"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="mail@emample.ru"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={setUserData}>
          <Text style={styles.buttonText}>Сохранить изменения</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2E7ECC",
    padding: 10,
    margin: 12,
  },
  buttonText: {
    color: "#fff",
  },
});

export default SettingsScreen;
