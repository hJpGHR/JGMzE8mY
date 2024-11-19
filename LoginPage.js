import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

export default function LoginPage({ navigation }) {
  //Declaring constant variables and state hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logintext, setLogintext] = useState("");

  //Function to call the API to login
  function loginAPI() {
    setLogintext("");
    //Login and password are being passed through a get request, which has no security but it's only to simplify the code in this prototype.
    fetch(
      "http://localhost:8080/login?username=" +
        username +
        "&password=" +
        password
    )
      .then((result) => result.json())
      .then((json) => {
        console.log(json);
        if (json == true) {
          {
            navigation.navigate("Menu", username);
          } //If username and password are correct, navigates to Menu and passes username to other screens
        } else {
          setLogintext("Username or password incorrect"); //If username and password are incorrect, display a message
        }
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Image
          style={styles.tipo}
          source={require("./assets/bftipo2-nobg.png")}
        />

        <Image
          style={styles.sign}
          source={require("./assets/bfsign2-nobg.png")}
        />

        <Text style={styles.text}>
          Share your trip expenses with your friends.
        </Text>
      </View>

      {/* Asking the user for a username and a password */}
      <View style={styles.box2}>
        <View style={styles.textandinput}>
          <Text style={styles.descriptiontext}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="myusername"
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.textandinput}>
          <Text style={styles.descriptiontext}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="password123"
            onChangeText={setPassword}
            secureTextEntry={true} //Hide what the user is typing to improve security
          />
        </View>

        {/* Calling the API */}
        <TouchableOpacity onPress={loginAPI} style={styles.touchopa}>
          <Text style={styles.btntext}>LOGIN</Text>
        </TouchableOpacity>

        {/* Text in case of username and password are wrong */}
        <Text>{logintext}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF75B",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "tahoma",
    fontSize: 30,
  },
  text: {
    marginVertical: "15px",
    fontFamily: "tahoma",
    fontSize: 16,
  },
  descriptiontext: {
    margin: "10px",
    fontFamily: "tahoma",
    color: "white",
    fontSize: 15,
  },
  button: {
    margin: "10px",
  },
  input: {
    height: 30,
    width: 180,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
  },
  textandinput: {
    flexDirection: "row",
  },
  tipo: {
    width: 176.75,
    height: 88,
    marginVertical: "15px",
  },
  sign: {
    width: 150,
    height: 150,
    marginVertical: "15px",
  },
  box1: {
    backgroundColor: "#00eafa",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    flex: "2",
  },
  box2: {
    backgroundColor: "#f5304f",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    width: "100%",
    flex: "1",
  },
  touchopa: {
    backgroundColor: "#38b6ff",
    borderRadius: 5,
  },
  btntext: {
    margin: "10px",
    fontFamily: "tahoma",
    color: "white",
    fontWeight: "bold",
  },
});
