import * as React from 'react';
import { 
  View, 
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../theme/colors';

type Props = {
  size: number;
};

const Loader: React.FC<Props> = ({
  size,
}) => {


  return (
    <View style={[styles.container]}>
        <ActivityIndicator size={moderateScale(size)} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:colors.white,
    justifyContent:"flex-start",
    paddingTop:"10%"
  },
});

export default Loader;