import React, { useEffect } from 'react'
import { StyleSheet, View,} from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import {useState} from 'react'
import CustomMarker from './CustomMarker'
import {collection, onSnapshot} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function HomePage({route, navigation}) {
  
      const [dragMarkC, setDragC] = useState({
        longitude: -72.288986,
        latitude: 43.704540,
      })

      const [newcoordinate, setNewCoordinate] = useState(null)

      const user = route.params.user
      console.log(user.email)
 
      const handleMarkerDragEnd = (e) => {
        const droppedCoordinate = e.nativeEvent.coordinate;
        navigation.navigate('Add Moment', { newcoordinate: droppedCoordinate, userData: user });
        setNewCoordinate(droppedCoordinate);
        setDragC({ latitude: droppedCoordinate.latitude + 0.0001, longitude: droppedCoordinate.longitude + 0.0001 });
      }
      
      const [firemarkers, setFireMarkers] = useState([])

      useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'markers'), (snapshot) => {
            const markerData = snapshot.docs.map(doc => doc.data());
            setFireMarkers(markerData);
        });
    
        // Cleanup function
        return () => unsubscribe();
    }, []);
        
    return (
    <View style={styles.container}>

      <MapView 
      style={styles.map} 
      initialRegion={{"latitude": 43.702535113093965, 
                      "latitudeDelta": 0.0177664554756376, 
                      "longitude": -72.2887311982464, 
                      "longitudeDelta": 0.01183259998039432}}>

        {firemarkers.map((firemarker, index) => (
          <CustomMarker key={index} 
          coordinate={{latitude:firemarker.latitude, longitude: firemarker.longitude}} 
          title={firemarker.title} 
          caption={firemarker.caption} 
          imageUri={firemarker.url}
          username={firemarker.username}/>
        ))}

        <Marker
          pinColor='pink'
          draggable
          title='Add Moment'
          description='to add moment drag and drop me'
          coordinate={dragMarkC}
          onDragEnd={handleMarkerDragEnd}     
        />
    
      </MapView>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       },
       header: {
         backgroundColor: 'pink',
         padding: 20,
       },
       boldText: {
         fontWeight: 'bold',
       },
       body: {
         backgroundColor: 'yellow',
         padding: 20,
       },
       buttonContainer: {
         marginTop: 20,
       },
       input: {
         borderWidth: 1,
         borderColor: '#777',
         padding: 8,
         margin: 10,
         width: 200,
         borderRadius:20,
       },
       list: {
         borderWidth: 1,
         borderRadius: 3,
         margin: 5,
         padding: 5,
         backgroundColor: 'pink',
       },
       map: {
         width: '100%',
         height:'100%',
       },
       
})
