import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  const handleAddRoom = () => {
    // Handle Add Room button press
    // Add your navigation logic here
  };


  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuButton} onPress={handleAddRoom}>
        <Text style={styles.menuButtonText}>Add Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  menuButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Menu;
