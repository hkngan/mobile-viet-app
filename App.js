import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigators/StackNavigation'
import { AuthProvider } from "./src/context/authContext";
import { TopicProvider } from "./src/context/topicContext";
import { QuestionProvider } from "./src/context/questionContext";

const App = () => {
  return (
    <AuthProvider>
      <TopicProvider>
        <QuestionProvider>
          <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
        </QuestionProvider>
      </TopicProvider>
    </AuthProvider>
  );
};

export default App;