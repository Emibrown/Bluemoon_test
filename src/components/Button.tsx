import * as React from 'react';
import { 
  View, 
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { inventoryData } from '../utils/interface';


type Props = {
  item: inventoryData;
  onPress: any
};

const Button: React.FC<Props> = ({
  item,
  onPress
}) => {


  return (
    <TouchableOpacity testID={"2"}  onPress={onPress} style={styles.card}>
        <View>
            <Text style={styles.itemName}>
                {item.name}
            </Text>
            <Text style={styles.itemStock}>
                {item.stock} in stock
            </Text>
        </View>
        <View>
            <Text style={styles.itemPrice}>
                ${item.price}
            </Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default Button;