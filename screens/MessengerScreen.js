import { Button, StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function MessengerScreen(props) {
  var buddyIcon = "person-add";
  var buddyIconColor = "#0E0E66";
  var buddyIconStyle = { paddingRight: 2 };
    buddyIcon = "person";
    buddyIconColor = "#E74C3C";
    buddyIconStyle = { paddingRight: 0 };
  return (
<View>
        <ScrollView>
              <ListItem bottomDivider
                                  onPress={() => {
                                    props.navigation.navigate('Chat')
                                  }}
                                  >
                <Avatar rounded size={90} source={require('../assets/splash.png')} />
                <ListItem.Content>
                  <ListItem.Title>
                    Xavier MELINAND
                  </ListItem.Title>
                  <ListItem.Subtitle>FartCompany</ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.listItemText}>
                    Batch #55
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.listItemText}>
                    Dayveuleaupeure
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.listItemText}>
                    Foule Stack
                  </ListItem.Subtitle>
                </ListItem.Content>
                <View style={buddyIconStyle}>
                  <Ionicons
                    name={buddyIcon}
                    size={32}
                    color={buddyIconColor}
                  />
                </View>
                <FontAwesome name="paper-plane" size={32} color="#0E0E66" />
              </ListItem>
        </ScrollView>
      </View>
  );
}

var styles = StyleSheet.create({
  listItemText: {
    fontSize: 12,
  },
});