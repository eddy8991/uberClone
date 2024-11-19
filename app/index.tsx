/* eslint-disable prettier/prettier */
import 'react-native-get-random-values';
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from 'react';


const Home = () =>{
    const { isSignedIn } = useAuth()
    if (isSignedIn) {
      return <Redirect href="/(root)/(tabs)/home" />
    }
    return <Redirect href="./(auth)/welcome"/>
    //check home redirect works
}

export default Home;