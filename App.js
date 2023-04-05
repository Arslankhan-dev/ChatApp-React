
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/screens/Login";
import Forget from "./src/screens/Forget";
import SignUp from "./src/screens/SignUp";
import Home from "./src/screens/Home";
import Users from "./src/screens/User";
import Maps from "./src/screens/Maps";
import FirstContextProvider from "./src/store/context/FirstContext";
import {AuthContext} from './src/store/context/AuthContext'
import AuthContextProvider from './src/store/context/AuthContext'

const Stack = createNativeStackNavigator();

function App() {
  return (
    // <AuthContext>
    <AuthContextProvider>
    <FirstContextProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Maps" component={Maps} />
      
      </Stack.Navigator>
    </NavigationContainer>
    </FirstContextProvider>
    </AuthContextProvider>
    // {/* </AuthContext> */}
  );
}
export default App;
