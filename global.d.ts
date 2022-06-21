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

// DARK MODE
interface DarkMode {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setDarkModeData: (value: string) => Promise<void>;
}

// SETUP FORM INTERFACES
interface SetUpFormAnnotationProps {
  values: {
    firstName: string;
    lastName: string;
    gender: string;
    availability: string;
    phone: string;
    country: string;
    municipality_city: string;
  };
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  numberTextInput: React.MutableRefObject<TextInput | null>;
  lastNameTextInput: React.MutableRefObject<TextInput | null>;
  myGender: string;
  setMyGender: React.Dispatch<React.SetStateAction<string>>;
  isAvailable: string;
  setIsAvailable: React.Dispatch<React.SetStateAction<string>>;
  userCountry: string;
  setUserCountry: React.Dispatch<React.SetStateAction<string>>;
  errors: FormikErrors<{
    firstName: string;
    lastName: string;
    gender: string;
    availability: string;
    phone: string;
    country: string;
    municipality_city: string;
  }>;
  touched: FormikTouched<{
    firstName: string;
    lastName: string;
    gender: string;
    availability: string;
    phone: string;
    country: string;
    municipality_city: string;
  }>;
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  isSuccess: boolean;
}

interface UsersInfo {
  availability: string;
  country: string;
  firstName: string;
  gender: string;
  lastName: string;
  municipality_city: string;
  phone: string;
  userId: string;
}
