import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, FONTSIZE, SPACING } from '../themes/themes'
import appConfig from '../../config';
import Tts from 'react-native-tts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
const ImageQuestion = ({ question, answers, selectedAnswer, onAnswerSelection }) => {
  const IPV4_ADDRESS = appConfig.extra.IPV4
  const PORT = appConfig.extra.PORT
  Tts.setDefaultLanguage('vi-VN');

  return (
    <View style={styles.container}>
            <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      <TouchableOpacity
          onPress={() => Tts.speak(question)}>
          <FontAwesomeIcon icon={faVolumeHigh} size={20} color={COLORS.Black} />
        </TouchableOpacity>
        </View>
      <View style={styles.answerContainer}>
        {answers.map((answer, index) => {
          const originalPath = answer.attachment.url;
          const updatedPath = originalPath.replace(/\\/g, "/");
          const isSelected = answer === selectedAnswer;

          return (
            <TouchableOpacity
              style={[
                styles.answerBox,
                { backgroundColor: isSelected ? COLORS.Yellow : COLORS.White },
              ]}
              key={index}
              onPress={() => onAnswerSelection(answer)}
            >
              <Image
                source={{ uri: `http://${IPV4_ADDRESS}:${PORT}/${updatedPath}` }}
                style={styles.img}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default ImageQuestion
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  container:{
  },
  questionText:{
    fontSize: FONTSIZE.size_24,
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_10,
    textAlign: 'center'
  },
  answerContainer:{
    width: WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_32*2
  },
  answerBox:{
    backgroundColor: COLORS.White,
    width: WIDTH*0.42,
    height: WIDTH*0.40,
    borderRadius: SPACING.space_10,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_10
  },
  img:{
    height: 90,
    width: 90,
    aspectRatio: 1,
    borderRadius: SPACING.space_10,
    alignSelf: 'center'
  },
  questionContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

