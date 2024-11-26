import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Course } from '@/api/models';
import apiClient from '@/api/apiClient';

const CourseListScreen = ({ navigation }: any) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await apiClient.get('/course');
      setCourses(response.data);
    } catch (err) {
        setError('Failed to fetch students');
      console.error("Error Axios:", err);
    }finally {
        setLoading(false);
      }
  };


  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/course/${id}`);
      fetchCourses(); // Refrescar lista
      Alert.alert('Curso eliminado', 'El curso se ha eliminado correctamente.');
    } catch (error) {
      console.error('Error deleting course:', error);
      Alert.alert('Error', 'No se pudo eliminar el curso.');
    }
  };

  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.name}</Text>
      <Text>{item.code}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('EditCourseScreen', { courseId: item.id })}  // Pasar solo el ID
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('CourseDetailsScreen', { courseId: item.id })}  // Pasar solo el ID
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  const handleCreateCourse = () => {
    navigation.navigate('CreateCourseScreen'); // Navegar a la pantalla de creación de curso
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Cursos</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Botón flotante para crear curso */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateCourse}>
        <Text style={styles.fabText}>+</Text>
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
  card: {
    backgroundColor: '#F4F4F4',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#004A8F',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
  },
  // Estilos del botón flotante (FAB)
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#004A8F',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default CourseListScreen;
