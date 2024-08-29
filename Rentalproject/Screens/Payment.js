import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Payment = ({ navigation }) => {

  const handlePaymentComplete = () => {
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Screen</Text>
      <Text style={styles.details}>Here you can handle payment and show booking details.</Text>
      <TouchableOpacity style={styles.completeButton} onPress={handlePaymentComplete}>
        <Text style={styles.completeButtonText}>Complete Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginBottom: 20,
  },
  completeButton: {
    backgroundColor: '#5AE4A8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Payment;
