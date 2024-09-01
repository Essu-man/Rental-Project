import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DeliveryPickup = () => {
  const navigation = useNavigation();

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('Door Delivery');
  
  const handleChangeAddress = () => {
    navigation.navigate('Address'); 
  };

  return (
    <View style={styles.container}>
  
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={[styles.line, {backgroundColor: '#3d9d75'}]} />
          <Text style={styles.progressText}>Order Details</Text>
        </View>
        <View style={styles.progressStep}>
          <View style={[styles.line, {backgroundColor: '#3d9d75'}]} />
          <Text style={styles.progressText}>Delivery/Pickup</Text>
        </View>
        <View style={styles.progressStep}>
          <View style={styles.line} />
          <Text style={styles.progressText}>Payment</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subHeader}>ADDRESS</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Constance Esuman</Text>
          <Text style={styles.addressText}>North Legon, Agbogba</Text>
        </View>
        <TouchableOpacity onPress={handleChangeAddress}>
          <Text style={styles.changeAddressText}>CHANGE YOUR ADDRESS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.subHeader}>DELIVERY</Text>
        <TouchableOpacity
          style={[styles.deliveryOption, selectedDeliveryOption === 'Door Delivery' && styles.selectedOption]}
          onPress={() => setSelectedDeliveryOption('Door Delivery')}
        >
          <Text style={styles.deliveryText}>Door Delivery</Text>
          <Text style={styles.deliveryDetails}>Delivery between 02 Sep and 04 Sep.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deliveryOption, selectedDeliveryOption === 'Pickup' && styles.selectedOption]}
          onPress={() => setSelectedDeliveryOption('Pickup')}
        >
          <Text style={styles.deliveryText}>Pickup</Text>
          <Text style={styles.deliveryDetails}>Switch to a pickup station starting from GH₵ 9.52.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('PaymentScreen')}>
          <Text style={styles.confirmButtonText}>CONFIRM ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f5',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressStep: {
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 2,
    backgroundColor: '#ddd',
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    padding: 16,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  addressContainer: {
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  changeAddressText: {
    fontSize: 16,
    color: '#3d9d75',
    textDecorationLine: 'underline',
  },
  deliveryOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: '#3d9d75',
    backgroundColor: '#e0f0e5',
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryDetails: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  footer: {
    marginTop: 'auto',
  },
  confirmButton: {
    backgroundColor: '#3d9d75',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DeliveryPickup;
