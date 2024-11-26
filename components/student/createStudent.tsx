// src/screens/Films/CreateScreen.tsx
import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import apiClient from '@/api/apiClient';
import { Student } from '@/api/models';

const CreateStudent = ({ navigation }: any) => {
  const [student, setStudent] = useState<Student>({
    id: 0, // Puedes manejar el ID en el backend
    name: '',
    dni: '',
    career: '',
    cycle: ''
  });

  const handleCreate = async () => {
    try {
      await apiClient.post('/student', student);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nombres"
        value={student.name}
        onChangeText={text => setStudent({ ...student, name: text })}
      />
      <TextInput
        placeholder="Cedula"
        value={student.dni}
        onChangeText={text => setStudent({ ...student, dni: text })}
      />
      <TextInput
        placeholder="Carrera"
        value={student.career}
        onChangeText={text => setStudent({ ...student, career: text })}
      />
      <TextInput
        placeholder="Ciclo"
        value={student.cycle}
        onChangeText={text => setStudent({ ...student, cycle: text })}
      />
      {/* Agrega más campos según sea necesario */}
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
};

export default CreateStudent;
