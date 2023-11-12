import { View, Text, StyleSheet, Dimensions } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/'
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { LearningLesson, UserProfile } from '../screens';
import { COLORS, SPACING } from '../themes/themes';



const Tab = createBottomTabNavigator();


const BottomTab = ({route}) => {

    return (
    <Tab.Navigator
    screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: COLORS.LightBlue,
        borderTopWidth: 0,
        height: SPACING.space_10 * 7,
      },
    }}>
            <Tab.Screen
                name="LearningLesson"
                component={LearningLesson}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({focused, size, color }) => (
                      <View
                      style={[
                        styles.activeTab,
                        focused ? { backgroundColor: COLORS.White } : {},
                      ]}>
                          <FontAwesomeIcon icon={faHome} color={COLORS.Blue} size={32} />
                      </View>
                    ),
                    tabBarShowLabel: false,
                  })}
            />
            <Tab.Screen
                name="UserProfile"
                component={UserProfile}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({focused, size, color }) => (
<View
                      style={[
                        styles.activeTab,
                        focused ? { backgroundColor: COLORS.White } : {},
                      ]}>
                          <FontAwesomeIcon icon={faUser} color={COLORS.Blue} size={32} />
                      </View>                    ),
                    tabBarShowLabel: false,
                  })}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: COLORS.LightBlue,
    width: WIDTH*0.2,
    padding: SPACING.space_10,
    borderRadius: SPACING.space_18 * 5,
    alignItems: 'center'
  },
});