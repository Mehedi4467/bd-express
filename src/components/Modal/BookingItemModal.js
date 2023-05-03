import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal, Portal, Provider } from 'react-native-paper'

export default function BookingItemModal({hideModal,visible}) {
 
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (

    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>


  )
}