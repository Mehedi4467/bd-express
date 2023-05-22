import * as React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import { Text, View } from 'react-native'
const ErrorModal = ({setErrorMsg,errorMsg,setLoading}) => {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} dismissable={!visible} onDismiss={visible}>
        <Dialog.Actions style={{justifyContent:'space-between'}}>
          <View style={{textAlign:'center'}}>
          <Text style={{textAlign:'center'}}>{errorMsg}</Text>
          </View>
          <Button onPress={() => {
            hideDialog();
            setErrorMsg('');
            setLoading(false);
          }}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ErrorModal;