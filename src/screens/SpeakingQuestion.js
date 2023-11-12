import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTSIZE, SPACING} from '../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVolumeHigh, faMicrophone, faMicrophoneSlash} from '@fortawesome/free-solid-svg-icons';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

const SpeakingQuestion = ({
  question,
  answers,
  selectedAnswer,
  onAnswerSelection,
}) => {
  Tts.setDefaultLanguage('vi-VN');

  let [recording, setRecording] = useState(false);
  let [result, setResult] = useState();
  let [finalResult, setFinalResult] = useState();

  const speechStartHandler = e => {
    console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {
    console.log('speech event: ',e);
    const text = e.value[0];
    setResult(text);
    
  };
  const speechErrorHandler = e=>{
    console.log('speech error: ',e);
  }

  const startRecording = async () => {
    setRecording(true)
    try {
      await Voice.start('vi-VN');
    } catch (error) {
      console.log('Error in startRecording function', error)
    }
  }
  const stopRecording = async () => {
    try {
      await Voice.stop()
      setRecording(false)
    } catch (error) {
      console.log('Error in startRecording function', error)
    }
  }
  
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler
    Voice.onSpeechEnd = speechEndHandler
    Voice.onSpeechResults = speechResultsHandler
    Voice.onSpeechError = speechErrorHandler

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, []);

  const rightAnswer = question.split(' ');
  console.log(rightAnswer)
  
  const userInput = result ? result.split(' ') : [];
  console.log(userInput)

  const normalizeString = (str) => str.toLowerCase();

  const handleComparison = () => {
    const normalizedUserInputArray = userInput.map(normalizeString);
    const normalizedRightAnswer = rightAnswer.map(normalizeString);
    const comparisonResult = normalizedUserInputArray.map((word, index) => {
      return {
        word,
        correct: normalizedRightAnswer[index] === word,
      };
    });
    setFinalResult(comparisonResult);
  };
console.log(finalResult)
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
        {recording ? (
          <TouchableOpacity 
            style={[styles.soundContainer, {backgroundColor: COLORS.Red}]}
            onPress={stopRecording}>
            <FontAwesomeIcon
              icon={faMicrophone}
              size={30}
              color={COLORS.Black}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.soundContainer, {backgroundColor: COLORS.LightBlue1}]}
            onPress={startRecording}>
            <FontAwesomeIcon
              icon={faMicrophone}
              size={30}
              color={COLORS.Black}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginVertical: 20}}>
        
      {finalResult ? (
        <View>
          <Text style={styles.questionText}>Kết quả: {finalResult && finalResult.map((item, index) => (
          <Text key={index} style={[styles.questionText, { color: item.correct ? 'green' : 'red' }]}>
            {item.word}{' '}
          </Text>
          
        ))
        }</Text>
        <Text style={styles.questionText}>Câu trả lời đúng: {question}</Text>
        </View>
      ) : null}
        


                <Button title="So sánh" onPress={handleComparison}/>

      </View>
    </View>
  );
};

export default SpeakingQuestion;

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {},
  questionText: {
    fontSize: FONTSIZE.size_20,
    marginHorizontal: SPACING.space_15,
    textAlign: 'center',
    color: COLORS.Black
  },
  questionContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  answerContainer: {
    width: WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_32 * 4,
    justifyContent: 'center',
    alignContent: 'center',
  },

  soundContainer: {
    width: WIDTH * 0.15,
    height: WIDTH * 0.15,
    borderRadius: SPACING.space_15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: SPACING.space_10,
  },
});