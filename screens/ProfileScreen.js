import { Button, Text, View } from 'react-native';

export default function ProfileScreen(props) {
    return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
      }}
    >
      <Text>Hello Alumni</Text>
      <Button
        title="Go to Map"
        onPress={() => props.navigation.navigate("Map")}
      />
    </View>
    )
}