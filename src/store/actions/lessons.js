import AsyncStorage from "@react-native-community/async-storage";
import { ToastAndroid } from "react-native";
import { SETTINGS } from "../../../settings";
import { LOAD_FREE_CARS, CHOOSE_FREE_CAR, COUNT_LESSONS } from "../types";

//  загрузка свободных автомобилей
export const loadFreeCars = (startDay, endDay) => {
  try {
    return async (dispatch) => {
      AsyncStorage.getItem("user_jwt").then((value) => {
        if (value != null) {
          let dataToSend = {
            startDay: startDay + " 00:00:00",
            endDay: endDay + " 00:00:00",
          };
          let formBody = [];

          for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + "=" + encodedValue);
          }

          formBody = formBody.join("&");

          fetch(SETTINGS.URL + "/api/showFreeCars", {
            method: "POST",
            body: formBody,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              token: value,
            },
          })
            .then(async (res) => {
              const json = await res.json();
              if (json.success != undefined) {
                dispatch({
                  type: LOAD_FREE_CARS,
                  payload: {
                    data: json.success,
                  },
                });
              }
            })
            .catch((error) => {
              console.log("/api/showFreeCars - ", error);
            });
        } else {
          return state;
        }
      });
    };
  } catch (error) {
    console.log("/api/showFreeCars - ", error);
  }
};

// запись на занятие
export const registrationLesson = (date, time, carID) => {
  const dateForBD = date.split(".").reverse().join(".");

  return async (dispatch) => {
    AsyncStorage.getItem("user_jwt").then((value) => {
      if (value != null) {
        const dataToSend = { date: dateForBD, time: time, carID: carID };

        fetch(SETTINGS.URL + "/api/recordToLesson", {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            token: value,
          },
        })
          .then(async (res) => {
            const json = await res.json();
            if (json.success != undefined) {
              dispatch({
                type: CHOOSE_FREE_CAR,
                payload: {
                  data: {
                    modal: true,
                    message: "Вы успешно записались на занятие",
                  },
                },
              });
            } else {
              dispatch({
                type: CHOOSE_FREE_CAR,
                payload: {
                  data: {
                    modal: true,
                    message: json.error,
                  },
                },
              });
            }
          })
          .catch((error) => {
            console.log("/api/ - ", error);
          });
      } else {
        return state;
      }
    });
  };
};

// очищаем данные в store
export const clearRegistrationLesson = () => {
  return (dispatch) => {
    dispatch({
      type: CHOOSE_FREE_CAR,
      payload: {
        data: {
          modal: false,
          message: "",
        },
      },
    });
  };
};

// отменяем занятие
export const returnLesson = (id) => {
  return async (dispatch) => {
    var tkn = ""; // Сюда назначим токен

    var tokenFormat = () => {
      return AsyncStorage.getItem("user_jwt").then((value) => {
        if (value != null) {
          return value;
        }
      });
    };

    tkn = await tokenFormat();

    let response = await fetch(SETTINGS.URL + "/api/cancelLesson", {
      headers: {
        token: tkn,
        lesson: id,
      },
    });

    if (response) {
      let json = await response.json();

      if (json.success) {
        ToastAndroid.show(json.success, ToastAndroid.SHORT);

        // Обновляем счётчик оставшихся уроков в Redux-e
        dispatch({
          type: COUNT_LESSONS,
          payload: {
            countLessons: json.remained_lessons,
          },
        });
      } else {
        console.log(json.error);
      }
    } else {
      alert("Ошибка HTTP");
    }
  };
};
