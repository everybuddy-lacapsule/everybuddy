import React, { useEffect, useState } from "react";
import {View, ImageBackground, StyleSheet, Text, TouchableOpacity, Button, ScrollView, SafeAreaView} from "react-native";
import { Badge, Colors, Divider, SocialIcon, hollowWhite } from "@rneui/themed";
import { ListItem, Avatar } from "@rneui/base";



function MyProfileScreen(props) {
//MapStateToProps récupérer user dans le redux

  return (
    <View
      style={styles.container}
    >

      <View style={styles.content}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          size={142}
          source={{ uri: "https://place-hold.it/300" }}
        />
      </View>
      <View style={styles.view1}>
        <Text style={styles.name}>LucAlban SerraSil</Text>
        <Text style={styles.text1}>Batch 55 Lyon</Text>
        <Text style={styles.text1}>Dev Web @ SiamoisCorp</Text>

        <Text style={styles.badge1}>#OPENTOWORK</Text>
      </View>
      </View>
      <View style={styles.view1}>
        <Text style={styles.text2}>Lyon, Auvergne Rhône-Alpes, France</Text>
      </View>
      <View style={styles.tags}>

      <Text style={styles.badge2}>FullStack</Text>
      <Text style={styles.badge2}>Bière</Text>
      <Text style={styles.badge2}>Bonne Ambiance</Text>
      <Text style={styles.badge2}>Plus d'idées</Text>
      <Text style={styles.badge2}>Remplissage</Text>
      <Text style={styles.badge2}>FullStack</Text>

</View>

<ScrollView 
contentContainerStyle={styles.view2}
scrollbar
>
  <Text style={styles.title}>
PRÉSENTATION
  </Text>
  <Text style={styles.text2}>
  Vous savez, moi je ne crois pas qu'il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd'hui avec vous, je dirais que c'est d'abord des rencontres. Des gens qui m'ont tendu la main, peut-être à un moment où je ne pouvais pas, où j'étais seul chez moi. Et c'est assez curieux de se dire que les hasards, les rencontres, forgent une destinée... Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l'interlocuteur en face je dirais, le miroir qui vous aide à avancer. Alors ça n'est pas mon cas, comme je disais là, puisque moi au contraire, j'ai pu : et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... je ne suis qu'amour ! Et finalement, quand beaucoup de gens aujourd'hui me disent « Mais comment fais-tu pour avoir cette humanité ? », et bien je leur réponds très simplement, je leur dis que c'est ce goût de l'amour ce goût donc qui m'a poussé aujourd'hui à entreprendre une construction mécanique, mais demain qui sait ? Peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi...  </Text>

  <Text style={styles.title}>
RECHERCHE ACTUELLE
</Text>
<Text style={styles.text2}>
  Je cherche un travail où on gagne de l'argent pour manger. Si possible sur la planète Terre mais je suis véhiculé.
</Text>
</ScrollView>
<Divider
					color={hollowWhite}
					style={{ width: " 90%", marginLeft: "5%" }}
				/>
<View style={styles.icon}>
<SocialIcon
  type='github'
/>
<SocialIcon
  type='linkedin'
/>
</View >

    </View>
  );
}

function mapStateToProps(state) {
  return { urlPhoto : state.photo }
 }  

 export default connect(mapStateToProps, null)(MyProfileScreen);

// --------- Style CSS --------------------
var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8
  },
  content: {
    flexDirection: 'row',
    marginBottom : 10,
    marginTop: 10,
    // marginLeft: 10
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom : 10,
    marginTop: 10,
  },
  icon: {
    flexDirection: 'row',
    flexwrap: 'wrap',
    alignSelf:'center',
    marginBottom : 10,
    marginTop: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 10,
    marginTop: 15

  },
  avatar: {
    size: 100,
    alignSelf:'flex-start',
    marginTop: 20,
  },
  view1: {
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  view2: {
    justifyContent: 'space-between',
    margin: 20,
  },
  text1: {
    fontSize: 18,
    marginBottom: 5,
  },
  text2: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'justify',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  badge1: {
    marginRight: 10,
    backgroundColor: '#0E0E66',
    color: 'white',
    fontSize: 20,
    borderColor: '#0E0E66',
    borderRadius: 50,
    borderWidth: 1.2,
    textAlign: 'center',
    paddingTop: 2,
  },
  badge2: {
    margin: 10,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#0E0E66',
    fontSize: 12,
    borderColor: '#0E0E66',
    borderRadius: 50,
    borderWidth: 1.2,
    textAlign: 'center',
    padding: 5,
  },
});

// Exemple de props pour badge
              {/* <Badge 
      value='Fullstack'
      containerStyle={{ margin: 5 }}
      status="light"
      textStyle={{ color: '#0E0E66'}}
      badgeStyle={{borderColor: '#0E0E66', borderWidth: 1.2}}
      /> */}