import * as React from 'react'
import { createStackNavigator,TransitionPresets} from '@react-navigation/stack';
import { inventoryData } from '../utils/interface';

// Screen
import Home from '../screens/Home';
import Create from '../screens/Create';
import Edit from '../screens/Edit';

type RootStackParamList = {
    Home: undefined;
    Create: undefined;
    Edit: inventoryData
};

const Stack = createStackNavigator<RootStackParamList>()


function MainStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="Create" 
                component={Create}
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="Edit" 
                component={Edit}
                options={{
                    headerShown:false
                }}
            />
            
        </Stack.Navigator>
    )
}
  
export default MainStack