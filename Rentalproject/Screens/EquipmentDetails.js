import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BalerImage from '../assets/328 Small Square Baler.png';
import CultivatorImage from '../assets/cat.Cultivators.png';
import HarvesterImage from '../assets/cat.harvester.jpg';
import PlowImage from '../assets/cat.plow.png';
import SprayerImage from '../assets/cat.sprayer.png';
import TractorImage from '../assets/cat.tractor.jpg';

const equipmentCategories = [
  { id: '1', name: 'Tractors', cost: '₵120/Day' },
  { id: '2', name: 'Harvesters', cost: '₵150/Day' },
  { id: '3', name: 'Balers', cost: '₵140/Day' },
  { id: '4', name: 'Plows', cost: '₵110/Day' },
  { id: '5', name: 'Sprayers', cost: '₵130/Day' },
  { id: '6', name: 'Cultivators', cost: '₵100/Day' },
];

const equipmentTypes = {
  Tractors: ['Utility Tractor', 'Raw Crop Tractor', 'Compact Tractor'],
  Harvesters: ['Combine Harvester', 'Forage Harvester'],
  Balers: ['Round Baler', 'Square Baler', 'Silage Baler'],
  Plows: ['MoldBoard Plow', 'Disc Plow', 'Chisel Plow'],
  Sprayers: ['Boom Sprayer', 'Mist Sprayer', 'Air Blast Sprayer'],
  Cultivators: ['Field Cultivator', 'Row Crop Cultivator', 'Rotary Cultivator'],
};

const EquipmentDetails = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedType(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleContactPress = () => {
    alert('Contact: +233 555 555 555');
  };

  const handleEmailPress = () => {
    alert('Email: johndoe@gmail.com');
  };

  const handleBookNowPress = () => {
    if (selectedCategory && selectedType) {
      navigation.navigate('OrderDetails', {
        selectedCategory,
        selectedType,
        baseCostPerDay: parseFloat(getCategoryCost().replace(/₵|\/Day/g, '')),
        location: 'Accra, Ghana',
      });
    } else {
      alert('Please select both a category and type.');
    }
  };

  const renderEquipmentImage = () => {
    switch (selectedCategory) {
      case 'Tractors':
        return <Image source={TractorImage} style={styles.equipmentImage} />;
      case 'Harvesters':
        return <Image source={HarvesterImage} style={styles.equipmentImage} />;
      case 'Balers':
        return <Image source={BalerImage} style={styles.equipmentImage} />;
      case 'Plows':
        return <Image source={PlowImage} style={styles.equipmentImage} />;
      case 'Sprayers':
        return <Image source={SprayerImage} style={styles.equipmentImage} />;
      case 'Cultivators':
        return <Image source={CultivatorImage} style={styles.equipmentImage} />;
      default:
        return null;
    }
  };

  const getCategoryCost = () => {
    const category = equipmentCategories.find(cat => cat.name === selectedCategory);
    return category ? category.cost : '₵0/Day';
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.orderSummaryTitle}>Equipment Details</Text>
      </View>

      {selectedCategory && (
        <View style={styles.imageContainer}>
          {renderEquipmentImage()}
        </View>
      )}

      <View style={styles.hirerInfoCard}>
        <View style={styles.hirerInfo}>
          <Text style={styles.hirerName}>John Doe</Text>
          <View style={styles.contactActions}>
            <TouchableOpacity onPress={handleContactPress} style={styles.contactButton}>
              <Ionicons name="call" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEmailPress} style={styles.contactButton}>
              <Ionicons name="mail" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.infoRowContainer}>
  <View style={styles.infoCard}>
    <Ionicons name="cash" size={24} color="#3d9d75" style={styles.icon} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoTitle}>Cost</Text>
      <Text style={styles.infoText}>{getCategoryCost()}</Text>
    </View>
  </View>
  <View style={styles.infoCard}>
    <Ionicons name="location" size={24} color="#3d9d75" style={styles.icon} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoTitle}>Location</Text>
      <Text style={styles.infoText}>Accra, Ghana</Text>
    </View>
  </View>
</View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Category</Text>
        <FlatList
          data={equipmentCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryBox,
                selectedCategory === item.name && styles.selectedCategoryBox,
              ]}
              onPress={() => handleCategorySelect(item.name)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.name && styles.selectedCategoryText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryContainer}
        />
      </View>

      {selectedCategory && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Type</Text>
          <FlatList
            data={equipmentTypes[selectedCategory]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.typeBox,
                  selectedType === item && styles.selectedTypeBox,
                ]}
                onPress={() => handleTypeSelect(item)}
              >
                <Text
                  style={[
                    styles.typeText,
                    selectedType === item && styles.selectedTypeText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.typeContainer}
          />
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Tool Info</Text>
            <Text style={styles.infoText}>
              This tool is essential for ensuring smooth operations in the field, offering reliability and efficiency.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.infoCard}>
          <Ionicons name="document-text" size={24} color="#3d9d75" style={styles.icon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Terms & Conditions</Text>
            <Text style={styles.infoText}>
              By booking this equipment, you agree to our terms and conditions. Ensure proper handling and timely return to avoid penalties.
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookNowPress}>
        <Text style={styles.bookButtonText}>Book Now</Text>
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
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  equipmentImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
  hirerInfoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },
  hirerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hirerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactActions: {
    flexDirection: 'row',
  },
  contactButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },

  section: {
    marginBottom: 20,
  },
  categoryContainer: {
    flexGrow: 1,
  },
  categoryBox: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryBox: {
    backgroundColor: '#3d9d75',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  typeContainer: {
    flexGrow: 1,
  },
  typeBox: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTypeBox: {
    backgroundColor: '#3d9d75',
  },
  typeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTypeText: {
    color: '#FFF',
  },
  bookButton: {
    backgroundColor: '#3d9d75',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EquipmentDetails;
