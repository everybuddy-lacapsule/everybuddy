import { Button, Text, View } from 'react-native';

export default function MessengerScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
      }}
    >
      <Text>Hello Messenger</Text>
      <Button
        title="Go to Map"
        onPress={() => props.navigation.navigate("Map")}
      />
    </View>
  );
}
