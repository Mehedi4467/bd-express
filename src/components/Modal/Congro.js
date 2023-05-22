import * as React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import {Image, Text, View} from 'react-native';
import congo from '../../assets/congratulations-congrats.gif';
const Congo = ({navigation,setCongoMsg}) => {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} dismissable={!visible} onDismiss={visible}>
        <View style={{padding:10}}>
        <Image source={congo} style={{width:'100%',height:200}} />

        <Text style={{fontWeight:800,marginTop:-30,textAlign: 'center'}}>You Have Earn 1 Coin</Text>
        </View>

      
        <Dialog.Actions>
          {/* <Button onPress={() => console.log('Cancel')}>Cancel</Button> */}
          <Button onPress={() => {
            hideDialog();
            navigation.navigate('Home');
            setCongoMsg(false);
          }}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Congo;