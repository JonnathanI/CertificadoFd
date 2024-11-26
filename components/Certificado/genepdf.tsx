// src/screens/GenerateCertificateScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import apiClient from '@/api/apiClient'; // Tu cliente axios

const GenerateCertificateScreen = () => {
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [hours, setHours] = useState('');

  const handleGenerateCertificate = async () => {
    if (!studentName || !courseName || !hours) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await apiClient.get(`/api/certificado/generate/${studentName}/${courseName}/${hours}`, {
  responseType: 'arraybuffer', // Especifica que esperamos un archivo binario
});

      // Crea un Blob a partir de la respuesta del PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      // Abre el PDF en una nueva pestaña del navegador o lo puedes guardar usando la librería que prefieras
      window.open(url);

    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el certificado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar Certificado</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Estudiante"
        value={studentName}
        onChangeText={setStudentName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del Curso"
        value={courseName}
        onChangeText={setCourseName}
      />

      <TextInput
        style={styles.input}
        placeholder="Horas"
        keyboardType="numeric"
        value={hours}
        onChangeText={setHours}
      />

      <Button title="Generar Certificado" onPress={handleGenerateCertificate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    borderRadius: 4,
  },
});

export default GenerateCertificateScreen;