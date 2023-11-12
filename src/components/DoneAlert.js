import React, { useState } from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image } from '../constants';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
const DoneAlert = ({ isVisible, isCorrect, onClose, onNextQuestion }) => {  
    const message = 'You are finished all the question of the topic. Congraduation!!!';
    const backgroundColor = COLORS.Green2
    const icon = image.champion

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
            <View style={styles.annouceContent}>
            <Image source={icon} style={styles.iconImage}/>

            <Text style={styles.text}>{message}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('BottomTab', { screen: 'LearningLesson' })}            
              >
              <Text style={[styles.buttonText, {color: backgroundColor}]}>Confirm</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
};

export default DoneAlert
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{ 
        alignSelf:'center',
        justifyContent: 'center'
    },
    annouceBox:{
        width: WIDTH,
        height: HEIGHT,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',

        
      },
      annouceContent:{
        alignItems: 'center',
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