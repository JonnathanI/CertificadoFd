/*// src/components/Certificado/ViewPdfScreen.tsx
import React from 'react';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type ViewPdfScreenRouteProp = RouteProp<RootStackParamList, 'ViewPdfScreen'>;

const ViewPdfScreen: React.FC<{ route: ViewPdfScreenRouteProp }> = ({ route }) => {
  const { uri } = route.params;  // Obtiene la URI pasada en la navegación

  return <WebView source={{ uri }} style={{ flex: 1 }} />;
};

export default ViewPdfScreen;
*/