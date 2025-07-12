import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Appbar, Card, Title, Button, Surface, Text, ProgressBar, Chip, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ProgressReportScreenProps {
  navigation: any;
}

export default function ProgressReportScreen({ navigation }: ProgressReportScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Dynamic data based on selected period
  const getMetricsData = () => {
    switch (selectedPeriod) {
      case 'week':
        return {
          totalFamilies: 28,
          distributedPlants: 35,
          successRate: 95,
          newAdded: 12,
          targetProgress: 0.85,
          plantProgress: 0.88,
          successProgress: 0.95,
          newProgress: 0.60
        };
      case 'year':
        return {
          totalFamilies: 890,
          distributedPlants: 756,
          successRate: 99,
          newAdded: 245,
          targetProgress: 0.89,
          plantProgress: 0.85,
          successProgress: 0.99,
          newProgress: 0.82
        };
      default: // month
        return {
          totalFamilies: 156,
          distributedPlants: 128,
          successRate: 98,
          newAdded: 45,
          targetProgress: 0.75,
          plantProgress: 0.82,
          successProgress: 0.98,
          newProgress: 0.65
        };
    }
  };

  const metricsData = getMetricsData();

  const exportReport = () => {
    // Export functionality
    console.log('Exporting report...');
  };

  const shareReport = () => {
    // Share functionality
    console.log('Sharing report...');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.backgroundGradient}
      />
      
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title="प्रगति रिपोर्ट" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="download" onPress={exportReport} color="#FFFFFF" />
        <Appbar.Action icon="share" onPress={shareReport} color="#FFFFFF" />
      </Appbar.Header>

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

        {/* Key Metrics */}
        <Surface style={styles.metricsContainer}>
          <Title style={styles.sectionTitle}>मुख्य आंकड़े</Title>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{metricsData.totalFamilies}</Text>
              <Text style={styles.metricLabel}>कुल परिवार</Text>
              <ProgressBar progress={metricsData.targetProgress} color="#4CAF50" style={styles.progressBar} />
              <Text style={styles.progressText}>{Math.round(metricsData.targetProgress * 100)}% लक्ष्य पूरा</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{metricsData.distributedPlants}</Text>
              <Text style={styles.metricLabel}>वितरित पौधे</Text>
              <ProgressBar progress={metricsData.plantProgress} color="#2E7D32" style={styles.progressBar} />
              <Text style={styles.progressText}>{Math.round(metricsData.plantProgress * 100)}% सफल</Text>
            </View>
          </View>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{metricsData.successRate}%</Text>
              <Text style={styles.metricLabel}>सफलता दर</Text>
              <ProgressBar progress={metricsData.successProgress} color="#66BB6A" style={styles.progressBar} />
              <Text style={styles.progressText}>बहुत अच्छा</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{metricsData.newAdded}</Text>
              <Text style={styles.metricLabel}>नए जोड़े गए</Text>
              <ProgressBar progress={metricsData.newProgress} color="#388E3C" style={styles.progressBar} />
              <Text style={styles.progressText}>
                {selectedPeriod === 'week' ? 'इस सप्ताह' : selectedPeriod === 'year' ? 'इस साल' : 'इस महीने'}
              </Text>
            </View>
          </View>
        </Surface>



        {/* Performance Summary */}
        <Surface style={styles.summaryContainer}>
          <Title style={styles.sectionTitle}>प्रदर्शन सारांश</Title>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>सर्वाधिक सक्रिय दिन:</Text>
            <Text style={styles.summaryValue}>मंगलवार (19 गतिविधियां)</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>औसत दैनिक वितरण:</Text>
            <Text style={styles.summaryValue}>12 पौधे प्रति दिन</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>पिछले महीने से वृद्धि:</Text>
            <Text style={[styles.summaryValue, styles.positiveGrowth]}>+15% ⬆️</Text>
          </View>
        </Surface>

        {/* Action Buttons */}
        <Surface style={styles.actionContainer}>
          <Button
            mode="contained"
            icon="file-excel"
            style={styles.actionButton}
            buttonColor="#4CAF50"
            onPress={exportReport}
          >
            Excel में निर्यात करें
          </Button>
          <Button
            mode="outlined"
            icon="share-variant"
            style={styles.actionButton}
            textColor="#4CAF50"
            onPress={shareReport}
          >
            रिपोर्ट साझा करें
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
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
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
  metricsContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
    width: '100%',
  },
  progressText: {
    fontSize: 10,
    color: '#888888',
    textAlign: 'center',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'right',
    flex: 1,
  },
  positiveGrowth: {
    color: '#4CAF50',
  },
  divider: {
    backgroundColor: '#E0E0E0',
  },
  actionContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  actionButton: {
    marginBottom: 12,
    borderRadius: 8,
  },
});
