import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Moments</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 40,
        backgroundColor: '#A8DACD',
    },
    title: {
        textAlign: 'center',
        color: '#ffF',
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        textShadowColor: 'black',
        textShadowRadius:5,
 
    }
})