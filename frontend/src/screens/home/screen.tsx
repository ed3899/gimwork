import React, {useState} from "react";
import {View, TextInput, Button} from "react-native";

const Home: React.FC<any> = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = () => {
    navigation.navigate("Profile");
  };

  const handleSignUp = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <Button title="SignUp" onPress={handleSignUp} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Home;
