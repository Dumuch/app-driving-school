import AsyncStorage from "@react-native-community/async-storage";

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER_UPDATE,
  COUNT_LESSONS,
  USER_LESSONS,
} from "../types";

const initialState = {
  userData: [],
  countLessons: 0,
  userLessons: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      const id = action.payload.id;
      const name = action.payload.name;
      const group = action.payload.group;
      const lessons = action.payload.lessons;
      const email = action.payload.email;
      const token = action.payload.token;
      const error = action.payload.error;

      let dataToSend = {
        id: id,
        name: name,
        group: group,
        lessons: lessons,
        email: email,
        token: token,
        error: error,
      };

      return {
        ...state,
        userData: dataToSend,
      };

    case AUTH_USER_UPDATE:
      const userEmail = action.payload.email;
      const userName = action.payload.name;

      AsyncStorage.getItem("user_jwt").then((value) => {
        if (value != null) {
          let dataToSend = { name: userName, email: userEmail, token: value };

          return {
            ...state,
            userData: dataToSend,
          };
        } else {
          return state;
        }
      });

    case COUNT_LESSONS:
      const countLessons = action.payload.countLessons;
      return {
        ...state,
        countLessons: countLessons,
      };

    case USER_LESSONS:
      const userLessons = action.payload.userLessons;
      return {
        ...state,
        userLessons: userLessons,
      };

    default:
      return state;
  }
};