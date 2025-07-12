import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, FAB, Chip, ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface FamilyDashboardProps {
  navigation: any;
}

export default function FamilyDashboard({ navigation }: FamilyDashboardProps) {
  const [plantData] = useState({
    plantName: 'मूंनगा पौधा #123',
    plantAge: '45 दिन',
    healthStatus: 'स्वस्थ',
    growthStage: 'बढ़ रहा है',
    lastWatered: 'आज, सुबह 8:00',
    nextWatering: 'कल, सुबह 8:00',
    photoCount: 12,
    careScore: 85,
  });

  const handleUploadPhoto = () => {
    navigation.navigate('UploadPhoto');
  };

  const handleViewNutrition = () => {
    navigation.navigate('NutritionGuide');
  };

  const handleViewCareTips = () => {
    navigation.navigate('CareTips');
  };

  const handleViewProgress = () => {
    navigation.navigate('PlantProgress');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.backgroundGradient}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Surface style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>👨‍👩‍👧‍👦</Text>
              </View>
            </View>
            <View style={styles.headerText}>
              <Title style={styles.headerTitle}>मेरा मूंनगा</Title>
              <Paragraph style={styles.headerSubtitle}>परिवार: राम कुमार</Paragraph>
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
              <Title style={styles.plantTitle}>{plantData.plantName}</Title>
              <Text style={styles.plantAge}>{plantData.plantAge}</Text>
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
            <Button 
              mode="contained" 
              icon="book-open"
              style={styles.actionButton}
              buttonColor="#2E7D32"
              onPress={handleViewNutrition}
            >
              पोषण गाइड
            </Button>
            <Button 
              mode="outlined" 
              icon="lightbulb"
              style={styles.actionButton}
              textColor="#4CAF50"
              onPress={handleViewCareTips}
            >
              देखभाल टिप्स
            </Button>
            <Button 
              mode="outlined" 
              icon="chart-line"
              style={styles.actionButton}
              textColor="#4CAF50"
              onPress={handleViewProgress}
            >
              प्रगति देखें
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
                buttonColor="#4CAF50"
              >
                पूर्ण
              </Button>
            </View>
            
            <View style={styles.scheduleItem}>
              <View style={styles.scheduleIcon}>
                <Text style={styles.scheduleEmoji}>📸</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTitle}>फोटो अपलोड</Text>
                <Text style={styles.scheduleTime}>हर सप्ताह</Text>
                <Text style={styles.scheduleStatus}>कुल फोटो: {plantData.photoCount}</Text>
              </View>
              <Button 
                mode="outlined" 
                style={styles.scheduleButton}
                textColor="#4CAF50"
                onPress={handleUploadPhoto}
              >
                अपलोड
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

        {/* Nutrition Tips */}
        <Surface style={styles.nutritionContainer}>
          <Title style={styles.sectionTitle}>आज का पोषण टिप</Title>
          <View style={styles.nutritionCard}>
            <Text style={styles.nutritionEmoji}>🥗</Text>
            <Text style={styles.nutritionTitle}>मूंनगा की पत्तियों का सूप</Text>
            <Text style={styles.nutritionDesc}>
              मूंनगा की ताजी पत्तियों से बना सूप आयरन और विटामिन से भरपूर होता है। 
              बच्चों के लिए बहुत फायदेमंद है।
            </Text>
            <Button 
              mode="outlined" 
              style={styles.nutritionButton}
              textColor="#4CAF50"
              onPress={handleViewNutrition}
            >
              रेसिपी देखें
            </Button>
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
}); 