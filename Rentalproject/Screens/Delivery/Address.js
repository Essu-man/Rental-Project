import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddressManagement = ({ navigation }) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('addresses')
      .onSnapshot(querySnapshot => {
        const addresses = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavedAddresses(addresses);
      });

    return () => unsubscribe();
  }, []);

  const handleSaveAddress = async () => {
    if (street && city && region) {
      try {
        await firestore().collection('addresses').add({
          street,
          city,
          region,
        });
        setStreet('');
        setCity('');
        setRegion('');
        Alert.alert('Success', 'Address saved successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save address.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  const handleSelectAddress = (selectedAddress) => {
    navigation.navigate('OrderDetails', { selectedAddress });
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectAddress(item)}>
      <Text style={styles.savedAddress}>{`${item.street}, ${item.city}, ${item.region}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Addresses</Text>
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Region"
        value={region}
        onChangeText={setRegion}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Saved Addresses</Text>
      <FlatList
        data={savedAddresses}
        renderItem={renderAddress}
        keyExtractor={item => item.id}
      />
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
