import React, { useState } from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image } from '../constants';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
const CustomAlert = ({ isVisible, isCorrect, onClose, onNextQuestion }) => {  
    const message = isCorrect ? 'Correct!' : 'Incorrect!';
    const backgroundColor = isCorrect ? COLORS.Green2 : COLORS.Red2;
    const icon = isCorrect ? image.true : image.false

    const navigation = useNavigation()
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          <View
            style={[styles.annouceBox, {backgroundColor: backgroundColor}]}
          >
            <Image source={icon} style={styles.iconImage}/>
            <View style={styles.annouceContent}>
            <Text style={styles.text}>{message}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onNextQuestion()}            
              >
              <Text style={[styles.buttonText, {color: backgroundColor}]}>continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}            
              >
              <Text style={[styles.buttonText, {color: backgroundColor}]}>back</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
};

export default CustomAlert
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
    container:{ 
        flex: 1
    },
    annouceBox:{
        width: WIDTH,
        height: WIDTH*0.5,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: SPACING.space_18,
        borderTopLeftRadius: SPACING.space_18
      },
      annouceContent:{
        alignContent: 'center',
        justifyContent: 'center',
      },
    iconImage:{
        width: WIDTH*0.4,
        height: WIDTH*0.4,
    },
    text:{ 
        color: COLORS.White, 
        fontSize: FONTSIZE.size_18
    },
    button:{
        backgroundColor: COLORS.White,
        borderRadius: SPACING.space_18,
        height: WIDTH*0.1,
        width: WIDTH*0.4,
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: SPACING.space_10
      },
    buttonText:{ 
        textAlign: 'center',
        fontSize: FONTSIZE.size_20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})