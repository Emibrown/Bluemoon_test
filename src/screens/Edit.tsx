import React, {useState,useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View ,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { appState } from '../utils/interface';
import { colors } from '../theme/colors';
import inventoryService from '../utils/inventoryService';
import { inventoryData } from '../utils/interface';
import Toast from "react-native-simple-toast";
import { StackScreenProps} from '@react-navigation/stack';


type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: inventoryData
};

type Props = StackScreenProps<RootStackParamList, 'Edit'>;


const Edit = ({navigation,route}: Props) => {
  const state = useSelector((state:appState) => state);
  const dispatch = useDispatch();
  const _id = route.params._id
  const [name,setName] = useState<string>(route.params.name);
  const [stock,setStock] = useState<number>(route.params.stock);
  const [price,setPrice] = useState<number>(route.params.price);
  const [description,setDescription] = useState<string>(route.params.description);

  // // Name is unique check
  const uniqueName = () => {
    const found = state.inventory.find((el:inventoryData) => el.name == name);
    if(!found){
      return true
    }else{
      if(found._id == _id){
        return true
      }
    }
    return false
  }

  const EditInventory = async () => {
    // Name required
    if(!name) return Toast.show('Item name is required');
     // Name is unique
    if(!uniqueName()) return Toast.show('Item with this name already exist');
    // stock is required
    if(!stock && stock !== 0) return Toast.show('Item stock is required');
    // price is required
    if(!price && price !== 0) return Toast.show('Item price is required');
    //  description is required
    if(!description) return Toast.show('Item description is required');
    // description must have at least three words
    if(description.split(' ').length < 3) return Toast.show('Item description is too short');
    const newInventory: inventoryData = {
      _id,
      name,
      stock,
      price,
      description
    }
    inventoryService.EditInventory(newInventory,dispatch)
    .then((resp)=>{
      Toast.show('Item successfully updated');
    })
    .catch((err)=>{
      Toast.show('Error! Can not update Item');
    })
  }

  const onDelete = () => {
    Alert.alert(
      "Alert",
      "Are youe sure you want to remove this item from inventory",
      [
        { text: "Yes", style:'destructive', onPress: () => RemoveInventory() },
        {
          text: "No",
          style: "cancel"
        },
      ],
      { cancelable: true }
    );
  }

  const RemoveInventory = async () => {
    inventoryService.RemoveInventory(_id,dispatch)
    .then((resp)=>{
      Toast.show('Item deleted successfully');
      navigation.goBack()
    })
    .catch((err)=>{
      Toast.show('Error! Can not delete Item');
    })
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="keyboard-backspace" size={40} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
            Edit Inventory
        </Text>
      </View>
      <ScrollView>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Name
          </Text>
          <TextInput  
          style={styles.input} 
          value={name}
          onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Total stock
          </Text>
          <TextInput  
          keyboardType="numeric" 
          style={styles.input}
          value={stock || stock === 0 ?stock.toString():""}
          onChangeText={(text) => setStock(parseInt(text))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Price
          </Text>
          <TextInput  
          keyboardType="numeric" 
          style={styles.input} 
          value={price || price === 0 ? price+"":""}
          onChangeText={(text) => setPrice(parseInt(text))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Description
          </Text>
          <TextInput 
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          />
        </View>

        <TouchableOpacity onPress={EditInventory} style={styles.btn}>
          <Text style={styles.btnText}>
            Add Item
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} style={{...styles.btn,backgroundColor:"#e57373"}}>
          <Text style={styles.btnText}>
            Delete Item
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
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
      fontSize:moderateScale(22),
      fontWeight:"bold",
      color:colors.primary
  },
  formGroup:{
    marginHorizontal:"5%",
    marginTop:"5%"
  },
  label:{
    fontWeight:'400',
    fontSize:moderateScale(16)
  },
  input:{
    backgroundColor:"#e0e0e0",
    height:moderateScale(45),
    paddingLeft:"5%",
  },
  btn:{
    backgroundColor:colors.primary,
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:"4%",
    marginHorizontal:"5%",
    marginTop:"10%"
  },
  btnText:{
    fontSize:moderateScale(16),
  }
});

export default Edit;