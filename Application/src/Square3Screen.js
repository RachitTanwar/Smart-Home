import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import axios from 'axios';

const Square1Screen = ({ navigation }) => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);
  const [switch4, setSwitch4] = useState(false);

  const handleSwitchToggle = (index, value, setValue) => {
    setValue(!value);

    const newValue = !value ? 'yes' : 'no';

    axios
      .post('http://172.19.18.19:3000/toggle-bath', { index, value: newValue })
      .then((response) => {
        console.log('API Response:', response.data);
      })
      .catch((error) => {
        console.error('API Error:', error);
        // If there's an error, revert the switch state back to the original value
        setValue(!value);
      });
  };

  useEffect(() => {
    const fetchToggleValues = async () => {
      try {
        const response = await axios.get('http://172.19.18.19:3000/toggle-values-bath');
        const data = response.data;

        setSwitch1(data.switch1 === 'yes');
        setSwitch2(data.switch2 === 'yes');
        setSwitch3(data.switch3 === 'yes');
        setSwitch4(data.switch4 === 'yes');
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchToggleValues();
  }, []);

  const renderSquare = (name, value, setValue) => {
    return (
      <View style={styles.square}>
        <Text style={styles.squareText}>{name}</Text>
        <Switch
          value={value}
          onValueChange={() => handleSwitchToggle(name, value, setValue)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.squareContainer}>
        {renderSquare('Fan', switch1, setSwitch1)}
        {renderSquare('Light', switch2, setSwitch2)}
        {renderSquare('AC', switch3, setSwitch3)}
        {renderSquare('TV', switch4, setSwitch4)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  squareContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 30,
  },
  squareText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Square1Screen;
