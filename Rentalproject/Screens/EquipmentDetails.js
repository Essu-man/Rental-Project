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
        cost: getCategoryCost(),
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
      {/* Back Arrow */}
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

      {/* New section for Cost and Location */}
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
    marginTop: 25,
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  equipmentImage: {
    width: 350,
    height: 180,
    borderRadius: 15,
  },
  hirerInfoCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  hirerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 8,
    marginLeft: 10,
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  section: {
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryContainer: {
    paddingLeft: 5,
  },
  categoryBox: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryBox: {
    backgroundColor: '#3d9d75',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  typeContainer: {
    paddingLeft: 5,
  },
  typeBox: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTypeBox: {
    backgroundColor: '#3d9d75',
  },
  typeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTypeText: {
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#3d9d75',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EquipmentDetails;
