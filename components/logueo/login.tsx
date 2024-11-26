import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Importar correctamente el Picker

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // El rol por defecto es 'admin'

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/auth/login', {
        username,
        password,
        role, // Enviar el rol seleccionado
      });
      const { jwt } = response.data;
      await AsyncStorage.setItem('jwt', jwt);
      Alert.alert('Login Successful', 'You have successfully logged in!');
      
      // Navegar según el rol seleccionado
      if (role === 'admin') {
        navigation.navigate('HomeAdmin');
      } else if(role === 'train'){
        navigation.navigate('HomeDisertador'); // Cambia a la pantalla de Disertador
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/estudiar.jpg')} // Asegúrate de tener la imagen en la carpeta adecuada
      style={styles.container}
      imageStyle={styles.backgroundImage} // Para asegurar que la imagen cubra toda la pantalla
    >
      <View style={styles.loginBox}>
        <Text style={styles.title}>Instituto Tecnológico</Text>
        <Text style={styles.subtitle}>Iniciar sesión</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Selector para elegir entre Disertador y Administrador */}
        <View style={styles.roleSelectorContainer}>
          <Text style={styles.roleLabel}>Seleccionar Rol</Text>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue: string) => setRole(itemValue)} // Tipado explícito de itemValue
          >
            <Picker.Item label="Administrador" value="admin" />
            <Picker.Item label="Disertador" value="disertador" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  loginBox: {
    width: '85%',
    maxWidth: 450,
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco translúcido para que se vea la imagen
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004A8F',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: '#4D4D4D',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 60,
    backgroundColor: '#F4F4F4',
    borderColor: '#004A8F',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    color: '#333',
  },
  roleSelectorContainer: {
    marginBottom: 20,
    width: '100%',
  },
  roleLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#004A8F',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#004A8F',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default LoginScreen;
