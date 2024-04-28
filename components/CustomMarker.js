import React from 'react';
import { Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps'
import {Text, StyleSheet, View} from 'react-native'

const CustomMarker = ({ coordinate, title, caption, imageUri, username }) => {
    const uploadedBy = `Moment uploaded by ${username}`
    const calloutWidth = Math.max(title.length, caption.length, uploadedBy.length) * 10;

    return (
      <Marker coordinate={coordinate}>
        <Image source={{ uri: imageUri }} style={{ 
            width: 55, 
            height: 55,
            borderRadius:30, 
            zIndex: 5, 
            shadowColor: "black",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5}} />
        <Callout style={[styles.calloutContainer, { width: calloutWidth}]}>
            <View style={styles.calloutContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.caption}>{caption}</Text>
            <Text style={styles.uploadedBy}>{uploadedBy}</Text>
            </View>
        </Callout>
      </Marker>
    );
  };
  const styles = StyleSheet.create({
    calloutContainer: {
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#A8DACD',
        zIndex: 1,
        shadowColor: 'black'
    },
    calloutContent: {
        padding: 10,
    },
    title: {
        textAlign: 'center',
        color: '#ffF',
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        textShadowColor: 'black',
        textShadowRadius:5,
    }, 
    caption: {
        textAlign: 'center',
        fontWeight: 'light',
        fontSize: 15,
        fontFamily:'Thonburi',
        color: '#ffF',
        textShadowColor: 'black',
        textShadowRadius:5,
    },
    uploadedBy: {
        textAlign: 'center',
        fontWeight: 'light',
        fontSize: 12,
        fontFamily:'Thonburi',
        color: '#ffF',
        textShadowColor: 'black',
        textShadowRadius:5,
    }

  })
  export default CustomMarker;