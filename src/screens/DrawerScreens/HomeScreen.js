import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-native-date-picker";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { MainTableRow } from "../../components/MainTableRow";
import {
  loadFreeCars,
  clearRegistrationLesson,
} from "../../store/actions/lessons";
import { getCountLessons } from "../../store/actions/user";
import { addDays } from "../../helpers";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [open, setOpen] = useState({ open: false, date: "start" });

  let maximumDate = endDate;
  let minimumDate = startDate;

  AsyncStorage.getItem("user_jwt").then((value) => {
    if (value != null) {
      dispatch(getCountLessons(value));
    }
  });

  const freeCars = useSelector((state) => state.lessons.freeCars).data;
  const countLessons = useSelector((state) => state.user.countLessons);

  const chooseCar = useSelector((state) => state.lessons.chooseCar);

  if (chooseCar.modal) {
    Alert.alert(chooseCar.message);
    dispatch(clearRegistrationLesson());
    dispatch(
      loadFreeCars(
        moment(minimumDate).format("YYYY-MM-DD"),
        moment(maximumDate).format("YYYY-MM-DD")
      )
    );
  }

  const date = (date) => {
    if (date === "start") {
      return minimumDate;
    } else {
      return maximumDate;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#2E7ECC" />
      <View>
        <Text style={styles.wrapperCountLessons}>
          У вас осталось <Text style={styles.countLessons}>{countLessons}</Text>{" "}
          занятия
        </Text>
      </View>
      <Button
        title="Выбрать начальную дату"
        onPress={() => setOpen({ open: true, date: "start" })}
      />
      <Button
        title="Выбрать конечную дату"
        onPress={() => setOpen({ open: true, date: "end" })}
      />

      <DatePicker
        modal
        mode="date"
        maximumDate={addDays(minimumDate, 14)}
        minimumDate={minimumDate}
        open={open.open}
        date={date(open.date)}
        onConfirm={(date) => {
          setOpen(false);

          if (open.date === "start") {
            setStartDate(date);
            // minimumDate не убирать. Иначе дата назначается с пробуксовкой
            minimumDate = date;
          } else {
            setEndDate(date);
            // maximumDate не убирать. Иначе дата назначается с пробуксовкой
            maximumDate = date;

            dispatch(
              loadFreeCars(
                moment(minimumDate).format("YYYY-MM-DD"),
                moment(maximumDate).format("YYYY-MM-DD")
              )
            );
          }
          date = "";
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <FlatList
        data={freeCars}
        // keyExtractor={(post) => post.id.toString()}
        renderItem={(obDay) => <MainTableRow obDay={obDay} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapperCountLessons: {
    width: "100%",
    textAlign: "center",
    margin: 10,
  },
  countLessons: {
    fontSize: 16,
    color: "red",
  },
});
