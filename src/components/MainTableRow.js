import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";

import { ModalChooseCar } from "./ui/ModalChooseCar";

export const MainTableRow = ({ obDay }) => {
  const tableList = [8, 10, 12, 15, 17, 19];

  const [modalVisible, setModalVisible] = useState(false);
  const [obFreeCarsInTime, setobFreeCarsInTime] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  // const chooseCar = useSelector((state) => state.lessons.modalChooseCar);

  // if (chooseCar.modal) {
  //   setModalVisible(false);
  // }

  return (
    <View style={styles.row}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ModalChooseCar
              obFreeCars={obFreeCarsInTime}
              date={date}
              time={time}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text>{obDay.item.date}</Text>
      </View>

      <View>
        <FlatList
          data={tableList}
          renderItem={({ item }) => {
            if (obDay.item.time[item].car_count === 0) {
              return (
                <View style={styles.tr}>
                  <Text>{item}.00</Text>
                  <Text>Нет свободных машин</Text>
                </View>
              );
            } else {
              return (
                <View style={styles.tr}>
                  <Text>{item}:00</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setDate(obDay.item.date);
                      setTime(item);
                      setModalVisible(true);
                      setobFreeCarsInTime(obDay.item.time[item].car_items);
                    }}
                  >
                    <Text>
                      {"Свободно " +
                        obDay.item.time[item].car_count +
                        " машин (-ы)"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    marginVertical: 15,
    overflow: "hidden",
  },
  tr: {
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 5,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header: {
    flex: 1,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    color: "#fff",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
