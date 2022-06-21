import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: string) => {
  try {
    const data = await AsyncStorage.setItem("isRead", value);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("isRead");
    return value;
  } catch (e) {
    console.log(e);
  }
};

export { storeData, getData };
