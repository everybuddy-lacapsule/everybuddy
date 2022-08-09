import { Button, Text, View, StyleSheet } from 'react-native';
import { Card } from "@rneui/themed";

export default function NewsScreen(props) {
    return(
    <View
    style={styles.container}
    >
<Card
  title='BARBECUE DE FIN DE BATCH'
  image={require('../assets/barbecue.jpg')}>
    <Text>
      12/08/2022
    </Text>
  <Text style={{marginBottom: 10}}>
Venez partager un barbecue autour de citations de qualités telle que : 
"Le barbecue, en gros, c'est un appareil qui te permet de manger des saucisses pratiquement crues mais avec les doigts bien cuits."
  </Text>
  <View
  style={styles.content}
  >
  <Text style={styles.badge2}>
JE PARTICIPE !
  </Text>
  <Text style={styles.badge2}>
J'AI PONEY
  </Text>
  </View>
</Card>

{/* <Card
  title='HELLO WORLD'
  image={require('../images/pic2.jpg')}>
  <Text style={{marginBottom: 10}}>
    The idea with React Native Elements is more about component structure than actual design.
  </Text>
  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card> */}

    </View>
    );
}

// --------- Style CSS --------------------
var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -10,
    margin: 5,
  },
  content: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0,
    margin: 8,
  },
  icon: {
    flexDirection: "row",
    flexwrap: "wrap",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    marginTop: 20,
  },
  avatar: {
    size: 100,
    alignSelf: "flex-start",
    marginTop: 15,
  },
  view1: {
    justifyContent: "space-between",
    marginLeft: 20,
  },
  view2: {
    justifyContent: "space-between",
    margin: 20,
  },
  text1: {
    fontSize: 16,
    marginBottom: 5,
  },
  text2: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "justify",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  badge2: {
    margin: 10,
    marginTop: 0,
    fontWeight: "bold",
    color: "#0E0E66",
    fontSize: 11.4,
    borderColor: "#0E0E66",
    borderRadius: 50,
    borderWidth: 1.2,
    textAlign: "center",
    padding: 6,
  },
});