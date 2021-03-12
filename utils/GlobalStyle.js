import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    height: "100%",
    padding: 0,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    justifyContent: "space-around",
  },
});
