import React, {useState} from "react";
import {View, Text} from "react-native";
import type {ProfileProps} from "../../../types";
import {Button} from "react-native";

const Profile: React.FC<any> = ({navigation}) => {
  const handleGoToUserOffers = () => {
    navigation.navigate("Home")
  }

  const  handleGoToGeneralOffers = () => {
    navigation.navigate("GeneralOffers");
  }
  const  handleGoToMyOffers = () => {
    navigation.navigate("UserOffers");
  }

  return (
    <View>
      <Text>Profile</Text>

      <Button title="Go To Home" onPress={handleGoToUserOffers} />
      <Button title="Go To My Offers" onPress={handleGoToMyOffers} />
      <Button title="Go To General Offers" onPress={handleGoToGeneralOffers} />
    </View>
  );
};

export default Profile;
