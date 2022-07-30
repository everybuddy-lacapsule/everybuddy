//! import { Button, Text, View } from "react-native";
//TODO/ removencjdsnfj
//*jrqkrejnfrn
// normal

export default function MapScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e67e22",
      }}
    >
      <Text>Hello Cunt</Text>
      <Button
        title="Go to Map"
        onPress={() => {
          props.navigation.navigate("TabsNavigator", { screen: "Map" });
        }}
      />
    </View>
  );
}
