// src/screens/StudentDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import apiClient from '@/api/apiClient';
import { Student } from '@/api/models';

const StudentDetailsScreen = ({ route }: any) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const { studentId } = route.params;
        const response = await apiClient.get(`/student/${studentId}`);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to fetch student details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentDetails();
  }, [route.params]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!student) {
    return <Text style={styles.errorText}>Student not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.studentName}>Name: {student.name}</Text>
      <Text style={styles.studentDetail}>DNI: {student.dni}</Text>
      <Text style={styles.studentDetail}>Career: {student.career}</Text>
      <Text style={styles.studentDetail}>Cycle: {student.cycle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  studentDetail: {
    fontSize: 18,
    marginVertical: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default StudentDetailsScreen;
