import { Button, Text, View } from 'react-native';

export default function MyProfileScreen(props) {
    return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
      }}
    >
      <Text>Hello MyProfile</Text>
      <Button
        title="Go to Map"
        onPress={() => props.navigation.navigate("Home")}
      />
    </View>
    )
}