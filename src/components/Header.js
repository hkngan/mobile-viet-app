import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { COLORS, FONTSIZE, SPACING } from '../themes/themes'
const Header = ({onPress, title}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.Black} size={30}/>
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_15,
    },
    buttonContainer:{
        justifyContent: 'center'
    },
    text:{
        color: COLORS.Black,
        fontSize: FONTSIZE.size_24,
        marginLeft: SPACING.space_20,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})