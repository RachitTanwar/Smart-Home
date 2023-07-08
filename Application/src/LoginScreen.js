import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post('http://172.19.18.19:3000/login', userData);

      // Assuming the server returns a success message or user object upon successful login
      if (response.data.success) {
        // Login successful, navigate to the home screen or perform any other actions
        navigation.navigate('Home');
      } else {
        // Login failed, display an error message or perform any other actions
        alert('Invalid credentials');
      }
    } catch (error) {
      // Handle any errors that occurred during the login process
      console.log('Error logging in:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/start_image.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity style={styles.showPasswordButton} onPress={togglePasswordVisibility}>
        <Text style={styles.showPasswordButtonText}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLinkText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 70,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  showPasswordButton: {
    marginBottom: 20,
  },
  showPasswordButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginBottom: 20,
  },
  registerLinkText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default LoginScreen;
