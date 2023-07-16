import React, {useState} from "react";
import {View, Text} from "react-native";
import type {ProfileScreen} from "../../../types";

const Profile: React.FC<ProfileScreen> = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
