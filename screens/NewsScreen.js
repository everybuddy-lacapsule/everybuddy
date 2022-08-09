import { Button, Text, View, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import { Card } from "@rneui/themed";

export default function NewsScreen(props) {
    return(
      <ImageBackground 
      style={styles.container}
      source={require("../assets/back.png")}
      >
<ScrollView>
  {/* CARD 1 */}
<Card
containerStyle={styles.view1}
>
<Card.Title 
style={styles.name}
>
  BARBECUE DE FIN DE BATCH
</Card.Title>

  <Card.Image
  style={styles.img}
  source={require('../assets/barbecue.jpg')}
  />
  
    <Text 
    style={styles.title}
    >
      12/08/2022
    </Text>

  <Text 
  style={styles.text2}
  >
Venez partager un barbecue autour de citations de qualité telles que : 
"Le barbecue, en gros, c'est un appareil qui te permet de manger des saucisses pratiquement crues mais avec les doigts bien cuits."
  </Text>
  <View
  style={styles.content}
  >
  <Text style={styles.badge1}>
JE PARTICIPE !
  </Text>
  <Text style={styles.badge2}>
J'AI PONEY
  </Text>
  </View>
</Card>

{/* CARD 2 */}
<Card
containerStyle={styles.view1}
>
<Card.Title 
style={styles.name}
>
Netflix rentre en crypto-bourse
</Card.Title>

<View
style={styles.view3}
>
  <Card.Image
  style={styles.img}
  source={require('../assets/crypto.jpg')}
  />
</View>

    <Text 
    style={styles.title}
    >
Le Monde.fr
    </Text>

  <Text 
  style={styles.text1}
  >
Après avoir chuté en bourse, Netflix a décidé de réagir avec une nouvelle stratégie commerciale. Après avoir augmenté son abonnement global, une nouvelle hausse des prix sera appliquée seulement à certains de ses clients qui n...
 </Text>
 <View
  style={styles.view2}
  >
 <Text
  style={styles.text3}
 >
  Voir plus
 </Text>
 </View>
</Card>

</ScrollView>

</ImageBackground>
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
  name: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
  },
  img: {

  },
  view1: {
    justifyContent: "space-between",
    borderRadius: 10,
  },
  view2: {
    marginTop: -20,
    marginBottom: -20,
    padding: -10,
  },
  view3: {
    justifyContent: "center",
    alignSelf: "center",
    width: '100%',
  },
  text1: {
    fontSize: 15,
    textAlign: "justify",
  },
  text2: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "justify",
  },
  text3: {
    fontSize: 13,
    marginBottom: 13,
    textAlign: "right",
    textAlignVertical: 'top',
    fontWeight: "normal",
    color: "#E74C3C",
    textDecorationLine: "underline",
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  badge1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    marginTop: 0,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: '#E74C3C',
    fontSize: 11.4,
    borderRadius: 10,
    textAlign: "center",
    padding: 10,
  },
  badge2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    marginTop: 0,
    fontWeight: "bold",
    color: "#0E0E66",
    fontSize: 11.4,
    borderColor: "#0E0E66",
    borderRadius: 10,
    borderWidth: 1.2,
    textAlign: "center",
    padding: 10,
  },
});