import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, FAB, Chip, DataTable } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface AdminDashboardProps {
  navigation: any;
}

export default function AdminDashboard({ navigation }: AdminDashboardProps) {
  const [districtStats] = useState({
    totalAnganwadis: 156,
    totalFamilies: 2847,
    totalPlants: 28470,
    activePlants: 25623,
    survivalRate: 90.1,
    activeParticipation: 78.5,
  });

  const [recentReports] = useState([
    { id: 1, anganwadi: 'आंगनबाड़ी #123', families: 45, plants: 450, status: 'उत्कृष्ट' },
    { id: 2, anganwadi: 'आंगनबाड़ी #124', families: 38, plants: 380, status: 'अच्छा' },
    { id: 3, anganwadi: 'आंगनबाड़ी #125', families: 42, plants: 420, status: 'उत्कृष्ट' },
    { id: 4, anganwadi: 'आंगनबाड़ी #126', families: 35, plants: 350, status: 'सुधार आवश्यक' },
  ]);

  const handleViewDetailedReport = () => {
    navigation.navigate('DetailedReport');
  };

  const handleExportData = () => {
    navigation.navigate('ExportData');
  };

  const handleManageAnganwadis = () => {
    navigation.navigate('ManageAnganwadis');
  };

  const handleViewNutritionImpact = () => {
    navigation.navigate('NutritionImpact');
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
                <Text style={styles.logoText}>👨‍💼</Text>
              </View>
            </View>
            <View style={styles.headerText}>
              <Title style={styles.headerTitle}>प्रशासक डैशबोर्ड</Title>
              <Paragraph style={styles.headerSubtitle}>जिला: मथुरा</Paragraph>
            </View>
          </View>
        </Surface>

        {/* District Overview Stats */}
        <Surface style={styles.overviewContainer}>
          <Title style={styles.sectionTitle}>जिला सारांश</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{districtStats.totalAnganwadis}</Text>
              <Text style={styles.statLabel}>आंगनबाड़ी केंद्र</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{districtStats.totalFamilies}</Text>
              <Text style={styles.statLabel}>कुल परिवार</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{districtStats.totalPlants}</Text>
              <Text style={styles.statLabel}>कुल पौधे</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{districtStats.activePlants}</Text>
              <Text style={styles.statLabel}>सक्रिय पौधे</Text>
            </View>
          </View>
        </Surface>

        {/* Key Performance Indicators */}
        <Surface style={styles.kpiContainer}>
          <Title style={styles.sectionTitle}>प्रमुख संकेतक</Title>
          <View style={styles.kpiGrid}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiNumber}>{districtStats.survivalRate}%</Text>
              <Text style={styles.kpiLabel}>पौधा जीवन दर</Text>
              <View style={styles.kpiProgress}>
                <View style={[styles.kpiBar, { width: `${districtStats.survivalRate}%` }]} />
              </View>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiNumber}>{districtStats.activeParticipation}%</Text>
              <Text style={styles.kpiLabel}>सक्रिय भागीदारी</Text>
              <View style={styles.kpiProgress}>
                <View style={[styles.kpiBar, { width: `${districtStats.activeParticipation}%` }]} />
              </View>
            </View>
          </View>
        </Surface>

        {/* Quick Actions */}
        <Surface style={styles.actionsContainer}>
          <Title style={styles.sectionTitle}>प्रशासनिक कार्य</Title>
          <View style={styles.actionGrid}>
            <Button 
              mode="contained" 
              icon="chart-bar"
              style={styles.actionButton}
              buttonColor="#4CAF50"
              onPress={handleViewDetailedReport}
            >
              विस्तृत रिपोर्ट
            </Button>
            <Button 
              mode="contained" 
              icon="download"
              style={styles.actionButton}
              buttonColor="#2E7D32"
              onPress={handleExportData}
            >
              डेटा निर्यात
            </Button>
            <Button 
              mode="outlined" 
              icon="account-group"
              style={styles.actionButton}
              textColor="#4CAF50"
              onPress={handleManageAnganwadis}
            >
              केंद्र प्रबंधन
            </Button>
            <Button 
              mode="outlined" 
              icon="food-apple"
              style={styles.actionButton}
              textColor="#4CAF50"
              onPress={handleViewNutritionImpact}
            >
              पोषण प्रभाव
            </Button>
          </View>
        </Surface>

        {/* Recent Anganwadi Performance */}
        <Surface style={styles.performanceContainer}>
          <Title style={styles.sectionTitle}>हाल का प्रदर्शन</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.tableHeader}>केंद्र</DataTable.Title>
              <DataTable.Title numeric style={styles.tableHeader}>परिवार</DataTable.Title>
              <DataTable.Title numeric style={styles.tableHeader}>पौधे</DataTable.Title>
              <DataTable.Title style={styles.tableHeader}>स्थिति</DataTable.Title>
            </DataTable.Header>

            {recentReports.map((report) => (
              <DataTable.Row key={report.id}>
                <DataTable.Cell style={styles.tableCell}>{report.anganwadi}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.tableCell}>{report.families}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.tableCell}>{report.plants}</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  <Chip 
                    style={[
                      styles.statusChip, 
                      { backgroundColor: report.status === 'उत्कृष्ट' ? '#E8F5E8' : 
                                        report.status === 'अच्छा' ? '#FFF3E0' : '#FFEBEE' }
                    ]} 
                    textStyle={[
                      styles.statusText,
                      { color: report.status === 'उत्कृष्ट' ? '#4CAF50' : 
                               report.status === 'अच्छा' ? '#FF9800' : '#F44336' }
                    ]}
                  >
                    {report.status}
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Surface>

        {/* Health Impact Summary */}
        <Surface style={styles.impactContainer}>
          <Title style={styles.sectionTitle}>स्वास्थ्य प्रभाव सारांश</Title>
          <View style={styles.impactGrid}>
            <View style={styles.impactCard}>
              <Text style={styles.impactEmoji}>📈</Text>
              <Text style={styles.impactNumber}>+15%</Text>
              <Text style={styles.impactLabel}>आयरन स्तर में सुधार</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactEmoji}>👶</Text>
              <Text style={styles.impactNumber}>-12%</Text>
              <Text style={styles.impactLabel}>कुपोषण दर में कमी</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactEmoji}>🌱</Text>
              <Text style={styles.impactNumber}>28470</Text>
              <Text style={styles.impactLabel}>पौधे लगाए गए</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactEmoji}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.impactNumber}>2847</Text>
              <Text style={styles.impactLabel}>परिवार लाभान्वित</Text>
            </View>
          </View>
        </Surface>

        {/* Environmental Impact */}
        <Surface style={styles.environmentContainer}>
          <Title style={styles.sectionTitle}>पर्यावरणीय प्रभाव</Title>
          <View style={styles.environmentCard}>
            <Text style={styles.environmentEmoji}>🌍</Text>
            <Text style={styles.environmentTitle}>कार्बन फुटप्रिंट कमी</Text>
            <Text style={styles.environmentDesc}>
              {districtStats.totalPlants} पौधों ने लगभग {Math.round(districtStats.totalPlants * 0.5)} टन CO2 अवशोषित किया है
            </Text>
            <View style={styles.environmentStats}>
              <View style={styles.envStat}>
                <Text style={styles.envStatNumber}>{Math.round(districtStats.totalPlants * 0.5)}</Text>
                <Text style={styles.envStatLabel}>टन CO2 कमी</Text>
              </View>
              <View style={styles.envStat}>
                <Text style={styles.envStatNumber}>{districtStats.totalPlants * 10}</Text>
                <Text style={styles.envStatLabel}>किलो ऑक्सीजन</Text>
              </View>
            </View>
          </View>
        </Surface>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="chart-line"
        style={styles.fab}
        onPress={handleViewDetailedReport}
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
  overviewContainer: {
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
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
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
  kpiContainer: {
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
  kpiGrid: {
    gap: 16,
  },
  kpiCard: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  kpiNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  kpiProgress: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  kpiBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
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
  performanceContainer: {
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
  tableHeader: {
    flex: 1,
  },
  tableCell: {
    flex: 1,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
  },
  impactContainer: {
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
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  impactCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  impactEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  impactNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  environmentContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  environmentCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  environmentEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  environmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  environmentDesc: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  environmentStats: {
    flexDirection: 'row',
    gap: 20,
  },
  envStat: {
    alignItems: 'center',
  },
  envStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  envStatLabel: {
    fontSize: 11,
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