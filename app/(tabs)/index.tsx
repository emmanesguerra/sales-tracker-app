import React, { useState } from 'react'; // Make sure to import useState
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [quantity, setQuantity] = useState(0); // Initialize quantity state

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleSave = () => {
    alert(`Saved Quantity: ${quantity}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraBox} />
      <Text style={styles.itemName}>Uniforms</Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.quantityInput}
          placeholder="Enter quantity"
          keyboardType="numeric"
          value={String(quantity)} // Bind the value of quantity
          onChangeText={text => setQuantity(Number(text))} // Update quantity if user types manually
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
  cameraBox: {
    backgroundColor: 'red',
    height: '40%',
    width: '90%',
    marginTop: 50,
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
