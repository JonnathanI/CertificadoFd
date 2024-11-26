// src/screens/CreateCourseScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Course } from '@/api/models';
import apiClient from '@/api/apiClient';

const CreateCourseScreen = ({ navigation }: any) => {
  const [course, setCourse] = useState<Course>({
    id: 0,
    name: '',
    link: '',
    code: '',
    aim: '',
    contents:'',
    studentId: 0

  });
  

  const handleCreate = async () => {
    try {
        await apiClient.post('/course', course)
      navigation.goBack();
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Curso</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={course.name}
        onChangeText={text => setCourse({ ...course, name: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={course.link}
        onChangeText={text => setCourse({ ...course, link: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Codigo"
        value={course.code}
        onChangeText={text => setCourse({ ...course, code: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Objetivo"
        value={course.aim}
        onChangeText={text => setCourse({ ...course, aim: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Contenidos"
        value={course.contents}
        onChangeText={text => setCourse({ ...course, contents:text})}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#004A8F',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CreateCourseScreen;
