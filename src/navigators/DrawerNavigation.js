import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LearningLesson, UserProfile } from '../screens';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { COLORS, FONTSIZE } from '../themes/themes';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}
    >
      <Drawer.Screen
        name="LearningLesson"
        component={LearningLesson}
        options={{
          drawerLabel: 'Home',
          drawerLabelStyle: {
            fontSize: FONTSIZE.size_18,
            color: COLORS.Black,
            fontWeight: 'bold'
          },
          drawerIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={COLORS.Black} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          drawerLabel: 'Profile',
          drawerLabelStyle: {
            fontSize: FONTSIZE.size_18,
            color: COLORS.Black,
            fontWeight: 'bold'
          },
          drawerIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faAddressCard} color={COLORS.Black} size={size} />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
