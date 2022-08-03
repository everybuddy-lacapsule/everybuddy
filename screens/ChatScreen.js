import { Button, Text, View } from 'react-native';

export default function MessengerScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#98C1D9",
      }}
    >
      <Text>Hello Messenger</Text>
      <Button
        title="Go to Map"
        onPress={() => props.navigation.navigate("HomeMap")}
      />
    </View>
  );
}
