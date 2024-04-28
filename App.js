import * as React from 'react';
import { StyleSheet, View} from 'react-native'
import Moment from './components/moment'
import HomePage from './components/HomePage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './components/signIn'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{
          headerStyle: {
            backgroundColor: '#A8DACD', 
          },
          headerTintColor: 'white', 
          headerTitleStyle: {
            fontWeight: 'normal',
            fontFamily:'Thonburi',
            textShadowColor: 'black',
            textShadowRadius:5,
            fontSize: 20,
          },
        }}>
      <Stack.Screen name="Welcome" component={SignIn} options={ {headerShown: false} }/>
      <Stack.Screen name="Moments" component={HomePage} options={{headerLeft: null}}/>
      <Stack.Screen name="Add Moment" component={Moment} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
