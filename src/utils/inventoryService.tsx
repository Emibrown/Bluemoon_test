import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_INVENTORY, UPDATE_INVENTORY, REMOVE_FROM_INVENTORY } from '../stores/action';
import { inventoryData } from './interface';


const getInventory = async () => {
    try {
      let value = await AsyncStorage.getItem('@inventory')      
      return value !== null? JSON.parse(value) : [];
    } catch(e) {
        return []
    }
}

const addInventory = async (value:inventoryData,dispatch:any) => {
    try {
        let inventories:any = await AsyncStorage.getItem('@inventory')
        inventories = inventories !== null? JSON.parse(inventories) : [];
        if(inventories){
            if(!inventories.some((el:inventoryData) => el.name == value.name)){
                const newInventories = [...inventories,value]
                await AsyncStorage.setItem('@inventory', JSON.stringify(newInventories))
                dispatch({ type: ADD_TO_INVENTORY,  payload:[value] });
                return Promise.resolve();
            }
        }
        return Promise.reject("error");
    } catch(e) {        
        return Promise.reject(e);
    }
}

const EditInventory = async (value:inventoryData,dispatch:any) => {
    try {
        let inventories:any = await AsyncStorage.getItem('@inventory')
        inventories = inventories !== null? JSON.parse(inventories) : [];
        if(inventories){
            const newInventories = inventories.map((el:inventoryData) =>
                el._id === value._id ? { ...el, ...value } : el
            );
            await AsyncStorage.setItem('@inventory', JSON.stringify(newInventories))
            dispatch({ type: UPDATE_INVENTORY,  payload:newInventories });
            return Promise.resolve();
        }
        return Promise.reject("error");
    } catch(e) {
        return Promise.reject(e);
    }
}

const RemoveInventory = async (_id:string,dispatch:any) => {
    try {
        let inventories:any = await AsyncStorage.getItem('@inventory')
        inventories = inventories !== null? JSON.parse(inventories) : [];
        if(inventories){
            const newInventories = inventories.filter((Item:inventoryData) => Item._id !== _id)
            await AsyncStorage.setItem('@inventory', JSON.stringify(newInventories))
            dispatch({ type: REMOVE_FROM_INVENTORY,  payload:_id });
            return Promise.resolve();
        }
        return Promise.reject();
    } catch(e) {
        return Promise.reject(e);
    }
}


export default {
    getInventory,
    addInventory,
    EditInventory,
    RemoveInventory
}