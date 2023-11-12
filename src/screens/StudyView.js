import { StyleSheet, Text, View, TouchableOpacity, Dimensions , SafeAreaView, Alert} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import { TopicContext } from '../context/topicContext';
import config from '../../config';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { QuestionContext } from '../context/questionContext';
import ImageQuestion from './ImageQuestion';
import MultipleQuestion from './MultipleQuestion';
import FillQuestion from './FillQuestion';
import ListeningQuestion from './ListeningQuestion';
import SpeakingQuestion from './SpeakingQuestion';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
import { CustomAlert, Header } from '../components';
import { useNavigation } from '@react-navigation/native';

const StudyView = () => {
    const IPV4_ADDRESS = config.extra.IPV4
    const PORT = config.extra.PORT   
    const navigation = useNavigation()

    const { topic } = useContext(TopicContext);
    const { state } = useContext(AuthContext);
    const id = topic.id;
    const accessToken = state.accessToken;
    const {
      setAnswerChecked,
      currentQuestionIndex,
      setCurrentQuestionIndex,
    } = useContext(QuestionContext);
  
    const [questionList, setQuestionList] = useState([]);
    const [isCheckButtonEnabled, setIsCheckButtonEnabled] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const currentQuestion = questionList[currentQuestionIndex];

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    useEffect(() => {
      const getData = async () => {
        try {
          let response = await axios.get(`http://${IPV4_ADDRESS}:${PORT}/api/v1/lesson/topic/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const questions = response.data
          for(const question of questions){
            shuffle(question.lesson.answers)
          }
          setQuestionList(questions);
          // console.log("response.data",response.data)
          // console.log('data', data)
        } catch (error) {
          console.log('Error in getData func', error);
        }
      };
      
      getData();
    }, []);

    const onPressCheck = () => {
      if (selectedAnswer !== null) {
        const isCorrect = selectedAnswer.isCorrect;
        setIsAnswerCorrect(isCorrect);
        setShowAlert(true);
      }else{
        onPressContinue()
        setFinalResult(null)
      }
    };
    const resetIndex = () => {
      try {
        if ( currentQuestionIndex === questionList.length) {
          setCurrentQuestionIndex(0)
        }
      } catch (error) {
        console.log('Error in resetIndex func', error);
      }
    }
    const onPressNext = () => {
      try {
        if ( currentQuestionIndex < questionList.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnswerChecked(false);
          setShowAlert(false);
          setIsCheckButtonEnabled(false)
        }else{
          Alert.alert('You are finish all the question')
          resetIndex()
        }
      } catch (error) {
        console.log('Error in onPressNext func', error);
      }
    };
 
    const handleAnswerSelection = (answer) => {
      const isCurrentlySelected = selectedAnswer === answer;
      const newSelectedAnswer = isCurrentlySelected ? null : answer;
    
      setSelectedAnswer(newSelectedAnswer);
      const isAnswerSelected = newSelectedAnswer !== null;
    
      setIsCheckButtonEnabled(isAnswerSelected);
    };
    const onPressContinue = async () => {
      try {
        const status = isAnswerCorrect ? 'True' : 'False';
        const response = await axios.post(
          `http://${IPV4_ADDRESS}:4000/api/v1/lesson-progress`, 
      {
        lessonId: currentQuestion.lesson.id,
        status: status
      },
      {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      }
      );
        onPressNext(); 

      } catch (error) {
        console.error('Error creating question progress', error);
      }
    };

    const renderQuestionTypeComponent = () => {
      try {
        if (currentQuestion && currentQuestion.lesson) {
          const type = currentQuestion.lesson.type;
          switch (type) {
            case 'Image':
              return (
                <ImageQuestion
                  question={currentQuestion.lesson.question}
                  answers={currentQuestion.lesson.answers}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelection={handleAnswerSelection}
                />
              );
            case 'Multiple':
              return (
                <MultipleQuestion 
                  question={currentQuestion.lesson.question}
                  answers={currentQuestion.lesson.answers}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelection={handleAnswerSelection}
                  />
              );
            case 'Fill':
              return (
                <FillQuestion 
                  question={currentQuestion.lesson.question}
                  answers={currentQuestion.lesson.answers}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelection={handleAnswerSelection}
                  />
              );
            case 'Listening':
              return (
                <ListeningQuestion 
                  audio={currentQuestion.lesson.attachmentQuestion}
                  question={currentQuestion.lesson.question}
                  answers={currentQuestion.lesson.answers}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelection={handleAnswerSelection}                />
              );
            case 'Speaking':
              return (
                <SpeakingQuestion
                  question={currentQuestion.lesson.question}  
                  
                />
              );
            default:
              return <Text style={{ alignSelf: 'center', color: COLORS.Black, fontSize: FONTSIZE.size_18 }}>Loading...</Text>;
          }
        } else {
          return <Text style={{ alignSelf: 'center', color: COLORS.Black, fontSize: FONTSIZE.size_18 }}>Loading...</Text>;
        }
      } catch (error) {
        console.log('Error in renderQuestionTypeComponent func', error);
      }
    };
   let type = currentQuestion ? currentQuestion.lesson.type : []
    return (
      <SafeAreaView style={styles.container}>
        <Header onPress={() => navigation.navigate('LearningLesson')} />
        <View style={styles.contentContainer}>
          {renderQuestionTypeComponent()}
        </View>
        <View style={styles.buttonContainer}>
          {              
              type === 'Speaking' ?
              (<TouchableOpacity
                style={[
                  styles.checkButton,
                  {
                    backgroundColor: isCheckButtonEnabled ? COLORS.Yellow1 : 'gray',
                  },
                ]}
                onPress={onPressCheck}
                disabled={!isCheckButtonEnabled}
              >
                <Text style={styles.textButton}>Next</Text>
              </TouchableOpacity>) 
              :
              (
                <TouchableOpacity
            style={[
              styles.checkButton,
              {
                backgroundColor: isCheckButtonEnabled ? COLORS.Yellow1 : 'gray',
              },
            ]}
            onPress={onPressCheck}
            disabled={!isCheckButtonEnabled}
          >
            <Text style={styles.textButton}>Check</Text>
          </TouchableOpacity>
              )
          }
          
        </View>
        <CustomAlert
            isVisible={showAlert}
            isCorrect={isAnswerCorrect}
            onNextQuestion={onPressContinue}
          />

      </SafeAreaView>
    );
  };
  
  export default StudyView;
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
        padding: 5,
    },
    progress: {
        width: 250,
        height: 10,
        borderRadius: 20,
    },
    txt: {
        fontSize: 25,
        color: 'black',
    },
    contentContainer:{
        width: WIDTH,

    },
    buttonContainer:{
        width: WIDTH,
        justifyContent:'center',
        alignItems:'center',
        // position: 'absolute',
        // bottom: SPACING.space_24,
        // left: 0,
        // right: 0,
    },
    checkButton:{
        height: WIDTH*0.1,
        width: WIDTH*0.8,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: SPACING.space_15,
        marginVertical: SPACING.space_10
    },
    textButton:{
        fontSize: FONTSIZE.size_20,
        textTransform: 'uppercase',
        color: COLORS.White,
        fontWeight: 'bold'
    }
});
