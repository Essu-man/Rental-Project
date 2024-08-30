import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Address = () => {
  const [address, setAddress] = useState('North Legon, Agbogba');
  const navigation = useNavigation();

  const handleSaveAddress = () => {
    // Save the address and navigate back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#3d9d75',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Address;
