import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen, Login, Registration, LearningLesson, StudyView, ImageQuestion, MultipleQuestion, FillQuestion, ListeningQuestion, SpeakingQuestion} from '../screens';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginStack"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistrationStack"
        component={Registration}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="StudyView" 
        component={StudyView} 
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="ImageQuestion" 
        component={ImageQuestion} 
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="MultipleQuestion" 
        component={MultipleQuestion} 
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="FillQuestion" 
        component={FillQuestion} 
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="ListeningQuestion" 
        component={ListeningQuestion} 
        options={{headerShown: false}}
        />

      <Stack.Screen
        name="SpeakingQuestion"
        component={SpeakingQuestion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
