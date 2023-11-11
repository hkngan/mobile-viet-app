import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
const WIDTH = Dimensions.get('window').width
const UIButton = ({title, icon, backgroundColor, event, textColor, size}) => {

    const styles = {
        buttonLogin:{
            backgroundColor: backgroundColor,
            width: WIDTH*0.7,
            height: 45,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10
    
        },
        textBtn: {
            fontSize: size,
            // fontFamily: 'Montserrat-Bold',
            color: textColor,
            textTransform: 'uppercase',
            fontWeight: 500
        },
        
        
    }
    return (
        <TouchableOpacity style={styles.buttonLogin} onPress={event}>
            <Text style={styles.textBtn}>{title}</Text>
        </TouchableOpacity>
    );
};

export default UIButton

