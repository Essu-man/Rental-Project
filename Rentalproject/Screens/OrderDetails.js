import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

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
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // Default to 'pickup'
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState(location);
  const [additionalCost, setAdditionalCost] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      const numberOfDays = end.diff(start, 'days') + 1;
      const newTotalCost = numberOfDays * baseCostPerDay + parseFloat(additionalCost);
      setTotalCost(newTotalCost.toFixed(2));
    }
  }, [startDate, endDate, baseCostPerDay, additionalCost]);

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
      if (deliveryOption === 'delivery' && !deliveryAddress) {
        Alert.alert('Error', 'Please enter a delivery address.');
        return;
      }
      navigation.navigate('OrderConfirmation', {
        selectedCategory,
        selectedType,
        baseCostPerDay,
        startDate,
        endDate,
        totalCost,
        location: deliveryOption === 'pickup' ? pickupLocation : deliveryAddress,
        deliveryOption,
      });
    } else {
      Alert.alert('Error', 'Please select both start and end dates.');
    }
  };

  const formatDate = (date) => moment(date).format('D MMMM YYYY');

  const equipmentImageUri = selectedType && typeImages[selectedType]
    ? typeImages[selectedType]
    : images[selectedCategory] || 'https://example.com/default-image.png';

  return (
    <ScrollView style={styles.container}>
      {/* Back Button and Header */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.orderSummaryTitle}>Order Summary</Text>
      </View>

      {/* Selected Equipment Section */}
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

      {/* Location Section */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={20} color="#FF6347" />
          <Text style={styles.locationText}>{pickupLocation}</Text>
        </View>
      </View>

      {/* Date Pickers */}
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

      {/* Pickup/Delivery Option Section */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Select Pickup or Delivery</Text>
        <Picker
          selectedValue={deliveryOption}
          style={styles.picker}
          onValueChange={(itemValue) => setDeliveryOption(itemValue)}
        >
          <Picker.Item label="Pickup" value="pickup" />
          <Picker.Item label="Delivery" value="delivery" />
        </Picker>

        {/* Delivery Address Input */}
        {deliveryOption === 'delivery' && (
          <View style={styles.deliveryContainer}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Delivery Address"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />
            {/* Additional cost for delivery */}
            <Text style={styles.additionalCost}>Additional Cost: 100 GHS</Text>
            <Text style={styles.additionalInfo}>Enter the delivery address for accurate cost calculation.</Text>
          </View>
        )}
      </View>

      {/* Selected Dates Overview */}
      <View style={styles.selectedDatesContainer}>
        <Text style={styles.sectionTitle}>Selected Dates</Text>
        <Text style={styles.dateRangeText}>{startDate ? `Start Date: ${formatDate(startDate)}` : 'Start Date: Not selected'}</Text>
        <Text style={styles.dateRangeText}>{endDate ? `End Date: ${formatDate(endDate)}` : 'End Date: Not selected'}</Text>
      </View>

      {/* Total Cost Section */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Total Cost</Text>
        <Text style={styles.detailText}>{totalCost} GHS</Text>
      </View>

      {/* Confirm Button */}
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
    marginRight: 10,
  },
  equipmentInfo: {
    flex: 1,
  },
  detailText: {
    fontSize: 16,
  },
  equipmentCost: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
  },
  dateButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 10,
  },
  deliveryContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  additionalCost: {
    fontSize: 16,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  additionalInfo: {
    fontSize: 14,
    color: '#888',
  },
  selectedDatesContainer: {
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
  dateRangeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderDetails;
