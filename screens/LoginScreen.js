import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const handleLogin = () =>{
        const user = {
          email: email,
          password:password,
        }
        axios.post("http://192.168.1.119:8000/login",user).then((response) => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem("authToken",token);
          navigation.replace("Home");
        }).catch((err) => {
        Alert.alert("Login Error","Invalid Email");
        console.log(err);
        });
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginTop: 12,
                            color: "#041E42",

                        }}
                    >
                        Login In to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center", gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30,
                    }}>

                        <MaterialIcons name="email" size={24} color="gray" />
                        <TextInput
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16, }}
                            placeholder="enter yor email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}


                        />
                    </View>




                </View>

                <View style={{ marginTop: 5 }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center", gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30,
                    }}>

                        <AntDesign name="lock1" size={24} color="gray" />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16, }}
                            placeholder="enter yor password"
                            secureTextEntry={true}
                        />
                    </View>

                </View>
                <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: "#007FFF", fontWeight: "500" }}>Forgot password</Text>
                </View>

                <View style={{ marginTop: 70, }} />

                <Pressable
                    onPress={handleLogin}
                    style={{
                        width: 250,
                        backgroundColor: "#FEBE10",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                    }}>
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>Don't have an account? Sign Up</Text>
                </Pressable>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})