import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-native-date-picker";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { LessonsTableRow } from "../../components/LessonsTableRow";
import { getUserLessons } from "../../store/actions/user";

const LessonsScreen = () => {
  const dispatch = useDispatch();

  dispatch(getUserLessons());
  const userLessons = useSelector((state) => state.user.userLessons).reverse();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#2E7ECC" />
      <View></View>

      <FlatList
        data={userLessons}
        renderItem={(lesson) => <LessonsTableRow lesson={lesson} />}
      />
    </SafeAreaView>
  );
};

export default LessonsScreen;

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
