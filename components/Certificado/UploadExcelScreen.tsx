import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const UploadExcelScreen = () => {
  const [fileUri, setFileUri] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Solo archivos Excel
      });

      if (result.uri) {
        // Si el resultado tiene URI, es un resultado exitoso
        setFileUri(result.uri);
      } else {
        Alert.alert('Error', 'No se seleccionó ningún archivo o la selección fue cancelada');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al seleccionar el archivo');
    }
  };

  const uploadFile = async () => {
    if (!fileUri) {
      Alert.alert('Error', 'Por favor selecciona un archivo antes de subir');
      return;
    }

    try {
      // Obtener el archivo como Blob desde la URI
      const response = await fetch(fileUri);
      const blob = await response.blob(); // Convertir el archivo en un Blob

      const formData = new FormData();
      formData.append('file', blob, 'archivo.xlsx'); // Adjuntar el Blob con el nombre del archivo

      // Subir el archivo usando Axios
      const responseAxios = await axios.post('http://localhost:8080/import/excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Éxito', 'Datos importados correctamente');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al subir el archivo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir archivo Excel</Text>

      <Button title="Seleccionar archivo" onPress={pickDocument} />
      {fileUri && <Text style={styles.fileText}>Archivo seleccionado: {fileUri}</Text>}

      <Button title="Subir archivo" onPress={uploadFile} disabled={!fileUri} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default UploadExcelScreen;
