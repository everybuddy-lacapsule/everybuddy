import { Button, Text, View } from 'react-native';

export default function NewsScreen(props) {
    return(
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{color: 'white'}}>Hello News</Text>
      <Button
        title="Go to Map"
        onPress={() => props.navigation.navigate("Map")}
      />
    </View>
    );
}