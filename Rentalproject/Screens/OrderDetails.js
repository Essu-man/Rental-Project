import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const images = {
  Tractors: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.tractor.jpg?alt=media&token=3fa44470-5dd9-4fae-a844-9d284fdfe60a',
  Harvesters: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.harvester.jpg?alt=media&token=910c8753-097f-4e1f-b3c7-1d747180520c',
  Balers: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.Baler.png?alt=media&token=dcdfdfa2-643d-409b-a732-293b021698e1',
  Plows: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.plow.png?alt=media&token=b2484ed2-2769-435d-8226-b93eb0a812e9',
  Sprayers: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.sprayer.png?alt=media&token=846473e1-fabc-4e9f-9b59-7f6237e478cd',
  Cultivators: 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/cat.Cultivators.png?alt=media&token=a159b009-7bae-4dad-acdf-8a80126536a9',
};

const typeImages = {
  'Utility Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2Futility-tractor.png?alt=media&token=1dbb45b2-f99c-40ee-9f6d-707ec3da6d5b',
  'Raw Crop Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2FRaw-Crop-tractor.png?alt=media&token=6ec06ba2-324b-420a-a0a6-5250f377dcf9',
  'Compact Tractor': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Tractor%2FCompact-tractor.png?alt=media&token=a442ec56-2444-4734-8c7a-71e8a2c3c7f5',
  'Combine Harvester': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Harvester%2FCombine%20Harvester.png?alt=media&token=003fb05f-b58a-4b2f-ada5-6d7b700b924c',
  'Forage Harvester': 'https://firebasestorage.googleapis.com/v0/b/my-agrirent.appspot.com/o/Harvester%2FForage.png?alt=media&token=3450406f-25b3-4d75-a5ba-296b65df0544',
};

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategory, selectedType, baseCostPerDay = 0, location } = route.params;
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
      setShowStartPicker(false);
      setStartDate(moment(currentDate).format('YYYY-MM-DD'));
    } else if (type === 'end') {
      setShowEndPicker(false);
      setEndDate(moment(currentDate).format('YYYY-MM-DD'));
    }
  };

  const handleConfirmOrderPress = () => {
    if (startDate && endDate) {
      navigation.navigate('Pickup', {
        selectedCategory,
        selectedType,
        baseCostPerDay,
        startDate,
        endDate,
        totalCost,
        location,
      });
    } else {
      Alert.alert('Error', 'Please select both start and end dates.');
    }
  };

  const formatDate = (date) => {
    return moment(date).format('D MMMM YYYY');
  };

  const equipmentImageUri = selectedType && typeImages[selectedType]
    ? typeImages[selectedType]
    : images[selectedCategory] || 'https://example.com/default-image.png'; 

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
          <Image source={{ uri: equipmentImageUri }} style={styles.equipmentImage} />
          <View style={styles.equipmentInfo}>
            <Text style={styles.detailText}>{selectedCategory} - {selectedType}</Text>
            <Text style={styles.equipmentCost}>Cost: {baseCostPerDay} GHS per day</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={20} color="#FF6347" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Select Start Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dateText}>{startDate ? formatDate(startDate) : 'Select Start Date'}</Text>
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

        <Text style={styles.sectionTitle}>Select End Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dateText}>{endDate ? formatDate(endDate) : 'Select End Date'}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            testID="endDatePicker"
            value={new Date(endDate || Date.now())}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'end')}
          />
        )}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
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
    fontSize: 24,
    fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  equipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentImage: {
    width: 65,
    height: 60,
    borderRadius: 40,
    marginRight: 16,
  },
  equipmentInfo: {
    flex: 1,
  },
  detailText: {
    fontSize: 16,
  },
  equipmentCost: {
    fontSize: 16,
    marginTop: 8,
    color: '#00796b',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
  },
  dateButton: {
    padding: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
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
    padding: 12,
    backgroundColor: '#FFA500',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  editButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  confirmButton: {
    padding: 12,
    backgroundColor: '#3d9d75',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default OrderDetails;
