import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { registrationLesson } from "../../store/actions/lessons";

export const ModalChooseCar = ({ obFreeCars, date, time }) => {
  const dispatch = useDispatch();
  let carList = JSON.parse(obFreeCars);

  if (carList.empty != undefined) {
    return (
      <View>
        <Text style={styles.no_cars}>
          {carList.empty} на {time}:00
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Text>{time}:00</Text>
      </View>
      <View>
        <FlatList
          data={carList}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.row}>
                <Text>
                  {item.mark} {item.number}
                </Text>
                <Text>({item.transmission})</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(registrationLesson(date, time, item.id)).then();
                }}
              >
                <Text>Выбрать</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 5,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "nowrap",
    color: "black",
    flexWrap: "wrap",
  },
  no_cars: {
    textAlign: "center",
  },
});
