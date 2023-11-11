import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/themes'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import Sound from 'react-native-sound';
import config from '../../config';

const ListeningQuestion = ({ question, answers, selectedAnswer, onAnswerSelection, audio }) => {
  const IPV4_ADDRESS = config.extra.IPV4
  const PORT = config.extra.PORT
  const [sound, setSound] = useState();

  const playSound = () => {
    const originalPath = audio.url;
    const updatedPath = originalPath.replace(/\\/g, "/");
    console.log(updatedPath)
    const sound = new Sound(`http://${IPV4_ADDRESS}:${PORT}/${updatedPath}`, null, (error) => {
      if (error) {
        console.error('Error loading sound: ', error);
      } else {
        sound.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.error('Error playing sound');
          }
        });
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      <TouchableOpacity style={styles.soundContainer} onPress={playSound}>
        <FontAwesomeIcon icon={faVolumeHigh} size={70} color={COLORS.Black} />
      </TouchableOpacity>
      <View style={styles.answerContainer}>
        {answers.map((answer, index) => {
          const isSelected = answer === selectedAnswer;
          return (
            <TouchableOpacity 
              style={[styles.answerBox, { backgroundColor: isSelected ? COLORS.Yellow : COLORS.White },]} 
              key={index}
              onPress={() => onAnswerSelection(answer)}>
              <Text style={styles.textAnswer}>{answer.answer}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default ListeningQuestion

const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  container:{

  },
  questionText:{
    fontSize: FONTSIZE.size_20,
    marginHorizontal: SPACING.space_15,
    marginVertical: SPACING.space_15,
    textAlign: 'center'
  },
  soundContainer:{
    width: WIDTH*0.3,
    height: WIDTH*0.3,
    backgroundColor: COLORS.LightBlue1,
    borderRadius: SPACING.space_15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginVertical: SPACING.space_10
  },
  answerContainer:{
    width: WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  answerBox:{
    width: WIDTH*0.8,
    height: WIDTH*0.15,
    backgroundColor: COLORS.White,
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_8,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: SPACING.space_15,
    borderWidth: 2,
    borderColor: COLORS.Brown
    
  },
  shadow:{
    shadowColor: COLORS.Black,
    shadowOffset: {
      height:1,
      width:1
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.2,
    elevation: 0.1
  },
  textAnswer:{
    textAlign: 'center',
    fontSize: FONTSIZE.size_16
  }
})