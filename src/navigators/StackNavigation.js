import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen, Login, Registration, LearningLesson, StudyView, ImageQuestion, MultipleQuestion, FillQuestion, ListeningQuestion, SpeakingQuestion, EditProfile} from '../screens';
import BottomTab from './TabNavigation';
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true
    }}>
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
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
