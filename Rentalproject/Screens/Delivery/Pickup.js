import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PickupDeliveryOptions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Destructure params with default values
  const { selectedCategory = '', selectedType = '', baseCostPerDay = 0, startDate, endDate, totalCost } = route.params || {};
  
  const [option, setOption] = useState('pickup'); // Default to 'pickup'
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleConfirmPress = () => {
    if (option === 'pickup' && pickupLocation.trim() === '') {
      Alert.alert('Error', 'Please enter a pickup location.');
    } else if (option === 'delivery' && deliveryAddress.trim() === '') {
      Alert.alert('Error', 'Please enter a delivery address.');
    } else {
      Alert.alert('Order Confirmed', `Selected Option: ${option}\nLocation: ${option === 'pickup' ? pickupLocation : deliveryAddress}`);
      // Navigate to the next screen or handle order confirmation logic
      navigation.navigate('OrderConfirmation', {
        selectedCategory,
        selectedType,
        baseCostPerDay,
        startDate,
        endDate,
        totalCost,
        option,
        location: option === 'pickup' ? pickupLocation : deliveryAddress,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Pickup/Delivery Options</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, option === 'pickup' && styles.selectedOption]}
          onPress={() => setOption('pickup')}
        >
          <Text style={styles.optionText}>Pickup</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, option === 'delivery' && styles.selectedOption]}
          onPress={() => setOption('delivery')}
        >
          <Text style={styles.optionText}>Delivery</Text>
        </TouchableOpacity>
      </View>

      {option === 'pickup' ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pickup Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Delivery Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter delivery address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
        </View>
      )}

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#d1c4e9',
    borderColor: '#9575cd',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PickupDeliveryOptions;
