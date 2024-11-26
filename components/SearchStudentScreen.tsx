import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import apiClient from '@/api/apiClient'; // Make sure apiClient is correctly configured
import { Student, Course } from '@/api/models';

const SearchStudentScreen = ({ navigation }: any) => {
  const [dni, setDni] = useState('');
  const [studentData, setStudentData] = useState<{ student: Student; courses: Course[] } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleSearch = async () => {
    try {
      const response = await apiClient.get(`/student/student-details/${dni}`);
      if (response.data) {
        setStudentData(response.data);
        setDni(''); // Clear search field
      } else {
        Alert.alert('Error', 'Student not found.');
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      Alert.alert('Error', 'There was a problem searching for the student.');
    }
  };

  const handleViewCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setModalVisible(true); // Open modal with course details
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close modal
    setSelectedCourse(null); // Clear selected course
  };

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to login screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Screen Title */}
        <Text style={styles.title}>Search Certificate</Text>

        {/* Login Icon above the search bar */}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <MaterialIcons name="login" size={30} color="blue" />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search by DNI"
            value={dni}
            onChangeText={setDni}
          />
          <TouchableOpacity onPress={handleSearch}>
            <MaterialIcons name="search" size={30} color="blue" />
          </TouchableOpacity>
        </View>

        {/* Search Results */}
        {studentData && (
          <View style={styles.resultBox}>
            <View style={styles.studentBox}>
              <Text style={styles.header}>Student: {studentData.student.name}</Text>
              <Text>DNI: {studentData.student.dni}</Text>
              <Text>Role: {studentData.student.rol}</Text>
            </View>

            <View style={styles.coursesContainer}>
              <Text style={styles.coursesHeader}>Related Courses:</Text>
              {studentData.courses.map((course) => (
                <View key={course.id} style={styles.courseBox}>
                  <Text style={styles.courseTitle}>{course.name}</Text>
                  <Text>{course.aim}</Text>
                  <View style={styles.courseActions}>
                    <TouchableOpacity onPress={() => handleViewCourseDetails(course)}>
                      <MaterialIcons name="info" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <MaterialIcons name="cloud-download" size={24} color="green" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Modal to show course details */}
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Course Details</Text>
              {selectedCourse && studentData && (
                <>
                  <Text style={styles.modalText}>Student: {studentData.student.name}</Text>
                  <Text style={styles.modalText}>DNI: {studentData.student.dni}</Text>
                  <Text style={styles.modalText}>Course: {selectedCourse.name}</Text>
                  <Text style={styles.modalText}>Code: {selectedCourse.code}</Text>
                  <Text style={styles.modalText}>Objective: {selectedCourse.aim}</Text>
                  <Text style={styles.modalText}>Content: {selectedCourse.contents}</Text>
                </>
              )}
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background
  },
  innerContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  resultBox: {
    marginTop: 20,
    width: '100%',
  },
  studentBox: {
    padding: 15,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coursesContainer: {
    marginTop: 20,
    width: '100%',
  },
  coursesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseBox: {
    marginBottom: 20,
    padding: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    width: '100%',
  },
  courseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  courseActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SearchStudentScreen;
