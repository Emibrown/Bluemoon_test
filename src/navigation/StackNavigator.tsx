import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { createStackNavigator,TransitionPresets} from '@react-navigation/stack';
import MainStack from './MainStack';

const Stack = createStackNavigator()


function StackNavigator() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        ...TransitionPresets.SlideFromRightIOS
                    }}
                >
                    <Stack.Screen 
                        name="MainStack" 
                        component={MainStack} 
                        options={{
                        headerShown:false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
  
export default StackNavigator