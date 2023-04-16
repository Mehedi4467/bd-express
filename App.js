import { View, StyleSheet } from 'react-native';
import HomePage from './components/Home/HomePage';
import Scanner from './components/Scanner/Scanner';
import { useEffect, useState } from 'react';
import TopNavbar from './components/Home/TopNavbar';
import BottomNavbar from './components/Home/BottomNavbar';
import axios from 'axios';

export default function App() {
  const [code, setCode] = useState('');
  const [stopScanner, setScannerClose] = useState(true);
  const [resData, setResData] = useState('');

  useEffect(() => {
    if (code) {
      axios
        .get('https://apibdexpresscargo.xyz/api/v1')
        .then((response) => {
          setResData(response?.data?.msg);
        })
        .catch((error) => {
          console.log(error);
          setResData('Sorry! Something want wrong!');
        });
    } else {
      setResData('Please Wait....');
    }
  }, [code]);

  return (
    <>
      <View>
        <TopNavbar></TopNavbar>
      </View>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <HomePage code={code} resData={resData}></HomePage>
      </View>
      {stopScanner || <Scanner setCode={setCode} code={code}></Scanner>}

      <View style={styles.Bottomcontainer}>
        <BottomNavbar
          setScannerClose={setScannerClose}
          stopScanner={stopScanner}
        ></BottomNavbar>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Bottomcontainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#00aeef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
