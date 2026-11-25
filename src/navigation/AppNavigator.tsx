import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerScreens, stackScreens } from './screens';
import { RootDrawerParamList, RootStackParamList } from './types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.35)',
        drawerStyle: {
          width: '75%',
          backgroundColor: '#fff',
          borderTopRightRadius: 28,
          borderBottomRightRadius: 28,
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#4b5563',
        drawerActiveBackgroundColor: '#353535',
        drawerItemStyle: {
          borderRadius: 14,
          marginHorizontal: 14,
          marginVertical: 2,
          paddingVertical: 2,
        },
        drawerLabelStyle: {
          fontFamily: 'Cairo-Medium',
          fontSize: 16,
        },
      }}
    >
      {DrawerScreens.map(screen => (
        <Drawer.Screen
          key={screen.screenName}
          name={screen.screenName}
          component={screen.component}
          options={{
            title: screen.title,
            drawerIcon: ({ color, size }) => (
              <Icon name={screen.icon!} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{ headerShown: false }}
    >
      {stackScreens.map(screen => (
        <Stack.Screen
          key={screen.screenName}
          name={screen.screenName}
          component={screen.component}
        />
      ))}
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}
