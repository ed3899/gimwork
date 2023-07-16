import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
};

export type LoginScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type ProfileScreen = NativeStackScreenProps<RootStackParamList, "Profile">;