import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/logueo/login';
import ListStudent from './components/student/listStudent';
import EditStudent from './components/student/editStudent';
import CreateStudent from './components/student/createStudent';
import StudentDetailsScreen from './components/student/StudentDetailsScreen';
import GenerateCertificateScreen from './components/Certificado/genepdf';
import HomeAdmin from './components/logueo/HomeAdmin';
import CourseListScreen from './components/cursos/CourseListScreen';
import CreateCourseScreen from './components/cursos/CreateCourseScreen';
import EditCourseScreen from './components/cursos/EditCourseScreen';
import CourseDetailsScreen from './components/cursos/CourseDetail';
import HomeDisertador from './components/logueo/HomeDisertador';
import StudentCourses from './components/Certificado/StudentCourses';
import SearchStudentScreen from './components/SearchStudentScreen';// Importa la nueva pantalla
import { RootStackParamList } from './navigation/types';
import UploadExcelScreen from './components/Certificado/UploadExcelScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SearchStudentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ListStudent" component={ListStudent} />
        <Stack.Screen name="EditStudent" component={EditStudent} />
        <Stack.Screen name="CreateStudent" component={CreateStudent} />
        <Stack.Screen name="GenerateCertificateScreen" component={GenerateCertificateScreen} />
        <Stack.Screen name="StudentDetailsScreen" component={StudentDetailsScreen} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="CourseListScreen" component={CourseListScreen} />
        <Stack.Screen name="CreateCourseScreen" component={CreateCourseScreen} />
        <Stack.Screen name="EditCourseScreen" component={EditCourseScreen} />
        <Stack.Screen name="CourseDetailsScreen" component={CourseDetailsScreen} />
        <Stack.Screen name="HomeDisertador" component={HomeDisertador} />
        <Stack.Screen name="StudentCourses" component={StudentCourses} />
        <Stack.Screen name="SearchStudentScreen" component={SearchStudentScreen} />
        <Stack.Screen name="UploadExcelScreen" component={UploadExcelScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
