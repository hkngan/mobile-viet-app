import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../themes/themes'
const Input = ({
      placeholder, 
      heightInput,
      widthInput, 
      navigateToResetPassScreen, 
      value,
      editable,
      onChangeText,
      keyboardType,
      secureTextEntry
}) => {
  const style = {
    textinput:{
      width: widthInput,
      height: heightInput,
      padding: 15, 
      fontSize: SPACING.space_16,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#444',
      shadowOffset: {
      height:1, width:1
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,
      elevation: 1,
    },
  }
  return (
    <View style={styles.container}>
        <TextInput
          onChangeText={onChangeText} 
          style={[style.textinput, 
          {height: heightInput, width: widthInput}]} 
          placeholder={placeholder} 
          value={value}
          placeholderTextColor={COLORS.LightBlack} 
          editable={editable}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container:{
    marginVertical: 7
  },

  
})