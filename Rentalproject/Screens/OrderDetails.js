import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategory, selectedType, baseCostPerDay = 0, location, imageUrl } = route.params;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      const numberOfDays = end.diff(start, 'days') + 1; 
      const newTotalCost = numberOfDays * baseCostPerDay;
      setTotalCost(newTotalCost.toFixed(2));
    }
  }, [startDate, endDate, baseCostPerDay]);

  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || new Date();
    if (type === 'start') {
      setShowStartPicker(Platform.OS === 'ios');
      setStartDate(moment(currentDate).format('YYYY-MM-DD'));
    } else if (type === 'end') {
      setShowEndPicker(Platform.OS === 'ios');
      setEndDate(moment(currentDate).format('YYYY-MM-DD'));
    }
  };

  const handleConfirmOrderPress = () => {
    if (startDate && endDate) {
      alert(`Order confirmed!\nStart Date: ${formatDate(startDate)}\nEnd Date: ${formatDate(endDate)}`);
    } else {
      Alert.alert('Error', 'Please select both start and end dates.');
    }
  };

  const formatDate = (date) => {
    return moment(date).format('D MMMM YYYY');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.orderSummaryTitle}>Order Summary</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Selected Equipment</Text>
        <View style={styles.equipmentContainer}>
          <Image source={{ uri: imageUrl }} style={styles.equipmentImage} />
          <View style={styles.equipmentInfo}>
            <Text style={styles.detailText}>{selectedCategory} - {selectedType}</Text>
            <Text style={styles.equipmentCost}>Cost: {baseCostPerDay} GHS per day</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.detailText}>{location}</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Select Start Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dateText}>{startDate ? formatDate(startDate) : 'Select Start Date'}</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Select End Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dateText}>{endDate ? formatDate(endDate) : 'Select End Date'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.selectedDatesContainer}>
        <Text style={styles.sectionTitle}>Selected Dates</Text>
        <Text style={styles.dateRangeText}>{startDate ? `Start Date: ${formatDate(startDate)}` : 'Start Date: Not selected'}</Text>
        <Text style={styles.dateRangeText}>{endDate ? `End Date: ${formatDate(endDate)}` : 'End Date: Not selected'}</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Total Cost</Text>
        <Text style={styles.detailText}>{totalCost} GHS</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EquipmentDetails')}>
        <Text style={styles.editButtonText}>Edit Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrderPress}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          testID="startDatePicker"
          value={new Date(startDate || Date.now())}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'start')}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          testID="endDatePicker"
          value={new Date(endDate || Date.now())}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'end')}
        />
      )}
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
  equipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentImage: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    marginRight: 15,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentCost: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  dateButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDatesContainer: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00acc1',
  },
  dateRangeText: {
    fontSize: 14,
    color: '#00796b',
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
