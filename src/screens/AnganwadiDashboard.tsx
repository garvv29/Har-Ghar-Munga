import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, FAB, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface AnganwadiDashboardProps {
  navigation: any;
}

export default function AnganwadiDashboard({ navigation }: AnganwadiDashboardProps) {
  const [stats] = useState({
    totalPlants: 45,
    distributedPlants: 38,
    activeFamilies: 32,
    pendingRegistrations: 5,
  });

  const handleAddFamily = () => {
    navigation.navigate('AddFamily');
  };

  const handleDistributePlant = () => {
    navigation.navigate('DistributePlant');
  };

  const handleViewProgress = () => {
    navigation.navigate('ProgressReport');
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
                <Text style={styles.logoText}>आं</Text>
              </View>
            </View>
            <View style={styles.headerText}>
              <Title style={styles.headerTitle}>आंगनबाड़ी डैशबोर्ड</Title>
              <Paragraph style={styles.headerSubtitle}>केंद्र: आंगनबाड़ी #123</Paragraph>
            </View>
          </View>
        </Surface>

        {/* Quick Stats */}
        <Surface style={styles.statsContainer}>
          <Title style={styles.sectionTitle}>आज का सारांश</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalPlants}</Text>
              <Text style={styles.statLabel}>कुल पौधे</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.distributedPlants}</Text>
              <Text style={styles.statLabel}>वितरित पौधे</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.activeFamilies}</Text>
              <Text style={styles.statLabel}>सक्रिय परिवार</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.pendingRegistrations}</Text>
              <Text style={styles.statLabel}>लंबित पंजीकरण</Text>
            </View>
          </View>
        </Surface>

        {/* Quick Actions */}
        <Surface style={styles.actionsContainer}>
          <Title style={styles.sectionTitle}>त्वरित कार्य</Title>
          <View style={styles.actionButtons}>
            <Button 
              mode="contained" 
              icon="account-plus"
              style={styles.actionButton}
              buttonColor="#4CAF50"
              onPress={handleAddFamily}
            >
              नया परिवार जोड़ें
            </Button>
            <Button 
              mode="contained" 
              icon="sprout"
              style={styles.actionButton}
              buttonColor="#2E7D32"
              onPress={handleDistributePlant}
            >
              पौधा वितरित करें
            </Button>
            <Button 
              mode="outlined" 
              icon="chart-line"
              style={styles.actionButton}
              textColor="#4CAF50"
              onPress={handleViewProgress}
            >
              प्रगति रिपोर्ट
            </Button>
          </View>
        </Surface>

        {/* Recent Activities */}
        <Surface style={styles.activitiesContainer}>
          <Title style={styles.sectionTitle}>हाल की गतिविधियां</Title>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityEmoji}>🌱</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>राम कुमार को पौधा वितरित</Text>
                <Text style={styles.activityTime}>आज, 2:30 PM</Text>
                <Chip style={styles.statusChip} textStyle={styles.statusText}>वितरित</Chip>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityEmoji}>📸</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>सीता देवी ने फोटो अपलोड किया</Text>
                <Text style={styles.activityTime}>कल, 4:15 PM</Text>
                <Chip style={styles.statusChip} textStyle={styles.statusText}>अपडेट</Chip>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityEmoji}>👨‍👩‍👧‍👦</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>नया परिवार पंजीकृत</Text>
                <Text style={styles.activityTime}>कल, 11:20 AM</Text>
                <Chip style={styles.statusChip} textStyle={styles.statusText}>नया</Chip>
              </View>
            </View>
          </View>
        </Surface>

        {/* Plant Health Summary */}
        <Surface style={styles.healthContainer}>
          <Title style={styles.sectionTitle}>पौधा स्वास्थ्य सारांश</Title>
          <View style={styles.healthStats}>
            <View style={styles.healthCard}>
              <Text style={styles.healthNumber}>85%</Text>
              <Text style={styles.healthLabel}>स्वस्थ पौधे</Text>
            </View>
            <View style={styles.healthCard}>
              <Text style={styles.healthNumber}>12%</Text>
              <Text style={styles.healthLabel}>ध्यान आवश्यक</Text>
            </View>
            <View style={styles.healthCard}>
              <Text style={styles.healthNumber}>3%</Text>
              <Text style={styles.healthLabel}>समस्या</Text>
            </View>
          </View>
        </Surface>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleAddFamily}
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
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
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
  statsContainer: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
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
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    marginBottom: 8,
  },
  activitiesContainer: {
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
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statusChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E8',
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 10,
  },
  healthContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  healthStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  healthCard: {
    alignItems: 'center',
  },
  healthNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  healthLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
}); 