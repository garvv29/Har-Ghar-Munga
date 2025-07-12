import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, Image } from 'react-native';
import { Card, Title, Button, Surface, Text, TextInput, Appbar, RadioButton, Chip, Dialog, Portal, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

interface AddFamilyScreenProps {
  navigation: any;
}

export default function AddFamilyScreen({ navigation }: AddFamilyScreenProps) {
  const [formData, setFormData] = useState({
    // बच्चे की जानकारी
    childName: '',
    gender: 'लड़का',
    dateOfBirth: '',
    age: '',
    weight: '',
    height: '',
    anganwadiCenterName: 'सरस्वती आंगनबाड़ी केंद्र',
    anganwadiCode: 'AWC-123-DLH',
    
    // माता-पिता की जानकारी
    motherName: '',
    fatherName: '',
    mobileNumber: '',
    village: '',
    ward: '',
    panchayat: '',
    district: '',
    
    // मूंगा पौधे की जानकारी
    distributionDate: '',
    
    // स्थान और कर्मचारी जानकारी
    workerName: 'श्रीमती सुनीता देवी',
    workerCode: 'AWW-123',
    block: '',
    registrationDate: new Date().toLocaleDateString('hi-IN'),
  });
  
  const [photos, setPhotos] = useState({
    plantPhoto: null as string | null,
    pledgePhoto: null as string | null,
  });
  
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async (photoType: 'plantPhoto' | 'pledgePhoto') => {
    // Request permission to access camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('अनुमति आवश्यक', 'कैमरा का उपयोग करने के लिए अनुमति दें');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos(prev => ({ ...prev, [photoType]: result.assets[0].uri }));
    }
  };

  const pickFromGallery = async (photoType: 'plantPhoto' | 'pledgePhoto') => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('अनुमति आवश्यक', 'गैलरी का उपयोग करने के लिए अनुमति दें');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos(prev => ({ ...prev, [photoType]: result.assets[0].uri }));
    }
  };

  const showImageOptions = (photoType: 'plantPhoto' | 'pledgePhoto', title: string) => {
    Alert.alert(
      'फोटो चुनें',
      title,
      [
        { text: 'कैमरा', onPress: () => pickImage(photoType) },
        { text: 'गैलरी', onPress: () => pickFromGallery(photoType) },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.childName || !formData.age || !formData.motherName || !formData.fatherName || !formData.mobileNumber || !formData.village || !formData.district || !formData.block) {
      Alert.alert('त्रुटि', 'कृपया सभी आवश्यक फील्ड भरें');
      return;
    }

    if (!photos.plantPhoto) {
      Alert.alert('त्रुटि', 'कृपया पौधे की फोटो अपलोड करें');
      return;
    }

    if (!photos.pledgePhoto) {
      Alert.alert('त्रुटि', 'कृपया शपथ पत्र की फोटो अपलोड करें');
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const confirmRegistration = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'सफलता!',
        'बच्चे का पंजीकरण सफलतापूर्वक हो गया',
        [{ text: 'ठीक है', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('त्रुटि', 'पंजीकरण में समस्या हुई, कृपया दोबारा कोशिश करें');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.backgroundGradient}
      />
      
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title="नया परिवार पंजीकरण" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* बच्चे की जानकारी */}
        <Surface style={styles.formContainer}>
          <Title style={styles.sectionTitle}>🔹 बच्चे की जानकारी</Title>
          
          {/* Child Name */}
          <TextInput
            label="बच्चे का नाम *"
            value={formData.childName}
            onChangeText={(text) => handleInputChange('childName', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          {/* Gender */}
          <Text style={styles.fieldLabel}>लिंग *</Text>
          <View style={styles.radioGroup}>
            <View style={styles.radioItem}>
              <RadioButton
                value="लड़का"
                status={formData.gender === 'लड़का' ? 'checked' : 'unchecked'}
                onPress={() => handleInputChange('gender', 'लड़का')}
                color="#4CAF50"
              />
              <Text style={styles.radioLabel}>लड़का</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value="लड़की"
                status={formData.gender === 'लड़की' ? 'checked' : 'unchecked'}
                onPress={() => handleInputChange('gender', 'लड़की')}
                color="#4CAF50"
              />
              <Text style={styles.radioLabel}>लड़की</Text>
            </View>
          </View>

          {/* Date of Birth */}
          <TextInput
            label="जन्म तिथि (DD/MM/YYYY) *"
            value={formData.dateOfBirth}
            onChangeText={(text) => handleInputChange('dateOfBirth', text)}
            mode="outlined"
            style={styles.input}
            placeholder="01/01/2020"
            left={<TextInput.Icon icon="calendar" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          {/* Age */}
          <TextInput
            label="आयु (वर्षों में) *"
            value={formData.age}
            onChangeText={(text) => handleInputChange('age', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="उदाहरण: 4"
            left={<TextInput.Icon icon="clock-outline" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          {/* Weight */}
          <TextInput
            label="वजन (किलोग्राम में)"
            value={formData.weight}
            onChangeText={(text) => handleInputChange('weight', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="उदाहरण: 15.5"
            left={<TextInput.Icon icon="scale" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          {/* Height */}
          <TextInput
            label="लंबाई (सेंटीमीटर में)"
            value={formData.height}
            onChangeText={(text) => handleInputChange('height', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="उदाहरण: 95"
            left={<TextInput.Icon icon="human-male-height" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          {/* Anganwadi Center */}
          <TextInput
            label="आंगनवाड़ी केंद्र का नाम"
            value={formData.anganwadiCenterName}
            onChangeText={(text) => handleInputChange('anganwadiCenterName', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="home-city-outline" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="आंगनवाड़ी कोड"
            value={formData.anganwadiCode}
            onChangeText={(text) => handleInputChange('anganwadiCode', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="barcode" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />
        </Surface>

        {/* माता-पिता की जानकारी */}
        <Surface style={styles.formContainer}>
          <Title style={styles.sectionTitle}>🔹 माता-पिता / अभिभावक की जानकारी</Title>
          
          <TextInput
            label="माता का नाम *"
            value={formData.motherName}
            onChangeText={(text) => handleInputChange('motherName', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-heart" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="पिता का नाम / अभिभावक का नाम *"
            value={formData.fatherName}
            onChangeText={(text) => handleInputChange('fatherName', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-tie" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="मोबाइल नंबर *"
            value={formData.mobileNumber}
            onChangeText={(text) => handleInputChange('mobileNumber', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
            left={<TextInput.Icon icon="phone" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <Title style={styles.subSectionTitle}>पता की जानकारी</Title>
          
          <TextInput
            label="गाँव *"
            value={formData.village}
            onChangeText={(text) => handleInputChange('village', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="home-group" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="वार्ड"
            value={formData.ward}
            onChangeText={(text) => handleInputChange('ward', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="map-marker-outline" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="पंचायत"
            value={formData.panchayat}
            onChangeText={(text) => handleInputChange('panchayat', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-group" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="जिला *"
            value={formData.district}
            onChangeText={(text) => handleInputChange('district', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="map" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />
        </Surface>

        {/* मूंगा पौधे की जानकारी */}
        <Surface style={styles.formContainer}>
          <Title style={styles.sectionTitle}>🔹 मूंगा पौधे से संबंधित जानकारी</Title>
          
          <TextInput
            label="पौधा वितरण तिथि (DD/MM/YYYY) *"
            value={formData.distributionDate}
            onChangeText={(text) => handleInputChange('distributionDate', text)}
            mode="outlined"
            style={styles.input}
            placeholder="आज की तारीख"
            left={<TextInput.Icon icon="calendar-check" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />
        </Surface>

        {/* Photo Upload Section */}
        <Surface style={styles.photoContainer}>
          <Title style={styles.sectionTitle}>पौधे की फोटो *</Title>
          <Text style={styles.photoInstruction}>
            बच्चे को मुंगे का पेड़ देते हुए फोटो लें
          </Text>
          
          {photos.plantPhoto ? (
            <View style={styles.photoPreview}>
              <Image source={{ uri: photos.plantPhoto }} style={styles.previewImage} />
              <Button 
                mode="outlined" 
                onPress={() => showImageOptions('plantPhoto', 'बच्चे को मुंगे का पेड़ देते हुए फोटो लें')}
                style={styles.changePhotoButton}
                textColor="#4CAF50"
              >
                फोटो बदलें
              </Button>
            </View>
          ) : (
            <Button 
              mode="contained" 
              icon="camera"
              onPress={() => showImageOptions('plantPhoto', 'बच्चे को मुंगे का पेड़ देते हुए फोटो लें')}
              style={styles.photoButton}
              buttonColor="#4CAF50"
            >
              पौधे की फोटो लें
            </Button>
          )}
        </Surface>

        {/* Pledge Photo Section */}
        <Surface style={styles.photoContainer}>
          <Title style={styles.sectionTitle}>शपथ पत्र की फोटो *</Title>
          <Text style={styles.photoInstruction}>
            हस्ताक्षरित शपथ पत्र की फोटो लें
          </Text>
          
          {photos.pledgePhoto ? (
            <View style={styles.photoPreview}>
              <Image source={{ uri: photos.pledgePhoto }} style={styles.previewImage} />
              <Button 
                mode="outlined" 
                onPress={() => showImageOptions('pledgePhoto', 'हस्ताक्षरित शपथ पत्र की फोटो लें')}
                style={styles.changePhotoButton}
                textColor="#4CAF50"
              >
                फोटो बदलें
              </Button>
            </View>
          ) : (
            <Button 
              mode="contained" 
              icon="camera"
              onPress={() => showImageOptions('pledgePhoto', 'हस्ताक्षरित शपथ पत्र की फोटो लें')}
              style={styles.photoButton}
              buttonColor="#4CAF50"
            >
              शपथ पत्र की फोटो लें
            </Button>
          )}
        </Surface>

        {/* स्थान और कर्मचारी जानकारी */}
        <Surface style={styles.formContainer}>
          <Title style={styles.sectionTitle}>🔹 स्थान और कर्मचारी जानकारी</Title>
          
          <TextInput
            label="आंगनबाड़ी कार्यकर्ता का नाम"
            value={formData.workerName}
            onChangeText={(text) => handleInputChange('workerName', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-star" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="कार्यकर्ता कोड"
            value={formData.workerCode}
            onChangeText={(text) => handleInputChange('workerCode', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="card-account-details" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="विकासखंड (Block) *"
            value={formData.block}
            onChangeText={(text) => handleInputChange('block', text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="city" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />

          <TextInput
            label="रजिस्ट्रेशन की तारीख"
            value={formData.registrationDate}
            editable={false}
            mode="outlined"
            style={[styles.input, styles.disabledInput]}
            left={<TextInput.Icon icon="calendar-today" color="#4CAF50" />}
            outlineColor="#E0E0E0"
            activeOutlineColor="#4CAF50"
            theme={{ colors: { primary: '#4CAF50' } }}
          />
        </Surface>

        {/* Submit Button */}
        <Button 
          mode="contained" 
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
          labelStyle={styles.submitButtonText}
          buttonColor="#2E7D32"
        >
          {loading ? 'पंजीकरण हो रहा है...' : 'पंजीकरण करें'}
        </Button>
      </ScrollView>

      {/* Confirmation Dialog */}
      <Portal>
        <Dialog visible={showConfirmDialog} onDismiss={() => setShowConfirmDialog(false)}>
          <Dialog.Title style={styles.dialogTitle}>पंजीकरण की पुष्टि करें</Dialog.Title>
          <Dialog.Content>
            <Surface style={styles.confirmationCard}>
              <Text style={styles.confirmationTitle}>🔹 बच्चे की जानकारी</Text>
              <Text style={styles.confirmationText}>नाम: {formData.childName}</Text>
              <Text style={styles.confirmationText}>लिंग: {formData.gender}</Text>
              <Text style={styles.confirmationText}>आयु: {formData.age} वर्ष</Text>
              {formData.weight && <Text style={styles.confirmationText}>वजन: {formData.weight} किग्रा</Text>}
              {formData.height && <Text style={styles.confirmationText}>लंबाई: {formData.height} सेमी</Text>}
              
              <Text style={[styles.confirmationTitle, { marginTop: 16 }]}>🔹 माता-पिता की जानकारी</Text>
              <Text style={styles.confirmationText}>माता का नाम: {formData.motherName}</Text>
              <Text style={styles.confirmationText}>पिता का नाम: {formData.fatherName}</Text>
              <Text style={styles.confirmationText}>मोबाइल: {formData.mobileNumber}</Text>
              <Text style={styles.confirmationText}>गाँव: {formData.village}</Text>
              <Text style={styles.confirmationText}>जिला: {formData.district}</Text>
              
              <Text style={[styles.confirmationTitle, { marginTop: 16 }]}>🔹 लॉगिन विवरण</Text>
              <Surface style={styles.loginCredentials}>
                <Text style={styles.credentialLabel}>यूजरनेम:</Text>
                <Text style={styles.credentialValue}>{formData.mobileNumber}</Text>
                <Text style={styles.credentialLabel}>पासवर्ड:</Text>
                <Text style={styles.credentialValue}>{formData.mobileNumber}</Text>
                <Text style={styles.credentialNote}>
                  📱 अपने मोबाइल नंबर से लॉगिन करें
                </Text>
              </Surface>
            </Surface>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowConfirmDialog(false)} textColor="#666">
              रद्द करें
            </Button>
            <Button onPress={confirmRegistration} mode="contained" buttonColor="#2E7D32">
              पुष्टि करें
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  formContainer: {
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
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 16,
    marginBottom: 12,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 14,
    color: '#1a1a1a',
    marginLeft: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#F5F5F5',
  },
  selectedChip: {
    backgroundColor: '#E8F5E8',
  },
  chipText: {
    color: '#666666',
  },
  selectedChipText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  disabledInput: {
    opacity: 0.7,
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
    alignItems: 'center',
  },
  photoInstruction: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  photoButton: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  photoPreview: {
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  changePhotoButton: {
    borderRadius: 12,
  },
  submitButton: {
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Dialog styles
  dialogTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    textAlign: 'center',
  },
  confirmationCard: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginVertical: 8,
  },
  confirmationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    paddingLeft: 8,
  },
  loginCredentials: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  credentialLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 4,
  },
  credentialValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  credentialNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 4,
  },
});
