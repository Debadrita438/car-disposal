/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Back,
  Tab1,
  Tab1Active,
  Tab2,
  Tab2Active,
  Tab3,
  Tab3Active,
  Tab4,
  Tab4Active,
} from '../assets';
import {Colors, Fonts} from '../theme';
import {
  AddCarScreen,
  CarListingScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  HelpScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';
import {Pressable} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return focused ? <Tab1Active /> : <Tab1 />;
          } else if (route.name === 'Car') {
            return focused ? <Tab2Active /> : <Tab2 />;
          } else if (route.name === 'Help') {
            return focused ? <Tab3Active /> : <Tab3 />;
          } else if (route.name === 'Profile') {
            return focused ? <Tab4Active /> : <Tab4 />;
          }
        },
        tabBarActiveTintColor: '#2D3092',
        tabBarInactiveTintColor: '#000',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.2,
          shadowRadius: 6.68,
          elevation: 11,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Car"
        component={CarListingScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F8F8F8', // Custom background color
          },
          headerTintColor: '#1C1C1C', // Text color
          headerTitleStyle: {
            fontSize: 18, // Custom text style
            fontFamily: Fonts.bold,
          },
          headerTitle: 'My Request',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F8F8F8', // Custom background color
          },
          headerTintColor: '#1C1C1C', // Text color
          headerTitleStyle: {
            fontSize: 18, // Custom text style
            fontFamily: Fonts.bold,
          },
          headerTitle: 'Help & Support',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.whiteColor, // Custom background color
          },
          headerTintColor: '#1C1C1C', // Text color
          headerTitleStyle: {
            fontSize: 18, // Custom text style
            fontFamily: Fonts.bold,
          },
          headerTitle: 'Change Password',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable onPress={navigation.goBack}>
              <Back fill={'#1C1C1C'} />
            </Pressable>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="AddCarScreen"
        component={AddCarScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.whiteColor, // Custom background color
          },
          headerTintColor: '#1C1C1C', // Text color
          headerTitleStyle: {
            fontSize: 18, // Custom text style
            fontFamily: Fonts.bold,
          },
          headerTitle: 'Add Car',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable onPress={navigation.goBack}>
              <Back fill={'#1C1C1C'} />
            </Pressable>
          ),
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
