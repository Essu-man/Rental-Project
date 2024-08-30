import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const OrderDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedCategory, selectedType } = route.params || {};

  const hirerName = 'John Doe';
  const hirerContact = '0551234567';
  const hirerEmail = 'johndoe@example.com';
  const location = 'Accra, Ghana';
  
  const categoryCostMap = {
    'Tractors': '₵120',
    'Harvesters': '₵150',
    'Balers': '₵100',
    'Plows': '₵80',
    'Sprayers': '₵90',
    'Cultivators': '₵110',
  };
  
  const costPerDay = categoryCostMap[selectedCategory] || '₵0';
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  const calculateDuration = () => {
    if (returnDate && startDate) {
      const diffTime = Math.abs(returnDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1; 
    }
    return 1;
  };

  const calculateTotalCost = () => {
    return calculateDuration() * parseInt(costPerDay.replace('₵', ''), 10);
  };

  const handleConfirmOrder = () => {
    navigation.navigate('Pickup', {
      selectedCategory,
      selectedType,
      totalCost: calculateTotalCost(),
      location,
      hirerName,
      hirerContact,
      hirerEmail,
      startDate: startDate.toISOString(),
      returnDate: returnDate.toISOString(),
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

  const onDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || new Date();

    if (type === 'start') {
      setShowStartDatePicker(false);
      if (returnDate && currentDate > returnDate) {
      
        setReturnDate(currentDate);
      }
      setStartDate(currentDate);
    } else {
      setShowReturnDatePicker(false);
      if (currentDate < startDate) {
      
        setReturnDate(startDate);
      } else {
        setReturnDate(currentDate);
      }
    }
  };

  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No category selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      {/* Equipment Info */}
      <View style={styles.card}>
        <View style={styles.equipmentInfo}>
          <Image source={renderEquipmentImage()} style={styles.equipmentImage} />
          <View style={styles.equipmentDetails}>
            <Text style={styles.equipmentName}>{selectedCategory}</Text>
            {selectedType && <Text style={styles.equipmentType}>{selectedType}</Text>}
            <Text style={styles.costPerDay}>{costPerDay} / Day</Text>
          </View>
        </View>
      </View>

      {/* Date Pickers */}
      <View style={styles.card}>
        <Text style={styles.subHeader}>Select Dates</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.datePickerText}>Start Date: {startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, date) => onDateChange(event, date, 'start')}
          />
        )}
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowReturnDatePicker(true)}
        >
          <Text style={styles.datePickerText}>Return Date: {returnDate.toDateString()}</Text>
        </TouchableOpacity>
        {showReturnDatePicker && (
          <DateTimePicker
            value={returnDate}
            mode="date"
            display="default"
            onChange={(event, date) => onDateChange(event, date, 'return')}
          />
        )}
      </View>

      {/* Order Summary */}
      <View style={styles.card}>
        <Text style={styles.subHeader}>Order Summary</Text>
        <Text style={styles.detailText}>Location: {location}</Text>
        <View style={styles.rentalDurationContainer}>
          <Text style={styles.detailText}>Duration:</Text>
          <Text style={styles.durationValue}>{calculateDuration()} Day(s)</Text>
        </View>
        <Text style={styles.totalCost}>Total Cost: ₵{calculateTotalCost()}</Text>
      </View>

      {/* User Information */}
      <View style={styles.card}>
        <Text style={styles.subHeader}>Hirer Info</Text>
        <Text style={styles.detailText}>Name: {hirerName}</Text>
        <Text style={styles.detailText}>Contact: {hirerContact}</Text>
        <Text style={styles.detailText}>Email: {hirerEmail}</Text>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.card}>
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
    backgroundColor: '#f0f0f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  equipmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  equipmentDetails: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  equipmentType: {
    fontSize: 18,
    color: '#555',
  },
  costPerDay: {
    fontSize: 18,
    color: '#3d9d75',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  datePickerButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  rentalDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationValue: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#333',
  },
  totalCost: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3d9d75',
  },
  termsText: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#3d9d75',
    padding: 16,
    borderRadius: 8,
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
    padding: 16,
    borderRadius: 8,
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
