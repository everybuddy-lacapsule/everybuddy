import React from 'react';
import { StyleSheet, Text, Input, View } from 'react-native';

export default function SearchHeader (){
    return (
        <View style={styles.header}>
            <Input style={styles.headerText}>
        </Input>
        </View>
    )
}

var styles = StyleSheet.create({
    header:{
        height: '100%',
        width:'100%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        
    }
})