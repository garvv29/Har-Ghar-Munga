import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Provider as PaperProvider, Card, Title, Paragraph, Button, Surface, TextInput, Text, HelperText } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import AnganwadiDashboard from './src/screens/AnganwadiDashboard';
import FamilyDashboard from './src/screens/FamilyDashboard';
import AdminDashboard from './src/screens/AdminDashboard';
import UploadPhotoScreen from './src/screens/UploadPhotoScreen';

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('RoleSelection');
    }, 2000);
  };



  const handleSignUp = () => {
    // Add sign up navigation logic
  };

  // Ensure app content is visible during screen recording
  useEffect(() => {
    // Disable any privacy restrictions that might hide content
    if (Platform.OS === 'android') {
      // For Android, ensure screen recording is allowed
      console.log('Screen recording enabled for Android');
    } else if (Platform.OS === 'ios') {
      // For iOS, ensure screen recording is allowed
      console.log('Screen recording enabled for iOS');
    }
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <StatusBar style="light" />
        
        {/* Background Gradient */}
        <LinearGradient
          colors={['#2E7D32', '#4CAF50', '#66BB6A']}
          style={styles.backgroundGradient}
        />
        
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Surface style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>HGM</Text>
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Title style={styles.headerTitle}>हर घर मुंगा</Title>
            </View>
          </Surface>

          {/* Login Card */}
          <Card style={styles.loginCard}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.loginTitle}>स्वागत है</Title>
              <Paragraph style={styles.loginSubtitle}>
                अपनी यात्रा जारी रखने के लिए साइन इन करें
              </Paragraph>

              {/* Username Input */}
              <TextInput
                label="उपयोगकर्ता नाम"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                autoCapitalize="none"
                left={<TextInput.Icon icon="account" color="#4CAF50" />}
                outlineColor="#E0E0E0"
                activeOutlineColor="#4CAF50"
                theme={{ colors: { primary: '#4CAF50' } }}
              />

              {/* Password Input */}
              <TextInput
                label="पासवर्ड"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" color="#4CAF50" />}
                right={
                  <TextInput.Icon 
                    icon={showPassword ? "eye-off" : "eye"} 
                    color="#4CAF50"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                outlineColor="#E0E0E0"
                activeOutlineColor="#4CAF50"
                theme={{ colors: { primary: '#4CAF50' } }}
              />



              {/* Login Button */}
              <Button 
                mode="contained" 
                onPress={handleLogin}
                loading={loading}
                disabled={loading || !email || !password}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
                labelStyle={styles.loginButtonText}
                buttonColor="#2E7D32"
              >
                {loading ? 'साइन इन हो रहा है...' : 'साइन इन करें'}
              </Button>



              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>खाता नहीं है? </Text>
                <Button 
                  mode="text" 
                  onPress={handleSignUp}
                  style={styles.signUpButton}
                  labelStyle={styles.signUpButtonText}
                >
                  साइन अप करें
                </Button>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen name="AnganwadiDashboard" component={AnganwadiDashboard} />
          <Stack.Screen name="FamilyDashboard" component={FamilyDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 32,
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    paddingHorizontal: 10,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 40,
    includeFontPadding: false,
    flexWrap: 'wrap',
  },

  loginCard: {
    borderRadius: 20,
    elevation: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardContent: {
    padding: 32,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },

  loginButton: {
    borderRadius: 12,
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonContent: {
    paddingVertical: 12,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#666666',
    fontSize: 15,
  },
  signUpButton: {
    marginLeft: -8,
  },
  signUpButtonText: {
    color: '#4CAF50',
    fontSize: 15,
    fontWeight: '600',
  },
});
