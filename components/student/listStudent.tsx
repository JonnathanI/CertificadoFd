import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import apiClient from '@/api/apiClient';
import { Student } from '@/api/models';

const ListStudent = ({ navigation }: any) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const navigateToStudentCourses = (student: Student) => {
    navigation.navigate('StudentCourses', { student });
  };

  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('/student');
      setStudents(response.data);
    } catch (err) {
      setError('Failed to fetch students');
      console.error("Error Axios:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await apiClient.delete(`/student/${id}`);
      fetchStudents(); // Refetch students after deletion
      Alert.alert("Deleted", "Student deleted successfully");
    } catch (err) {
      setError('Failed to delete student');
      console.error("Delete Error:", err);
    }
  };

  const renderStudent = ({ item }: { item: Student }) => (
    <View style={styles.studentContainer}>
      {/* Navega a los detalles del estudiante */}
      <TouchableOpacity onPress={() => navigation.navigate('StudentDetailsScreen', { studentId: item.id })}>
        <Text style={styles.studentName}>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        {/* Navega a la pantalla de edición del estudiante */}
        <TouchableOpacity onPress={() => navigation.navigate('EditStudent', { student: item })}>
          <Icon name="edit" size={24} color="#4CAF50" />
        </TouchableOpacity>
        {/* Elimina al estudiante */}
        <TouchableOpacity onPress={() => deleteStudent(item.id)}>
          <Icon name="delete" size={24} color="#F44336" />
        </TouchableOpacity>
        {/* Navega a la pantalla de cursos del estudiante */}
        <TouchableOpacity onPress={() => navigateToStudentCourses(item)}>
          <Icon name="school" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateStudent')}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 10,
  },
  studentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  studentName: {
    fontSize: 18,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default ListStudent;
