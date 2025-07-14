import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, Image, Platform, StyleSheet } from 'react-native'; // Import Platform and StyleSheet
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface AddFamilyScreenProps {
  navigation: any;
}

export default function AddFamilyScreen({ navigation }: AddFamilyScreenProps) {
  const [formData, setFormData] = useState({
    childName: '',
    gender: 'लड़का' as 'लड़का' | 'लड़की',
    dateOfBirth: '',
    age: '',
    weight: '',
    height: '',
    anganwadiCenterName: 'सरस्वती आंगनबाड़ी केंद्र',
    anganwadiCode: 'AWC-123-DLH', // Keep this as string for parsing
    motherName: '',
    fatherName: '',
    mobileNumber: '', // This will be the username
    village: '',
    ward: '',
    panchayat: '',
    district: '',
    distributionDate: '', // Not used in backend register
    workerName: 'श्रीमती सुनीता देवी', // Mapped to guardian_name
    workerCode: 'AWW-123', // Not used in backend register
    block: '',
    registrationDate: new Date().toLocaleDateString('hi-IN'), // Not used in backend register
  });

  const [photos, setPhotos] = useState({
    plantPhoto: null as string | null, // This will now store the URI, not base64
    pledgePhoto: null as string | null, // This will now store the URI, not base64
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Add validation function
  const isFormValid = () => {
    return (
      formData.childName.trim() !== '' &&
      formData.dateOfBirth.trim() !== '' &&
      formData.age.trim() !== '' &&
      formData.weight.trim() !== '' &&
      formData.height.trim() !== '' &&
      formData.motherName.trim() !== '' &&
      formData.fatherName.trim() !== '' &&
      formData.mobileNumber.trim() !== '' &&
      formData.anganwadiCode.trim() !== '' &&
      formData.village.trim() !== '' &&
      formData.district.trim() !== '' &&
      formData.block.trim() !== '' &&
      photos.plantPhoto !== null &&
      photos.pledgePhoto !== null
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // MODIFIED pickImage & pickFromGallery to store URI, not base64
  const pickImage = async (photoType: 'plantPhoto' | 'pledgePhoto') => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('अनुमति आवश्यक', 'कैमरा का उपयोग करने के लिए अनुमति दें');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true, // NO LONGER NEED BASE64 HERE
    });
    if (!result.canceled) {
      setPhotos(prev => ({ ...prev, [photoType]: result.assets[0].uri })); // Store URI
    }
  };

  const pickFromGallery = async (photoType: 'plantPhoto' | 'pledgePhoto') => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('अनुमति आवश्यक', 'गैलरी का उपयोग करने के लिए अनुमति दें');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true, // NO LONGER NEED BASE64 HERE
    });
    if (!result.canceled) {
      setPhotos(prev => ({ ...prev, [photoType]: result.assets[0].uri })); // Store URI
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

  const formatDateToYYYYMMDD = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const confirmRegistration = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    try {
      const data = new FormData(); // Create FormData object

      // Append text fields
      data.append('username', formData.mobileNumber?.toUpperCase() || '');
      data.append('name', formData.childName);
      data.append('password', 'hgm@2025'); // Still using hardcoded password - remember my warnings!
      data.append('guardian_name', formData.workerName);
      data.append('father_name', formData.fatherName);
      data.append('mother_name', formData.motherName);
      data.append('age', formData.age); // Send as string, backend will parse int
      data.append('dob', formatDateToYYYYMMDD(formData.dateOfBirth));
      data.append('aanganwadi_code', String(parseInt(formData.anganwadiCode?.match(/\d+/)?.[0] || '0'))); // Parse and send as string
      data.append('weight', formData.weight); // Send as string, backend will parse float
      data.append('height', formData.height); // Send as string, backend will parse float
      data.append('health_status', 'healthy');

      // Address parts - append separately or as concatenated string
      // If you want backend to combine, append individually.
      // If backend expects combined 'address' field, combine here.
      // Backend expects 'address' as one field, so combine on frontend.
      const address = `${formData.village}, ${formData.ward}, ${formData.panchayat}, ${formData.district}, ${formData.block}`;
      data.append('address', address);
      data.append('village', formData.village); // Include these too if backend needs them separately later
      data.append('ward', formData.ward);
      data.append('panchayat', formData.panchayat);
      data.append('district', formData.district);
      data.append('block', formData.block);

      // Append image files
      if (photos.plantPhoto) {
        data.append('plant_photo', {
          uri: photos.plantPhoto,
          name: 'plant_photo.jpg', // You might want a more dynamic name or rely on backend to generate
          type: 'image/jpeg', // Adjust type if you allow other formats
        } as any); // Use 'as any' for now, or define a proper type for Blob/File
      }

      if (photos.pledgePhoto) {
        data.append('pledge_photo', {
          uri: photos.pledgePhoto,
          name: 'pledge_photo.jpg',
          type: 'image/jpeg',
        } as any);
      }

      console.log('Sending FormData:', data); // Console log FormData is tricky, will show as [object FormData]

      const response = await fetch('https://grx6djfl-5000.inc1.devtunnels.ms/register', {
        method: 'POST',
        // No 'Content-Type' header needed here, fetch sets it automatically for FormData
        body: data, // Send the FormData object directly
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok && result.success) {
        Alert.alert('सफलता!', 'बच्चे का पंजीकरण सफलतापूर्वक हो गया।', [
          { text: 'ठीक है', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('त्रुटि', result.message || 'पंजीकरण असफल रहा');
      }
    } catch (err) {
      console.error('Registration error:', err);
      Alert.alert('नेटवर्क त्रुटि', 'सर्वर से कनेक्ट नहीं हो पा रहा है।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>नया परिवार पंजीकरण</Text>
      </View>

      {/* बच्चे की जानकारी */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>बच्चे की जानकारी</Text>
        
        <Text style={styles.label}>बच्चे का नाम</Text>
        <TextInput 
          value={formData.childName} 
          onChangeText={(v) => handleInputChange('childName', v)} 
          style={styles.input}
          placeholder="बच्चे का नाम दर्ज करें"
        />

        <Text style={styles.label}>जन्म तिथि (dd/mm/yyyy)</Text>
        <TextInput 
          value={formData.dateOfBirth} 
          onChangeText={(v) => handleInputChange('dateOfBirth', v)} 
          style={styles.input}
          placeholder="जन्म तिथि दर्ज करें"
        />

        <Text style={styles.label}>आयु</Text>
        <TextInput 
          value={formData.age} 
          onChangeText={(v) => handleInputChange('age', v)} 
          keyboardType="numeric" 
          style={styles.input}
          placeholder="आयु दर्ज करें"
        />

        <Text style={styles.label}>वजन (kg)</Text>
        <TextInput 
          value={formData.weight} 
          onChangeText={(v) => handleInputChange('weight', v)} 
          keyboardType="numeric" 
          style={styles.input}
          placeholder="वजन दर्ज करें"
        />

        <Text style={styles.label}>ऊंचाई (cm)</Text>
        <TextInput 
          value={formData.height} 
          onChangeText={(v) => handleInputChange('height', v)} 
          keyboardType="numeric" 
          style={styles.input}
          placeholder="ऊंचाई दर्ज करें"
        />
      </View>

      {/* माता-पिता की जानकारी */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>माता-पिता की जानकारी</Text>
        
        <Text style={styles.label}>माता का नाम</Text>
        <TextInput 
          value={formData.motherName} 
          onChangeText={(v) => handleInputChange('motherName', v)} 
          style={styles.input}
          placeholder="माता का नाम दर्ज करें"
        />

        <Text style={styles.label}>पिता का नाम</Text>
        <TextInput 
          value={formData.fatherName} 
          onChangeText={(v) => handleInputChange('fatherName', v)} 
          style={styles.input}
          placeholder="पिता का नाम दर्ज करें"
        />

        <Text style={styles.label}>मोबाइल नंबर (ID)</Text>
        <TextInput 
          value={formData.mobileNumber} 
          onChangeText={(v) => handleInputChange('mobileNumber', v)} 
          style={styles.input}
          placeholder="मोबाइल नंबर दर्ज करें"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>आंगनवाड़ी कोड</Text>
        <TextInput 
          value={formData.anganwadiCode} 
          onChangeText={(v) => handleInputChange('anganwadiCode', v)} 
          style={styles.input}
          placeholder="आंगनवाड़ी कोड दर्ज करें"
        />
      </View>

      {/* पता की जानकारी */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>पता की जानकारी</Text>
        
        <Text style={styles.label}>गाँव</Text>
        <TextInput 
          value={formData.village} 
          onChangeText={(v) => handleInputChange('village', v)} 
          style={styles.input}
          placeholder="गाँव का नाम दर्ज करें"
        />

        <Text style={styles.label}>वार्ड</Text>
        <TextInput 
          value={formData.ward} 
          onChangeText={(v) => handleInputChange('ward', v)} 
          style={styles.input}
          placeholder="वार्ड नंबर दर्ज करें"
        />

        <Text style={styles.label}>पंचायत</Text>
        <TextInput 
          value={formData.panchayat} 
          onChangeText={(v) => handleInputChange('panchayat', v)} 
          style={styles.input}
          placeholder="पंचायत का नाम दर्ज करें"
        />

        <Text style={styles.label}>जिला</Text>
        <TextInput 
          value={formData.district} 
          onChangeText={(v) => handleInputChange('district', v)} 
          style={styles.input}
          placeholder="जिला का नाम दर्ज करें"
        />

        <Text style={styles.label}>विकासखंड (Block)</Text>
        <TextInput 
          value={formData.block} 
          onChangeText={(v) => handleInputChange('block', v)} 
          style={styles.input}
          placeholder="विकासखंड का नाम दर्ज करें"
        />
      </View>

      {/* Photo Upload Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>फोटो अपलोड</Text>
        
        <Text style={styles.label}>पौधे की फोटो</Text>
        {photos.plantPhoto ? (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photos.plantPhoto }} style={styles.photoPreview} />
            <Button 
              title="फोटो बदलें" 
              onPress={() => showImageOptions('plantPhoto', 'बच्चे को मुंगे का पेड़ देते हुए फोटो लें')}
              color="#4CAF50"
            />
          </View>
        ) : (
          <Button 
            title="पौधे की फोटो लें" 
            onPress={() => showImageOptions('plantPhoto', 'बच्चे को मुंगे का पेड़ देते हुए फोटो लें')}
            color="#4CAF50"
          />
        )}

        <Text style={styles.label}>शपथ पत्र की फोटो</Text>
        {photos.pledgePhoto ? (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photos.pledgePhoto }} style={styles.photoPreview} />
            <Button 
              title="फोटो बदलें" 
              onPress={() => showImageOptions('pledgePhoto', 'हस्ताक्षरित शपथ पत्र की फोटो लें')}
              color="#4CAF50"
            />
          </View>
        ) : (
          <Button 
            title="शपथ पत्र की फोटो लें" 
            onPress={() => showImageOptions('pledgePhoto', 'हस्ताक्षरित शपथ पत्र की फोटो लें')}
            color="#4CAF50"
          />
        )}
      </View>

      <View style={styles.submitContainer}>
        <Button
          title={loading ? 'पंजीकरण हो रहा है...' : 'पंजीकरण करें'}
          onPress={confirmRegistration}
          disabled={loading || !isFormValid()}
          color={isFormValid() ? '#ffffff' : '#cccccc'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  photoPreview: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  submitContainer: {
    backgroundColor: '#4CAF50',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
