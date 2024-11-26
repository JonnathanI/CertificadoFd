// src/screens/Films/EditScreen.tsx
import React, { useEffect, useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import apiClient from '@/api/apiClient';
import { Student } from '@/api/models';

const EditStudent = ({ route, navigation }: any) => {
  const [student, setStudent] = useState<Student>(route.params.student);

  const handleSave = async () => {
    try {
      await apiClient.put(`/student/${student.id}`, student);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nombres y Apellidos"
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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EditStudent;
