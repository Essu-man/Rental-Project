import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddressManagement = ({ navigation, route }) => {
  const [address, setAddress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]); // Fetch this from storage or API

  const handleSaveAddress = () => {
    if (address) {
      setSavedAddresses([...savedAddresses, address]);
      setAddress('');
      Alert.alert('Success', 'Address saved successfully!');
    } else {
      Alert.alert('Error', 'Please enter an address.');
    }
  };

  const handleSelectAddress = (selectedAddress) => {
    navigation.navigate('OrderDetails', { selectedAddress });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Addresses</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Saved Addresses</Text>
      {savedAddresses.map((addr, index) => (
        <TouchableOpacity key={index} onPress={() => handleSelectAddress(addr)}>
          <Text style={styles.savedAddress}>{addr}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3d9d75',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  savedAddress: {
    fontSize: 16,
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  backButton: {
    fontSize: 16,
    color: '#3d9d75',
    marginTop: 16,
  },
});

export default AddressManagement;
