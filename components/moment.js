import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useState, useEffect} from 'react'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {addDoc, collection,} from 'firebase/firestore'
import { storage, db } from '../firebaseConfig';

export default function Moment({route, navigation}){

    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')

    const [image, setImage] = useState("")
    const [progress, setProgress] = useState(0)

    const coordinate = route.params.newcoordinate
    const user = route.params.userData
    console.log(user.username)
    console.log(coordinate)

    const [url, setUrl] = useState("")

    const handleAddMoment = () => {
        saveRecord("image", url, title, caption, coordinate.latitude, coordinate.longitude, user.username)
        navigation.navigate('Moments')
    }

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (libraryStatus.status !== 'granted') {
              alert('Please grant camera access to add photo to moment :)');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            await uploadImage(result.assets[0].uri, "image")
        }
      };

      async function uploadImage (uri, filetype) {
        const response = await fetch(uri)
        const blob = await response.blob()

        const storageRef = ref(storage, "Images/" + new Date().getTime())
        const uploadImg = uploadBytesResumable(storageRef, blob)

        uploadImg.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is " + progress + "% done")
            setProgress(progress.toFixed())
            },
            (error) => {
                console.log('error uploading' + error)
            }, 
            () => {
             getDownloadURL(uploadImg.snapshot.ref).then(async (downloadURL) => {
                setUrl(downloadURL)
                console.log("file available at", downloadURL)
                
             })   
            }
        )
      }

      async function saveRecord(filetype, url, title, caption, latitude, longitude, username){
        try {
            const docRef = await addDoc(collection(db, "markers"), {
                filetype, 
                url, 
                title, 
                caption, 
                latitude, 
                longitude, 
                username   
            })
            console.log("document saved correctly " + docRef.id)
        } catch (e) {
            console.log("error" + e)
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.titlebox}>
                <Text style={styles.title}>My Moment</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputbox}>
                    <Text style={styles.inputs}>Moment Name:</Text>
                    <View style={styles.button}>
                    <TextInput style={styles.userinputs} placeholder="Mom's Birthday" placeholderTextColor='white' onChangeText={setTitle}/>
                    </View>
                </View>
                <View style={styles.inputbox}>
                    <Text style={styles.inputs}>Moment Caption:</Text>
                    <View style={styles.button}>
                        <TextInput style={styles.userinputs} placeholder="Best Day Ever.." placeholderTextColor='white' onChangeText={setCaption}/>
                    </View>
                </View>
                <View style={styles.inputbox}>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <View style={styles.addpicbox}>
                    <TouchableOpacity style={styles.TOB} onPress={pickImage}>
                        <Text style={styles.addpic}>Add Picture!</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.inputbox}>
                    <View style={styles.addmomentbox}>
                    <TouchableOpacity style={styles.TOB} onPress={handleAddMoment}>
                        <Text style={styles.addmoment}>Add Moment!</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6E1DC',
        width:'100%',
        height:"100%",
        padding: 20

    },
    image: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 5
    }, 
    titlebox: {
        flex: 1, 
        height: 30,
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
    }, 
    inputConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '70%',
        margin: 20
        
    }, 
    inputbox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#A8DACD',
        elevation: 4,
        height: 200,
        width: 300,
        margin: 10,
        zIndex: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    }, 
    inputs: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        textShadowColor: 'black',
        textShadowRadius:5,
        margin: 4
    }, 
    userinputs: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        textShadowColor: 'black',
        textShadowRadius:2.3,
    },
    button: {
        borderWidth: 2,
        width: 150,
        padding: 10,
        borderRadius: 25,
        borderColor: 'white',
        zIndex: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 5,


    },
    TOB: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        color: 'white',
        zIndex: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    addmoment: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        textShadowColor: 'black',
        textShadowRadius:5,
    },
    addmomentbox:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6E1DC',
        width: '50%',
        height: '40%',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 30,
        zIndex: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    }, 
    addpicbox:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '40%',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 30,
        zIndex: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    }, 
    addpic: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        textShadowColor: 'black',
        textShadowRadius:2.3,
    }

})