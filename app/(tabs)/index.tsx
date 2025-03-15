import React, { useState, useEffect } from 'react'; // Make sure to import useState
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import QRCodeScanner from '@/components/_salestracker/QRCodeScanner';
import { initializeDatabase, insertSalesRecord } from '@/src/database/db';

export default function HomeScreen() {
  const [quantity, setQuantity] = useState(0);
  const [scannedText, setScannedText] = useState<string>('');
  const [scanned, setScanned] = useState(false);
  
  useEffect(() => {
    initializeDatabase();
  }, []);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleSave = () => {
    if (scannedText.trim() && quantity > 0) {
      insertSalesRecord(scannedText, quantity);
      alert('Sales record saved successfully!');
      setScannedText('');
      setQuantity(0);
    } else {
      alert('Please scan a product and enter a valid quantity.');
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner onScan={(data) => setScannedText(data)} />
      <Text style={styles.itemName}>{scannedText}</Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.quantityInput}
          placeholder="Enter quantity"
          keyboardType="numeric"
          value={String(quantity)}
          onChangeText={text => setQuantity(Number(text))}
        />

        <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityInput: {
    height: 50,
    width: 90,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20
  },
  button: {
    backgroundColor: 'gray',
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  submit: {
    backgroundColor: 'green',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
});
