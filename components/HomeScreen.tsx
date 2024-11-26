import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; // Ajusta la ruta si es necesario
import apiClient from '@/api/apiClient';
import { Course, Student } from '@/api/models';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [studentDni, setStudentDni] = useState('');
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [courseCode, setCourseCode] = useState('');
  const [courseResults, setCourseResults] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStudentSearch = async () => {
    if (!studentDni) {
      Alert.alert("Campo vacío", "Por favor ingresa el DNI del estudiante.");
      return;
    }

    try {
      const response = await apiClient.get(`/student/dni/${studentDni}`);
      setStudentData(response.data);
      setStudentDni('');
    } catch (error) {
      console.error("Error fetching student:", error);
      Alert.alert("Estudiante no encontrado", "Verifica el DNI e inténtalo nuevamente.");
      setStudentData(null);
      setCourseResults([]);
    }
  };

  const handleCourseSearch = async () => {
    if (!courseCode || !studentData) {
      Alert.alert("Campos vacíos", "Por favor ingresa el código de curso y asegúrate de haber buscado un estudiante.");
      return;
    }

    try {
      const response = await apiClient.get(`/student/courses/${studentData.dni}?courseCode=${courseCode}`);
      setCourseResults(response.data);
      setCourseCode('');
    } catch (error) {
      console.error("Error fetching courses:", error);
      Alert.alert("No encontrado", "No se encontraron cursos. Verifica el código de curso.");
      setCourseResults([]);
    }
  };

  const handleViewCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCourse(null);
  };

  const handleDownloadDocument = (course: Course) => {
    Alert.alert("Descargar Documento", `Descargando el documento para el curso: ${course.name}`);
  };

  return (
    <View style={styles.container}>
      {/* Contenedor para el botón de login en la parte superior derecha */}
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Icon name="login" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Buscar Cursos</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por DNI de estudiante"
          value={studentDni}
          onChangeText={setStudentDni}
        />
        <TouchableOpacity onPress={handleStudentSearch}>
          <Icon name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {studentData && (
        <View style={styles.studentData}>
          <Text style={styles.dataText}>Nombre: {studentData.name}</Text>
          <Text style={styles.dataText}>DNI: {studentData.dni}</Text>
        </View>
      )}

      {studentData && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por código de curso"
            value={courseCode}
            onChangeText={setCourseCode}
          />
          <TouchableOpacity onPress={handleCourseSearch}>
            <Icon name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      )}

      {courseResults.length > 0 ? (
        <FlatList
          data={courseResults}
          keyExtractor={(item) => item.id?.toString() || ''}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <Text style={styles.courseText}>{item.name}</Text>
              <Text>{item.code}</Text>
              <Text>{item.aim}</Text>

              <View style={styles.courseActions}>
                <TouchableOpacity onPress={() => handleViewCourseDetails(item)}>
                  <Icon name="visibility" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDownloadDocument(item)}>
                  <Icon name="file-download" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.notFoundText}>No se encontraron cursos.</Text>
      )}

      {/* Modal para mostrar los detalles del curso */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del Curso</Text>
            {selectedCourse && studentData && (
              <>
                <Text style={styles.modalText}>Estudiante: {studentData.name}</Text>
                <Text style={styles.modalText}>DNI: {studentData.dni}</Text>
                <Text style={styles.modalText}>Curso: {selectedCourse.name}</Text>
                <Text style={styles.modalText}>Código: {selectedCourse.code}</Text>
                <Text style={styles.modalText}>Objetivo: {selectedCourse.aim}</Text>
                <Text style={styles.modalText}>Contenido: {selectedCourse.contents}</Text>
              </>
            )}
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  loginButtonContainer: {
    alignItems: 'flex-end',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  studentData: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
  },
  courseItem: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  courseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  notFoundText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
