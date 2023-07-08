import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, FlatList } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [switches, setSwitches] = useState([]);

  const squares = [
    { name: 'Living Room', index: 'switch1' },
    { name: 'Bed Room', index: 'switch2' },
    { name: 'Bath Room', index: 'switch3' },
    { name: 'Kitchen', index: 'switch4' },
  ];

  useEffect(() => {
    // Fetch the toggle values from the server
    axios.get('http://localhost:3000/toggle-values-living')
      .then(response => {
        setSwitches(response.data);
      })
      .catch(error => {
        console.error('Error fetching toggle values:', error);
      });
  }, []);

  const handleProfile = () => {
    navigation.navigate('ProfileScreen');
  };
  const handleAddRoomPress = () => {
    navigation.navigate('AddRoom');
  };

  const handleSquarePress = (screenName) => {
    navigation.navigate(screenName);
  };

 // ...

// ...

const handleToggleSwitch = (index, value) => {
  const newValue = value ? 'no' : 'yes';

  let url;
  switch (index) {
    case 'switch1':
      url = 'http://172.19.18.19:3000/update-status-living';
      break;
    case 'switch2':
      url = 'http://172.19.18.19:3000/update-status-bed';
      break;
    case 'switch3':
      url = 'http://172.19.18.19:3000/update-status-bath';
      break;
    case 'switch4':
      url = 'http://172.19.18.19:3000/update-status-kitchen';
      break;
    default:
      return;
  }

  // Update the toggle value on the server
  axios.post(url, { index, value: newValue })
    .then(response => {
      console.log('Toggle updated:', response.data);
      // Update the local state
      const updatedSwitches = { ...switches };
      updatedSwitches[index] = newValue;
      setSwitches(updatedSwitches);
    })
    .catch(error => {
      console.error('Error updating toggle:', error);
    });
};

// ...


// ...

  const renderSquare = ({ item }) => {
    const { name, index } = item;
    const value = switches[index] === 'yes';

    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handleSquarePress(`Square${index.slice(-1)}Screen`)}
      >
        <Text style={styles.squareText}>{name}</Text>
        <Switch
          value={value}
          onValueChange={() => handleToggleSwitch(index, value)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.profileContainer} onPress={handleProfile}>
        <Image
          source={require('../assets/start_image.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity> */}
      <Text style={styles.welcomeText}>Welcome Home</Text>
      <FlatList
        data={squares}
        numColumns={2}
        renderItem={renderSquare}
        keyExtractor={(item) => item.index}
        contentContainerStyle={styles.squareContainer}
      />
      {/* <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={handleAddRoomPress}>
          <Text style={styles.menuButtonText}>Add Room</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop:     20,
  },
  squareContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  square: {
    width: 200,
    height: 200,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 30,
  },
  squareText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
    elevation: 5, // Add elevation for 3D effect (Android)
    shadowColor: '#000', // Add shadow for 3D effect (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
