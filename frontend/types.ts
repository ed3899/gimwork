import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {CompositeScreenProps} from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Offers: undefined;
};

type ProfileScreenParamsList = {
  MyOffers: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

type HomeTabParamList = {
  Profile: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;
export type OffersProps = NativeStackScreenProps<RootStackParamList, "Offers">;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

