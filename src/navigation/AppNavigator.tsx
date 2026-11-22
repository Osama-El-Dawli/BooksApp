import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from './screens';
import { RootStackParamList } from './types';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens.map(screen => (
        <Stack.Screen
          key={screen.screenName}
          name={screen.screenName}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
}
