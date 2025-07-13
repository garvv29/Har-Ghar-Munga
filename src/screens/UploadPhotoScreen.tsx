import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, TextInput, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

interface UploadPhotoScreenProps {
  navigation: any;
  route?: any;
}

export default function UploadPhotoScreen({ navigation, route }: UploadPhotoScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [plantStage, setPlantStage] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('अनुमति आवश्यक', 'फोटो अपलोड करने के लिए गैलरी की अनुमति आवश्यक है।');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('अनुमति आवश्यक', 'फोटो लेने के लिए कैमरा की अनुमति आवश्यक है।');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('चेतावनी', 'कृपया एक फोटो चुनें।');
      return;
    }

    if (!plantStage) {
      Alert.alert('चेतावनी', 'कृपया पौधे की अवस्था चुनें।');
      return;
    }

    setLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setLoading(false);
      
      // Update care score if callback is provided
      if (route?.params?.onPhotoUpload) {
        route.params.onPhotoUpload(selectedImage);
      }
      
      Alert.alert(
        'सफलता', 
        'फोटो सफलतापूर्वक अपलोड हो गया है! आपकी देखभाल स्कोर बढ़ गया है।',
        [
          {
            text: 'ठीक है',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 2000);
  };

  const plantStages = [
    { label: 'नया पौधा', value: 'new' },
    { label: 'बढ़ रहा है', value: 'growing' },
    { label: 'पत्तियां आ रही हैं', value: 'leaves' },
    { label: 'फूल आ रहे हैं', value: 'flowering' },
    { label: 'फल आ रहे हैं', value: 'fruiting' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.backgroundGradient}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Surface style={styles.header}>
          <Title style={styles.headerTitle}>पौधे का फोटो अपलोड करें</Title>
          <Paragraph style={styles.headerSubtitle}>
            अपने मूंनगा पौधे की तस्वीर अपलोड करें और प्रगति ट्रैक करें
          </Paragraph>
        </Surface>

        {/* Photo Selection */}
        <Surface style={styles.photoContainer}>
          <Title style={styles.sectionTitle}>फोटो चुनें</Title>
          
          {selectedImage ? (
            <View style={styles.imagePreview}>
              <Text style={styles.previewText}>फोटो चुना गया है</Text>
              <Button 
                mode="outlined" 
                onPress={() => setSelectedImage(null)}
                style={styles.changeButton}
                textColor="#4CAF50"
              >
                बदलें
              </Button>
            </View>
          ) : (
            <View style={styles.photoOptions}>
              <Button 
                mode="contained" 
                icon="camera"
                style={styles.photoButton}
                buttonColor="#4CAF50"
                onPress={takePhoto}
              >
                कैमरा से फोटो लें
              </Button>
            </View>
          )}
        </Surface>

        {/* Plant Stage Selection */}
        <Surface style={styles.stageContainer}>
          <Title style={styles.sectionTitle}>पौधे की अवस्था</Title>
          <Paragraph style={styles.sectionDesc}>
            अपने पौधे की वर्तमान अवस्था चुनें
          </Paragraph>
          
          <View style={styles.stageGrid}>
            {plantStages.map((stage) => (
              <Chip
                key={stage.value}
                selected={plantStage === stage.value}
                onPress={() => setPlantStage(stage.value)}
                style={[
                  styles.stageChip,
                  plantStage === stage.value && styles.selectedChip
                ]}
                textStyle={[
                  styles.stageText,
                  plantStage === stage.value && styles.selectedStageText
                ]}
              >
                {stage.label}
              </Chip>
            ))}
          </View>
        </Surface>

        {/* Description */}
        <Surface style={styles.descriptionContainer}>
          <Title style={styles.sectionTitle}>विवरण (वैकल्पिक)</Title>
          <Paragraph style={styles.sectionDesc}>
            अपने पौधे के बारे में कुछ जानकारी साझा करें
          </Paragraph>
          
          <TextInput
            label="पौधे के बारे में लिखें..."
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />
        </Surface>

        {/* Upload Button */}
        <Surface style={styles.uploadContainer}>
          <Button 
            mode="contained" 
            icon="upload"
            style={styles.uploadButton}
            buttonColor="#2E7D32"
            loading={loading}
            disabled={loading || !selectedImage || !plantStage}
            onPress={handleUpload}
          >
            {loading ? 'अपलोड हो रहा है...' : 'फोटो अपलोड करें'}
          </Button>
          
          <Paragraph style={styles.uploadNote}>
            फोटो अपलोड करने के बाद आपकी प्रगति अपडेट हो जाएगी
          </Paragraph>
        </Surface>

        {/* Tips */}
        <Surface style={styles.tipsContainer}>
          <Title style={styles.sectionTitle}>फोटो लेने के टिप्स</Title>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Text style={styles.tipEmoji}>📸</Text>
              <Text style={styles.tipText}>अच्छी रोशनी में फोटो लें</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipEmoji}>🌱</Text>
              <Text style={styles.tipText}>पौधे को केंद्र में रखें</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipEmoji}>📏</Text>
              <Text style={styles.tipText}>पौधे की ऊंचाई दिखाएं</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipEmoji}>🍃</Text>
              <Text style={styles.tipText}>पत्तियों की स्थिति दिखाएं</Text>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    elevation: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  photoContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  photoOptions: {
    gap: 12,
  },
  photoButton: {
    borderRadius: 12,
    marginBottom: 8,
  },
  imagePreview: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  previewText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 12,
  },
  changeButton: {
    borderRadius: 8,
  },
  stageContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  stageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stageChip: {
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  selectedChip: {
    backgroundColor: '#E8F5E8',
  },
  stageText: {
    color: '#666666',
  },
  selectedStageText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  descriptionInput: {
    backgroundColor: '#ffffff',
  },
  uploadContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
  },
  uploadButton: {
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  uploadNote: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  tipsContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
}); 