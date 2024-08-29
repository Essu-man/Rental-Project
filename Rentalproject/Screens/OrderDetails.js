import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OrderDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedCategory, selectedType } = route.params || {};

  // Sample user and order data
  const hirerName = 'John Doe';
  const hirerContact = '0551234567';
  const hirerEmail = 'johndoe@example.com';
  const location = 'Accra, Ghana';
  const costPerDay = '₵120'; // Example cost, update this based on selectedCategory
  const [rentalDuration, setRentalDuration] = useState(1); // Default 1 day

  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No category selected.</Text>
      </View>
    );
  }

  const calculateTotalCost = () => {
    return rentalDuration * parseInt(costPerDay.replace('₵', ''));
  };

  const handleConfirmOrder = () => {
    Alert.alert('Order Confirmed', 'Your order has been confirmed. Proceed to payment.');
    navigation.navigate('PaymentScreen', {
      selectedCategory,
      selectedType,
      totalCost: calculateTotalCost(),
      location,
      hirerName,
      hirerContact,
      hirerEmail,
    });
  };

  const handleEditDetails = () => {
    navigation.goBack();
  };

  const renderEquipmentImage = () => {
    switch (selectedCategory) {
      case 'Tractors':
        return require('../assets/cat.tractor.jpg');
      case 'Harvesters':
        return require('../assets/cat.harvester.jpg');
      case 'Balers':
        return require('../assets/328 Small Square Baler.png');
      case 'Plows':
        return require('../assets/cat.plow.png');
      case 'Sprayers':
        return require('../assets/cat.sprayer.png');
      case 'Cultivators':
        return require('../assets/cat.Cultivators.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      {/* Selected Equipment Information */}
      <View style={styles.section}>
        <Image source={renderEquipmentImage()} style={styles.equipmentImage} />
        <Text style={styles.equipmentName}>{selectedCategory}</Text>
        {selectedType && <Text style={styles.equipmentType}>{selectedType}</Text>}
        <Text style={styles.costPerDay}>{costPerDay} / Day</Text>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Order Summary</Text>
        <Text style={styles.detailText}>Location: {location}</Text>
        <View style={styles.rentalDurationContainer}>
          <Text style={styles.detailText}>Duration:</Text>
          <Text style={styles.durationValue}>{rentalDuration} Day(s)</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setRentalDuration(rentalDuration + 1)}
          >
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setRentalDuration(Math.max(rentalDuration - 1, 1))}
          >
            <Ionicons name="remove" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.totalCost}>Total Cost: ₵{calculateTotalCost()}</Text>
      </View>

      {/* User Information */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Hirer Info</Text>
        <Text style={styles.detailText}>Name: {hirerName}</Text>
        <Text style={styles.detailText}>Contact: {hirerContact}</Text>
        <Text style={styles.detailText}>Email: {hirerEmail}</Text>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Terms & Conditions</Text>
        <Text style={styles.termsText}>
          By confirming this order, you agree to abide by the terms and conditions of the rental service.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEditDetails}>
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  section: {
    marginBottom: 20,
  },
  equipmentImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  equipmentName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  equipmentType: {
    fontSize: 18,
    color: 'gray',
    marginTop: 4,
  },
  costPerDay: {
    fontSize: 18,
    color: '#3d9d75',
    marginTop: 4,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  rentalDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationValue: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  totalCost: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#3d9d75',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    flex: 1,
  },
  editButtonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderDetails;