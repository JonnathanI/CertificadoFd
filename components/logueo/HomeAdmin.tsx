import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeAdmin = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername); // Guardamos el nombre del usuario
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {username || 'Administrador'}</Text> {/* Muestra el nombre del usuario */}
      <Text style={styles.subtitle}>Selecciona una opción</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ListStudent')}
        >
          <Icon name="person" size={50} color="#004A8F" />
          <Text style={styles.cardText}>Estudiantes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CourseListScreen')}
        >
          <Icon name="school" size={50} color="#004A8F" />
          <Text style={styles.cardText}>Cursos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ListTrainer')}
        >
          <Icon name="group" size={50} color="#004A8F" />
          <Text style={styles.cardText}>Entrenadores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('GenerateCertificateScreen')}
        >
          <Icon name="assignment" size={50} color="#004A8F" />
          <Text style={styles.cardText}>Certificados</Text>
        </TouchableOpacity>

        {/* Nueva opción para subir archivo Excel */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('UploadExcelScreen')} // Navegar a la pantalla de carga de Excel
        >
          <Icon name="cloud-upload" size={50} color="#004A8F" />
          <Text style={styles.cardText}>Subir Excel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004A8F',
  },
  subtitle: {
    fontSize: 20,
    color: '#4D4D4D',
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#F4F4F4',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#004A8F',
    marginTop: 10,
  },
});

export default HomeAdmin;
