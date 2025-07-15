import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Title, Button, Surface, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressReportScreenProps {
  navigation: any;
}

export default function ProgressReportScreen({ navigation }: ProgressReportScreenProps) {
  const handleBack = () => {
    navigation.goBack();
  };

  // Static data for total families and photo uploads
  const totalFamilies = 156;
  const photoUploads = 1245;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.backgroundGradient}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>प्रगति रिपोर्ट</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Total Families Card */}
        <Surface style={styles.statsContainer}>
          <Title style={styles.sectionTitle}>कुल परिवार</Title>
          <View style={styles.statsRow}>
            <View style={styles.statCardWide}>
              <Text style={styles.statNumber}>{totalFamilies}</Text>
              <Text style={styles.statLabel}>कुल परिवार</Text>
            </View>
            <View style={styles.statCardWide}>
              <Text style={styles.statNumber}>{totalFamilies}</Text>
              <Text style={styles.statLabel}>वितरित पौधे</Text>
            </View>
          </View>
          <View style={styles.statCardFull}>
            <Text style={styles.statNumber}>{photoUploads}</Text>
            <Text style={styles.statLabel}>फोटो अपलोड</Text>
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
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  statsGrid: {
    display: 'none', // Remove old grid
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCardWide: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginRight: 8,
  },
  statCardFull: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  actionContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
  },
  actionButton: {
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
});
