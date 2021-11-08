import React,{useCallback,useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { appState } from '../utils/interface';
import { colors } from '../theme/colors';
import Loader from '../components/Loader';
import inventoryService from '../utils/inventoryService';
import { inventoryData } from '../utils/interface';
import { ADD_TO_INVENTORY, LOADING_STATUS, UPDATE_INVENTORY } from '../stores/action';
import { StackScreenProps} from '@react-navigation/stack';
import Button from '../components/Button';


type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: inventoryData
};

type Props = StackScreenProps<RootStackParamList, 'Home'>;



const Home = ({navigation,route}: Props) => {
    const state = useSelector((state:appState) => state);
    const dispatch = useDispatch();

    useEffect( ()=>{
        const bootstrap = async () => {
            const inventory = await inventoryService.getInventory()
            dispatch({ type: UPDATE_INVENTORY,  payload:inventory });
            dispatch({ type: LOADING_STATUS,  payload:false });
        };
        bootstrap();
    },[])

    const keyExtractor = useCallback(
        (item, i) => i.toString(),
        []
    )
    
    const renderItem = useCallback(
        ({ item, index }) => <Button item={item} onPress={()=>navigation.navigate("Edit",item)} />,
        []
    )
    

    return (
        <SafeAreaView testID="2" style={styles.container}>
            <StatusBar 
                // translucent ={true}
                backgroundColor="#509BC7"
                barStyle="dark-content"
                showHideTransition="slide"
            />
            <View  style={styles.header}>
                <Text style={styles.headerText}>
                    Bluemoon
                </Text>
            </View>
            {
                state.loading?(
                    <Loader size={40} />
                ):(
                    state.inventory.length > 0?(
                    <FlatList
                        data={state.inventory}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={30}
                        updateCellsBatchingPeriod={0}
                        initialNumToRender={50}
                        windowSize={21}
                        onEndReachedThreshold={0.01}
                        style={{
                            paddingVertical:"5%",
                            paddingHorizontal:"5%"
                        }}
                        contentContainerStyle={{
                            paddingBottom:70
                        }}
                    />
                    ):(
                    <View style={{
                        flex:1,
                        justifyContent:"center",
                        alignItems:"center",
                    }}>
                        <Text>
                        No Item Found
                        </Text>
                    </View>
                    )
                )
            }
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Create")}>
                <Icon name="ios-add" size={40} color={colors.white} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    header:{
        paddingVertical:"2%",
        paddingHorizontal:"5%"
    },
    headerText:{
        fontSize:moderateScale(25),
        fontWeight:"bold",
        color:colors.primary
    },
    btn:{
        backgroundColor:colors.primary,
        justifyContent:"center",
        alignItems:"center",
        width:moderateScale(50),
        height:moderateScale(50),
        borderRadius:moderateScale(25),
        position:"absolute",
        bottom:"5%",
        right:"8%"
    },
    card:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderWidth:1,
        borderColor:colors.primary,
        marginBottom:"5%",
        paddingHorizontal:"5%",
        paddingVertical:"5%"
    },
    itemName:{
        fontSize:moderateScale(18),
        color:"black",
        fontWeight:"600",
    },
    itemPrice:{
        fontSize:moderateScale(25),
        fontWeight:"400",
        color:colors.primary
    },
    itemStock:{
        fontSize:moderateScale(16),
        fontWeight:"400",
    }
});

export default Home;