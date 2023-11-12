import React, {useContext} from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image } from '../constants';
import { UIButton } from '../components';
import { SPACING } from '../themes/themes';
import { AuthContext } from '../context/authContext';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const WelcomeScreen = () => {
    const {state} = useContext(AuthContext);
    // const accessToken = state.accessToken
    // console.log('WelcomeScreen accessToken:', accessToken)
    const navigation = useNavigation();
    const navigateToLoginScreen = () => {
        navigation.navigate('LoginStack');
    };
    const navigateToRegistration = () => {
        navigation.navigate('RegistrationStack')
    }
    return (
        <SafeAreaView style={styles.container}>
                <Image 
                    style={styles.img}
                    source={image.logo} />
                <Text style={styles.text1}>VLEARNING</Text>
                <Text style={styles.text2}>Learning language for free</Text>
                <UIButton 
                    title="sign up" 
                    backgroundColor="#0A6EBD" 
                    textColor="white" 
                    size={18}
                    event={navigateToRegistration}
                    />
                <UIButton
                    title="i already have an account"
                    backgroundColor="#0A6EBD"
                    textColor="white"
                    event={navigateToLoginScreen}
                    size={18}
                />
        </SafeAreaView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F0EEED',
        alignItems: 'center',
    },
    text1: {
        textAlign: 'center',
        color: '#164B60',
        fontSize: 50,
    },
    text2: {
        textAlign: 'center',
        color: '#164B60',
        // fontFamily: 'Dosis-Medium',
        fontSize: 20,
    },
   
    img: {
        width: WIDTH*0.6,
        height: WIDTH*0.6,
        marginTop: SPACING.space_32*2    },
});
