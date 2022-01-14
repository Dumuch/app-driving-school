import AsyncStorage from "@react-native-community/async-storage";
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_USER_UPDATE, COUNT_LESSONS, USER_LESSONS } from "../types";
import { SETTINGS } from "../../../settings";

// логинимся в бд
export const login = (emails, password) => {
  try {
    return async (dispatch) => {
      // let dataToSend = {email: emails, password: password};
      let dataToSend = { email: "test3@test.ru", password: "Juh*7J321" };

      let formBody = [];

      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");
      const result = await fetch(SETTINGS.URL + "/api/login", {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });

      const json = await result.json();

      if (json) {
        let id = "";
        let name = "";
        let group = "";
        let lessons = "";
        let email = "";
        let token = "";
        let errors = "";

        if (json.success != undefined) {
          id = json.success.user.id;
          name = json.success.user.name;
          group = json.success.user.group;
          lessons = json.success.user.lessons;
          email = json.success.user.email;
          token = json.success.token;
          errors = "";
        } else {
          // errors = JSON.stringify(json.errors.text);
        }

        dispatch({
          type: AUTH_LOGIN,
          payload: {
            id: id,
            name: name,
            group: group,
            lessons: lessons,
            email: email,
            token: token,
            error: errors,
          },
        });
      } else {
        //console.log("Unable to fetch!");
      }
    };
  } catch (error) {
    //console.log(error);
  }
};

export const update = (name, email) => ({
  type: AUTH_USER_UPDATE,
  payload: { name: name, email: email },
});

export const logout = () => ({
  type: AUTH_LOGOUT,
  payload: {},
});

//получаем количество оставшихся занятий
export const getCountLessons = (token) => {
  return async (dispatch) => {
      let response = await fetch(SETTINGS.URL + "/api/getRemainLessons", {
        headers: {
          token: token
        }
      });
      
      if (response)
      {
        let json = await response.json();        

        dispatch({
          type: COUNT_LESSONS,
          payload: {
            countLessons: json.remained_lessons
          }
        });
      }
      else
      {
        alert("Ошибка HTTP");
      }    
  };
};

// получаем список занятий, на которые пользователь записался
export const getUserLessons = () => {
  //getStudentRecords
  // const userLessons = [
  //   {
  //     id: 23,
  //     date: "11.11.2021",
  //     clock: 15,
  //     car: { model: "Рено Логан", number: "B163PT138" },
  //     // можно ли отписаться от занятия или нет
  //     returnLesson: false,
  //   },
  //   {
  //     id: 123,
  //     date: "14.11.2021",
  //     clock: 10,
  //     car: { model: "Рено Логан", number: "B123PT138" },
  //     returnLesson: false,
  //   },
  //   {
  //     id: 143,
  //     date: "24.11.2021",
  //     clock: 10,
  //     car: { model: "Рено Логан", number: "B823PT138" },
  //     returnLesson: true,
  //   },
  //   {
  //     id: 147,
  //     date: "26.11.2021",
  //     clock: 17,
  //     car: { model: "Рено Логан", number: "B423PT138" },
  //     returnLesson: true,
  //   },
  // ];
  return async (dispatch) => {
    var tkn = ""; // Сюда назначим токен

    var tokenFormat = () => {
      return AsyncStorage.getItem("user_jwt").then((value) => {
        if(value != null)
        {
          return value;
        }
      })
    }

    tkn = await tokenFormat();
    
    let response = await fetch(SETTINGS.URL + "/api/getStudentRecords", {
      headers: {
        token: tkn
      }
    });
    
    if (response)
    {
      let json = await response.json();
      if(json.success)
      {
        dispatch({
          type: USER_LESSONS,
          payload: { userLessons: json.success },
        });
      }
      else
      {
        console.log(json.error);
      }
    }
    else
    {
      alert("Ошибка HTTP");
    }    
  };
};