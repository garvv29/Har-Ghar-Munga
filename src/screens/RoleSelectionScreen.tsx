import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface RoleSelectionScreenProps {
  navigation: any;
}

export default function RoleSelectionScreen({ navigation }: RoleSelectionScreenProps) {
  const handleRoleSelection = (role: string) => {
    // Navigate to appropriate dashboard based on role
    switch (role) {
      case 'admin':
        navigation.navigate('AdminDashboard');
        break;
      case 'anganwadi':
        navigation.navigate('AnganwadiDashboard');
        break;
      case 'family':
        navigation.navigate('FamilyDashboard');
        break;
    }
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
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>मूं</Text>
            </View>
          </View>
          <Title style={styles.headerTitle}>प्रोजेक्ट मूंनगा</Title>
          <Paragraph style={styles.headerSubtitle}>अपनी भूमिका चुनें</Paragraph>
        </Surface>

        {/* Role Selection Cards */}
        <View style={styles.roleContainer}>
          {/* Admin Role */}
          <Card style={styles.roleCard} onPress={() => handleRoleSelection('admin')}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Text style={styles.roleIcon}>👨‍💼</Text>
              </View>
              <Title style={styles.roleTitle}>प्रशासक</Title>
              <Paragraph style={styles.roleDescription}>
                महिला एवं बाल विकास विभाग के अधिकारी
              </Paragraph>
              <Paragraph style={styles.roleFeatures}>
                • पौधा वितरण ट्रैकिंग{'\n'}
                • प्रगति रिपोर्ट{'\n'}
                • डैशबोर्ड प्रबंधन
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                style={styles.roleButton}
                buttonColor="#2E7D32"
                onPress={() => handleRoleSelection('admin')}
              >
                प्रवेश करें
              </Button>
            </Card.Actions>
          </Card>

          {/* Anganwadi Worker Role */}
          <Card style={styles.roleCard} onPress={() => handleRoleSelection('anganwadi')}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Text style={styles.roleIcon}>👩‍⚕️</Text>
              </View>
              <Title style={styles.roleTitle}>आंगनबाड़ी कार्यकर्ता</Title>
              <Paragraph style={styles.roleDescription}>
                आंगनबाड़ी केंद्र के कार्यकर्ता
              </Paragraph>
              <Paragraph style={styles.roleFeatures}>
                • पौधा वितरण{'\n'}
                • परिवार रजिस्ट्रेशन{'\n'}
                • प्रगति अपडेट
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                style={styles.roleButton}
                buttonColor="#2E7D32"
                onPress={() => handleRoleSelection('anganwadi')}
              >
                प्रवेश करें
              </Button>
            </Card.Actions>
          </Card>

          {/* Family User Role */}
          <Card style={styles.roleCard} onPress={() => handleRoleSelection('family')}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Text style={styles.roleIcon}>👨‍👩‍👧‍👦</Text>
              </View>
              <Title style={styles.roleTitle}>परिवार सदस्य</Title>
              <Paragraph style={styles.roleDescription}>
                बच्चे के परिवार के सदस्य
              </Paragraph>
              <Paragraph style={styles.roleFeatures}>
                • पौधा देखभाल{'\n'}
                • फोटो अपलोड{'\n'}
                • पोषण गाइड
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                style={styles.roleButton}
                buttonColor="#2E7D32"
                onPress={() => handleRoleSelection('family')}
              >
                प्रवेश करें
              </Button>
            </Card.Actions>
          </Card>
        </View>
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
  },
  header: {
    paddingTop: 28,
    paddingBottom: 36,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    elevation: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 36,
    includeFontPadding: false,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  roleContainer: {
    gap: 20,
  },
  roleCard: {
    borderRadius: 20,
    elevation: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIcon: {
    fontSize: 40,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  roleFeatures: {
    fontSize: 13,
    color: '#4CAF50',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  roleButton: {
    borderRadius: 12,
    marginTop: 8,
    width: '100%',
  },
}); 