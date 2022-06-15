import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// AUTH STACK
type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
type AuthStackParamListProps = NativeStackScreenProps<AuthStackParamList>;
type AuthStackNavigationRoutesProps = RouteProp<AuthStackParamList>;

// HOME STACK
type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
  Loved: undefined;
  Profile: undefined;
};
type HomeStackparamListProps = NativeStackScreenProps<HomeStackParamList>;

// WELCOME SCREEN TYPES
interface WelcomeScreenProps {
  setWelcomeScreenState: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  storeData: (value: string) => Promise<void>;
}
