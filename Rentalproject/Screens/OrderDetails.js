import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';   
import { Calendar } from 'react-native-calendars';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategory, selectedType, baseCostPerDay = 0, location } = route.params;

  // State for selected dates and total cost
  const [selectedDates, setSelectedDates] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  // Validate baseCostPerDay
  useEffect(() => {
    if (typeof baseCostPerDay !== 'number' || isNaN(baseCostPerDay)) {
      console.error('Invalid baseCostPerDay:', baseCostPerDay);
      setTotalCost(0);
    }
  }, [baseCostPerDay]);

  // Update total cost based on selected dates
  const updateTotalCost = (newSelectedDates) => {
    const numberOfDays = Object.keys(newSelectedDates).length;
    const newTotalCost = numberOfDays * baseCostPerDay;
    setTotalCost(newTotalCost.toFixed(2)); // Update total cost with 2 decimal places
  };

  // Handle date selection
  const handleDayPress = (day) => {
    const newSelectedDates = { ...selectedDates };
    if (newSelectedDates[day.dateString]) {
      // If the date is already selected, deselect it
      delete newSelectedDates[day.dateString];
    } else {
      // Otherwise, select the date
      newSelectedDates[day.dateString] = { selected: true, marked: true };
    }
    setSelectedDates(newSelectedDates);
    updateTotalCost(newSelectedDates);
  };

  // Navigate to edit details
  const handleEditDetailsPress = () => {
    navigation.navigate('EquipmentDetails');
  };

  // Confirm the order
  const handleConfirmOrderPress = () => {
    alert('Order confirmed!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.orderSummaryTitle}>Order Summary</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Selected Equipment</Text>
        <Text style={styles.detailText}>{selectedCategory} - {selectedType}</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.detailText}>{location}</Text>
      </View>

      {/* Calendar for selecting rental dates */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Select Rental Dates</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={selectedDates}
          markingType={'multi-dot'}
        />
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Total Cost</Text>
        <Text style={styles.detailText}>{totalCost} GHS</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditDetailsPress}>
        <Text style={styles.editButtonText}>Edit Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrderPress}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
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
  backButton: {
    position: 'absolute',
    left: -15,
    top: 0,
    padding: 15,
    zIndex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  orderSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
  },
  orderDetailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#3d9d75',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetails;