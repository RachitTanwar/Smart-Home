import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';

const AddRoom = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [roomName, setRoomName] = useState('');
  const [numberOfDevices, setNumberOfDevices] = useState(0);
  const [deviceNames, setDeviceNames] = useState([]);
  const [editedDeviceName, setEditedDeviceName] = useState('');

  const addDevice = () => {
    setNumberOfDevices(numberOfDevices + 1);
    setDeviceNames([...deviceNames, 'Device ' + (numberOfDevices + 1)]);
  };

  const createRoomTable = async () => {
    // Make an API call to the server to create a new table in the MySQL database
    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName,
        }),
      });
      if (response.ok) {
        console.log('Table created successfully');
        // Perform any additional actions or navigation here
      } else {
        console.log('Failed to create table');
      }
    } catch (error) {
      console.log('Error creating table:', error);
    }
  };

  const handleDone = () => {
    createRoomTable();
    // Add your logic here for handling the "Done" button press
    // For example, you can navigate to another screen or perform other actions
  };

  const handleEditDeviceName = (index) => {
    const updatedDeviceNames = [...deviceNames];
    updatedDeviceNames[index] = editedDeviceName;
    setDeviceNames(updatedDeviceNames);
    setEditedDeviceName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Room Name"
        value={roomName}
        onChangeText={setRoomName}
      />
      <Text style={styles.text}>Number of Devices: {numberOfDevices}</Text>
      <TouchableOpacity style={styles.button} onPress={addDevice}>
        <Text style={styles.buttonText}>Add Device</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Device Names:</Text>
      {deviceNames.map((deviceName, index) => (
        <View key={index} style={styles.deviceRow}>
          <TextInput
            style={styles.deviceInput}
            value={editedDeviceName}
            onChangeText={setEditedDeviceName}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditDeviceName(index)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.deviceName}>{deviceName}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  deviceInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButtonText  : {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deviceName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  doneButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddRoom;

