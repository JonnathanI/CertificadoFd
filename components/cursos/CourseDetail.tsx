import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import apiClient from '@/api/apiClient';
import { Course } from '@/api/models';

const CourseDetailsScreen = ({ route }: any) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCourseDetails = async () => {
        try {
          const { courseId } = route.params;
          const response = await apiClient.get(`/course/${courseId}`);
          setCourse(response.data);
        } catch (err) {
          setError('Failed to fetch student details');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCourseDetails();
    }, [route.params]);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
  
    if (!course) {
      return <Text style={styles.errorText}>Course not found</Text>;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.studentName}>Name: {course.name}</Text>
        <Text style={styles.studentDetail}>DNI: {course.link}</Text>
        <Text style={styles.studentDetail}>Career: {course.code}</Text>
        <Text style={styles.studentDetail}>Cycle: {course.aim}</Text>
        <Text style={styles.studentDetail}>Cycle: {course.contents}</Text>
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

  export default CourseDetailsScreen;