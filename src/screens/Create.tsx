import React, {useState} from 'react';
import { 
    StyleSheet, 
    Text, 
    View ,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { appState } from '../utils/interface';
import { colors } from '../theme/colors';
import inventoryService from '../utils/inventoryService';
import { inventoryData } from '../utils/interface';
import uuid from 'react-native-uuid';
import Toast from "react-native-simple-toast";
import { StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: inventoryData
};

type Props = StackScreenProps<RootStackParamList, 'Create'>;


const Create = ({navigation,route}: Props) => {
  const state = useSelector((state:appState) => state);
  const dispatch = useDispatch();

  const [name,setName] = useState<string>("");
  const [stock,setStock] = useState<number>(0);
  const [price,setPrice] = useState<number>(0);
  const [description,setDescription] = useState<string>("");

  const addInventory = async () => {
    // Name required
    if(!name) return Toast.show('Item name is required');
     // Name is unique
    if(state.inventory.some((el:inventoryData) => el.name == name)) return Toast.show('Item with this name already exist');
    // stock is required
    if(!stock && stock !== 0) return Toast.show('Item stock is required');
    // price is required
    if(!price && price !== 0) return Toast.show('Item price is required');
    //  description is required
    if(!description) return Toast.show('Item description is required');
    // description must have at least three words
    if(description.split(' ').length < 3) return Toast.show('Item description is too short');
    const newInventory: inventoryData = {
      _id:  uuid.v4().toString(),
      name,
      stock,
      price,
      description
    }
    inventoryService.addInventory(newInventory,dispatch)
    .then((resp)=>{
      Toast.show('Item successfully added to inventory');
      navigation.goBack()
    })
    .catch((err)=>{
      Toast.show('Error! Can not add Item to inventory');
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="keyboard-backspace" size={40} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
            Add Inventory
        </Text>
      </View>
      <ScrollView>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Name
          </Text>
          <TextInput  
          style={styles.input} 
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
          value={stock || stock === 0 ? stock+"":""}
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
          onChangeText={(text) => setDescription(text)}
          />
        </View>

        <TouchableOpacity onPress={addInventory} style={styles.btn}>
          <Text style={styles.btnText}>
            Add Item
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

export default Create;