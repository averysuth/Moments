import React, { useEffect, useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import { auth, db } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'

export default function Moment(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const navigation = useNavigation()

    const handleSignUP = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then( async (userCredentials) => {
            const user = userCredentials.user
            console.log(user.email)

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                email: user.email,
                username: username
            })
        })
        .catch( error => alert(error.message))

    }
    const handleLogIN = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log("logged in with" + user.email)

        })
        .catch( error => alert(error.message))

    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace("Moments", {user})
            }
        })

        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Welcome to Moments</Text>
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                placeholder='username' 
                placeholderTextColor='white' 
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.type}
                ></TextInput>
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                placeholder='email@email.com' 
                placeholderTextColor='white' 
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.type}
                ></TextInput>
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                placeholder='password' 
                placeholderTextColor='white' 
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.type}
                ></TextInput>
            </View>
            <View style={styles.submitBox}>
                <View style={styles.submits}>
                    <TouchableOpacity>
                        <Text style={styles.inputtext} onPress={handleSignUP}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.submits}>
                    <TouchableOpacity>
                        <Text style={styles.inputtext} onPress={handleLogIN}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: "center", 
        marginTop: '40%'
    },
    content: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: '80%',
        height: '80%',
        padding:10,
        backgroundColor: '#F6E1DC',
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
    inputBox: {
        width: '50%',
        height: '15%',
        backgroundColor: '#A8DACD',
        margin:5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',
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
    titleText:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        textShadowColor: 'black',
        textShadowRadius:5,
        zIndex: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 10
    }, 
    submitBox: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    submits: {
        width: '35%',
        height: '40%',
        backgroundColor: '#A8DACD',
        marginHorizontal: 5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',
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
    inputtext: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'normal',
        fontFamily:'Thonburi', 
    },
    type: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily:'Thonburi',
        
    }

})
