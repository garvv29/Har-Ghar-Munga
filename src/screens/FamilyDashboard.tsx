import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, FAB, Chip, ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { apiService, FamilyData } from '../utils/api';

const { width } = Dimensions.get('window');

interface FamilyDashboardProps {
  navigation: any;
  route?: {
    params?: {
      userData?: any;
      userId?: string;
      name?: string;
      age?: string;
      guardianName?: string;
      fatherName?: string;
      motherName?: string;
    };
  };
}

export default function FamilyDashboard({ navigation, route }: FamilyDashboardProps) {
  const [plantData, setPlantData] = useState({
    plantName: 'मूंनगा पौधा #123',
    plantAge: '45 दिन',
    healthStatus: 'स्वस्थ',
    growthStage: 'बढ़ रहा है',
    lastWatered: 'आज, सुबह 8:00',
    nextWatering: 'कल, सुबह 8:00',
    photoCount: 12,
    careScore: 85,
  });

  const [waterCompleted, setWaterCompleted] = useState(false);
  const [latestPhotoUri, setLatestPhotoUri] = useState<string | null>(null);
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch family data when component mounts
  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const userId = route?.params?.userId;
        if (userId && !route?.params?.name) {
          // Only fetch from API if we don't have direct name data
          console.log('Fetching family data for user ID:', userId);
          const data = await apiService.getFamilyByUserId(userId);
          setFamilyData(data);
          console.log('Family data fetched:', data);
        } else {
          console.log('Using direct data from login or no user ID provided');
        }
      } catch (error) {
        console.error('Error fetching family data:', error);
        Alert.alert('त्रुटि', 'परिवार की जानकारी लोड नहीं हो पाई।');
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyData();
  }, [route?.params?.userId, route?.params?.name]);

  const handleUploadPhoto = () => {
    navigation.navigate('UploadPhoto', {
      onPhotoUpload: (uri?: string) => {
        setPlantData(prev => ({
          ...prev,
          photoCount: prev.photoCount + 1,
          careScore: Math.min(prev.careScore + 10, 100)
        }));
        if (uri) setLatestPhotoUri(uri);
      }
    });
  };

  const handleViewNutrition = () => {
    navigation.navigate('NutritionGuide');
  };

  const handleViewCareTips = () => {
    navigation.navigate('CareTips');
  };



  const handleWaterPlant = () => {
    setWaterCompleted(true);
    setPlantData(prev => ({
      ...prev,
      lastWatered: 'अभी, ' + new Date().toLocaleTimeString('hi-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      nextWatering: 'कल, सुबह 8:00'
    }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.backgroundGradient}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Latest Photo */}
        {latestPhotoUri && (
          <Surface style={styles.latestPhotoContainer}>
            <Title style={styles.sectionTitle}>नवीनतम फोटो</Title>
            <Image
              source={{ uri: latestPhotoUri }}
              style={styles.latestPhoto}
              resizeMode="cover"
            />
          </Surface>
        )}
        {/* Header */}
        <Surface style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>👨‍👩‍👧‍👦</Text>
              </View>
            </View>
            <View style={styles.headerText}>
              <Title style={styles.headerTitle}>मेरा पौधा</Title>
              <View style={styles.familyInfo}>
                <Text style={styles.familyLabel}>बच्चा: {route?.params?.name || familyData?.childName || 'लोड हो रहा है...'}</Text>
                {route?.params?.age && <Text style={styles.familyAge}> (उम्र: {route.params.age} वर्ष)</Text>}
                <Text style={styles.familyLabel}>माता: {route?.params?.motherName || 'लोड हो रहा है...'}</Text>
                <Text style={styles.familyLabel}>पिता: {route?.params?.fatherName || 'लोड हो रहा है...'}</Text>
              </View>
            </View>
          </View>
        </Surface>

        {/* Plant Status Card */}
        <Surface style={styles.plantCard}>
          <View style={styles.plantHeader}>
            <View style={styles.plantIcon}>
              <Text style={styles.plantEmoji}>🌱</Text>
            </View>
            <View style={styles.plantInfo}>
              <Title style={styles.plantTitle}>
                {route?.params?.name ? `${route.params.name} का पौधा` : familyData?.childName ? `${familyData.childName} का पौधा` : plantData.plantName}
              </Title>
              <Text style={styles.plantAge}>
                {route?.params?.age ? `${route.params.age} वर्ष का बच्चा` : plantData.plantAge}
              </Text>
            </View>
            <Chip style={styles.healthChip} textStyle={styles.healthChipText}>
              {plantData.healthStatus}
            </Chip>
          </View>
          
          <View style={styles.careProgress}>
            <Text style={styles.progressLabel}>देखभाल स्कोर</Text>
            <ProgressBar 
              progress={plantData.careScore / 100} 
              color="#4CAF50" 
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>{plantData.careScore}%</Text>
          </View>
        </Surface>

        {/* Quick Actions */}
        <Surface style={styles.actionsContainer}>
          <Title style={styles.sectionTitle}>त्वरित कार्य</Title>
          <View style={styles.actionGrid}>
            <Button 
              mode="contained" 
              icon="camera"
              style={styles.actionButton}
              buttonColor="#4CAF50"
              onPress={handleUploadPhoto}
            >
              फोटो अपलोड
            </Button>
          </View>
        </Surface>

        {/* Plant Care Schedule */}
        <Surface style={styles.scheduleContainer}>
          <Title style={styles.sectionTitle}>देखभाल कार्यक्रम</Title>
          <View style={styles.scheduleList}>
            <View style={styles.scheduleItem}>
              <View style={styles.scheduleIcon}>
                <Text style={styles.scheduleEmoji}>💧</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTitle}>पानी देना</Text>
                <Text style={styles.scheduleTime}>{plantData.nextWatering}</Text>
                <Text style={styles.scheduleStatus}>अंतिम: {plantData.lastWatered}</Text>
              </View>
              <Button 
                mode="contained" 
                style={styles.scheduleButton}
                buttonColor={waterCompleted ? "#666666" : "#4CAF50"}
                disabled={waterCompleted}
                onPress={handleWaterPlant}
              >
                {waterCompleted ? 'पूर्ण' : 'पूर्ण करें'}
              </Button>
            </View>
          </View>
        </Surface>

        {/* Growth Timeline */}
        <Surface style={styles.timelineContainer}>
          <Title style={styles.sectionTitle}>विकास टाइमलाइन</Title>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <Text style={styles.timelineEmoji}>🌱</Text>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>पौधा लगाया गया</Text>
                <Text style={styles.timelineDate}>15 जून 2024</Text>
                <Text style={styles.timelineDesc}>आंगनबाड़ी से पौधा प्राप्त किया</Text>
              </View>
            </View>
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <Text style={styles.timelineEmoji}>🌿</Text>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>पहली पत्तियां</Text>
                <Text style={styles.timelineDate}>25 जून 2024</Text>
                <Text style={styles.timelineDesc}>पौधे में नई पत्तियां आईं</Text>
              </View>
            </View>
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <Text style={styles.timelineEmoji}>🌳</Text>
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>वर्तमान स्थिति</Text>
                <Text style={styles.timelineDate}>आज</Text>
                <Text style={styles.timelineDesc}>पौधा स्वस्थ और बढ़ रहा है</Text>
              </View>
            </View>
          </View>
        </Surface>

        {/* Munga Benefits */}
        <Surface style={styles.nutritionContainer}>
          <Title style={styles.sectionTitle}>मूंगा उगाने के फायदे</Title>
          <View style={styles.nutritionCard}>
            <Text style={styles.nutritionEmoji}>🌱</Text>
            <Text style={styles.nutritionTitle}>स्वास्थ्य लाभ</Text>
            <Text style={styles.nutritionDesc}>
              • आयरन की कमी दूर होती है{'\n'}
              • रोग प्रतिरोधक क्षमता बढ़ती है{'\n'}
              • विटामिन A, C और K मिलते हैं{'\n'}
              • एनीमिया से बचाव होता है
            </Text>
          </View>
          
          <View style={styles.nutritionCard}>
            <Text style={styles.nutritionEmoji}>💰</Text>
            <Text style={styles.nutritionTitle}>आर्थिक लाभ</Text>
            <Text style={styles.nutritionDesc}>
              • घर में ही ताजी सब्जी मिलती है{'\n'}
              • बाजार से खरीदने की जरूरत नहीं{'\n'}
              • पैसे की बचत होती है{'\n'}
              • अतिरिक्त आय का स्रोत
            </Text>
          </View>
          
          <View style={styles.nutritionCard}>
            <Text style={styles.nutritionEmoji}>🌍</Text>
            <Text style={styles.nutritionTitle}>पर्यावरण लाभ</Text>
            <Text style={styles.nutritionDesc}>
              • हवा शुद्ध होती है{'\n'}
              • मिट्टी की गुणवत्ता बेहतर होती है{'\n'}
              • जैविक खेती को बढ़ावा{'\n'}
              • प्रदूषण कम होता है
            </Text>
          </View>
        </Surface>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="camera"
        style={styles.fab}
        onPress={handleUploadPhoto}
        color="#FFFFFF"
      />
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
    paddingBottom: 100,
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 16,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  logoText: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  familyInfo: {
    marginTop: 4,
  },
  familyLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  familyAge: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  plantCard: {
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
  plantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  plantIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plantEmoji: {
    fontSize: 24,
  },
  plantInfo: {
    flex: 1,
  },
  plantTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  plantAge: {
    fontSize: 12,
    color: '#666666',
  },
  healthChip: {
    backgroundColor: '#E8F5E8',
  },
  healthChipText: {
    color: '#4CAF50',
    fontSize: 12,
  },
  careProgress: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'right',
  },
  actionsContainer: {
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
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 12,
    marginBottom: 8,
  },
  scheduleContainer: {
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
  scheduleList: {
    gap: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleEmoji: {
    fontSize: 18,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 2,
  },
  scheduleStatus: {
    fontSize: 11,
    color: '#666666',
  },
  scheduleButton: {
    borderRadius: 8,
    minWidth: 80,
  },
  timelineContainer: {
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
  timeline: {
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineEmoji: {
    fontSize: 18,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 12,
    color: '#666666',
  },
  nutritionContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  nutritionCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 16,
  },
  nutritionEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  nutritionDesc: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  nutritionButton: {
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
  latestPhotoContainer: {
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
  latestPhoto: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
}); 