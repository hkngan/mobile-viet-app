import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import config from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
import { AuthContext } from '../context/authContext';
import { Header, UIButton } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Login = () => {
    const navigation = useNavigation()

    const IPV4_ADDRESS = config.extra.IPV4
    const PORT = config.extra.PORT

    const authContext = useContext(AuthContext)
    const state = authContext.state
    const setState = authContext.setState
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
    const handleLogin = async () => {
        try {
            if(!username || !password){
                Alert.alert('Please enter all fields')
                return
            }
            const {data} = await axios.post(`http://${IPV4_ADDRESS}:${PORT}/api/v1/auth/signin`, {
                username,
                password
            })
            setState(data)
            console.log(data)
            await AsyncStorage.setItem('@auth', JSON.stringify(data))
            navigation.navigate('DrawerNavigation', { screen: 'LearningLesson' });
        } catch (error) {
            alert(error.response.data.message)
            console.log(error)
        }
    }
    const getData = async () => {
        let data = await AsyncStorage.getItem('@auth')
        // console.log('data: ', data)
    }
    getData()
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Header 
                        onPress={() => navigation.goBack()}
                        title={'login'}/>
                </View>
                <View style={styles.content}>
                    <TextInput 
                        value={username} 
                        onChangeText={(text) => setUsername(text)}
                        style={styles.input}
                        placeholder='Username'
                        placeholderTextColor={COLORS.LightBlack}
                        />
                        <View style={styles.password}>
                            <TextInput 
                            value={password} 
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={!isPasswordVisible}
                            placeholderTextColor={COLORS.LightBlack}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconEye}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    <UIButton 
                        title='Login' 
                        backgroundColor={COLORS.Blue} 
                        textColor='white' size={18}
                        event={handleLogin}
                        />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: '#F0EEED',
    },
    header: {
        width: WIDTH,   
    },
    content: {
        alignItems: 'center',
        width: WIDTH, 
        width: WIDTH,
        justifyContent: 'flex-start',
        paddingVertical: SPACING.space_40
    },
    input:{
        height: 50,
        width: 300,
        margin: 5,
        color: COLORS.Black,
        backgroundColor: '#D0D4CA',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: FONTSIZE.size_16,
        borderRadius: 10,
        shadowColor: '#444',
        shadowOffset: {
        height:1, width:1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    password:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconEye:{
        position: 'absolute',
        right: 0,
        marginHorizontal: SPACING.space_16
    }
});
