import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Title, Button, Surface, Text, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressReportScreenProps {
  navigation: any;
}

export default function ProgressReportScreen({ navigation }: ProgressReportScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const handleBack = () => {
    navigation.goBack();
  };

  // Simple data based on selected period
  const getReportData = () => {
    switch (selectedPeriod) {
      case 'week':
        return {
          totalFamilies: 28,
          distributedPlants: 35,
          successRate: 95,
          newAdded: 12,
        };
      case 'year':
        return {
          totalFamilies: 890,
          distributedPlants: 756,
          successRate: 99,
          newAdded: 245,
        };
      default: // month
        return {
          totalFamilies: 156,
          distributedPlants: 128,
          successRate: 98,
          newAdded: 45,
        };
    }
  };

  const reportData = getReportData();

  const exportReport = () => {
    console.log('Exporting report...');
  };

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
        {/* Period Selection */}
        <Surface style={styles.periodContainer}>
          <Title style={styles.sectionTitle}>समय अवधि चुनें</Title>
          <View style={styles.periodChips}>
            <Chip 
              mode={selectedPeriod === 'week' ? 'flat' : 'outlined'}
              selected={selectedPeriod === 'week'}
              onPress={() => setSelectedPeriod('week')}
              style={styles.periodChip}
            >
              इस सप्ताह
            </Chip>
            <Chip 
              mode={selectedPeriod === 'month' ? 'flat' : 'outlined'}
              selected={selectedPeriod === 'month'}
              onPress={() => setSelectedPeriod('month')}
              style={styles.periodChip}
            >
              इस महीने
            </Chip>
            <Chip 
              mode={selectedPeriod === 'year' ? 'flat' : 'outlined'}
              selected={selectedPeriod === 'year'}
              onPress={() => setSelectedPeriod('year')}
              style={styles.periodChip}
            >
              इस साल
            </Chip>
          </View>
        </Surface>

        {/* Simple Statistics */}
        <Surface style={styles.statsContainer}>
          <Title style={styles.sectionTitle}>आंकड़े</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{reportData.totalFamilies}</Text>
              <Text style={styles.statLabel}>कुल परिवार</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{reportData.distributedPlants}</Text>
              <Text style={styles.statLabel}>वितरित पौधे</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{reportData.successRate}%</Text>
              <Text style={styles.statLabel}>सफलता दर</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{reportData.newAdded}</Text>
              <Text style={styles.statLabel}>नए जोड़े गए</Text>
            </View>
          </View>
        </Surface>

        {/* Simple Progress Summary */}
        <Surface style={styles.progressContainer}>
          <Title style={styles.sectionTitle}>प्रगति सारांश</Title>
          
          <View style={styles.progressItem}>
            <View style={styles.progressIcon}>
              <Text style={styles.progressEmoji}>🌱</Text>
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>पौधे की स्थिति</Text>
              <Text style={styles.progressValue}>98% स्वस्थ</Text>
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressIcon}>
              <Text style={styles.progressEmoji}>💧</Text>
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>पानी की व्यवस्था</Text>
              <Text style={styles.progressValue}>95% नियमित</Text>
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressIcon}>
              <Text style={styles.progressEmoji}>📸</Text>
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>फोटो अपलोड</Text>
              <Text style={styles.progressValue}>1,245 फोटो</Text>
            </View>
          </View>
        </Surface>

        {/* Export Button */}
        <Surface style={styles.actionContainer}>
          <Button
            mode="contained"
            icon="file-excel"
            style={styles.actionButton}
            buttonColor="#4CAF50"
            onPress={exportReport}
          >
            रिपोर्ट डाउनलोड करें
          </Button>
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
  periodContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  periodChips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  periodChip: {
    marginRight: 8,
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
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
  progressContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressEmoji: {
    fontSize: 18,
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  progressDesc: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
