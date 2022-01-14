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

import { returnLesson } from "../store/actions/lessons";

export const LessonsTableRow = ({ lesson }) => {
  const dispatch = useDispatch();
  const isReturnLesson = lesson.item.returnLesson;
  const saveHandler = () => {
    Alert.alert("", "Отменить занятие?", [
      {
        text: "Нет",
        style: "cancel",
      },
      { text: "Да", onPress: () => dispatch(returnLesson(lesson.item.id)) },
    ]);
  };

  let wrapperReturnLesson = isReturnLesson ? (
    <Text style={{ color: "red", fontWeight: "bold" }}>x</Text>
  ) : (
    <Text></Text>
  );

  return (
    <View style={styles.row}>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text>{lesson.item.date}</Text>
          <Text>{lesson.item.clock}</Text>
          <Text>{JSON.parse(lesson.item.car).number}</Text>
          <Text>{JSON.parse(lesson.item.car).model}</Text>
        </View>
        <TouchableOpacity onPress={() => saveHandler()}>
          {wrapperReturnLesson}
        </TouchableOpacity>
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
  },
});
