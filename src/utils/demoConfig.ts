// Demo Configuration for Har Ghar Munga App
// This file contains demo credentials and settings for testing purposes

export const DEMO_CONFIG = {
  // Demo Login Credentials
  DEMO_CREDENTIALS: {
    PASSWORD: 'hgm@2025',
    USERS: {
      ADMIN: {
        username: 'CGCO001',
        role: 'admin',
        name: 'प्रशासक',
        centerCode: 'ADMIN-001',
        centerName: 'मुख्य कार्यालय',
        district: 'मथुरा',
        block: 'मथुरा'
      },
      ANGANWADI: {
        username: 'CGAB001',
        role: 'anganwadi',
        name: 'श्रीमती सुनीता देवी',
        centerCode: 'AWC-123-DLH',
        centerName: 'सरस्वती आंगनबाड़ी केंद्र',
        district: 'मथुरा',
        block: 'मथुरा'
      },
      FAMILY: {
        username: 'CGPV001',
        role: 'family',
        name: 'राम कुमार',
        centerCode: 'AWC-123-DLH',
        centerName: 'सरस्वती आंगनबाड़ी केंद्र',
        district: 'मथुरा',
        block: 'मथुरा'
      }
    }
  },

  // Demo Data for Testing
  DEMO_DATA: {
    // Sample families for search and listing
    FAMILIES: [
      {
        id: '001',
        childName: 'राहुल कुमार',
        parentName: 'सुनील कुमार',
        mobileNumber: '9876543210',
        village: 'शिवपुर',
        registrationDate: '13/07/2025',
        plantDistributed: true,
        centerCode: 'AWC-123-DLH',
        centerName: 'सरस्वती आंगनबाड़ी केंद्र',
        workerName: 'श्रीमती सुनीता देवी',
        status: 'active'
      },
      {
        id: '002',
        childName: 'प्रिया शर्मा',
        parentName: 'राजेश शर्मा',
        mobileNumber: '9876543211',
        village: 'रामपुर',
        registrationDate: '13/07/2025',
        plantDistributed: false,
        centerCode: 'AWC-123-DLH',
        centerName: 'सरस्वती आंगनबाड़ी केंद्र',
        workerName: 'श्रीमती सुनीता देवी',
        status: 'active'
      },
      {
        id: '003',
        childName: 'अनिल सिंह',
        parentName: 'सीता देवी',
        mobileNumber: '9876543212',
        village: 'गोकुलपुर',
        registrationDate: '12/07/2025',
        plantDistributed: false,
        centerCode: 'AWC-123-DLH',
        centerName: 'सरस्वती आंगनबाड़ी केंद्र',
        workerName: 'श्रीमती सुनीता देवी',
        status: 'active'
      }
    ],

    // Dashboard statistics
    DASHBOARD_STATS: {
      totalFamilies: 156,
      distributedPlants: 128,
      activeFamilies: 142,
      successRate: 98,
      recentActivities: [
        {
          date: '15 जुलाई 2025',
          activity: 'राम परिवार को मुंगा के पौधे दिए गए',
          type: 'distribution'
        },
        {
          date: '14 जुलाई 2025',
          activity: 'श्याम परिवार द्वारा फोटो अपलोड की गई',
          type: 'photo_upload'
        },
        {
          date: '13 जुलाई 2025',
          activity: 'गीता परिवार को नए पौधे दिए गए',
          type: 'distribution'
        }
      ]
    },

    // Progress report data
    PROGRESS_REPORTS: {
      week: {
        totalFamilies: 28,
        distributedPlants: 35,
        successRate: 95,
        newAdded: 12,
        activities: [
          { date: '15 जुलाई 2025', activity: 'राम परिवार को पौधा वितरित', type: 'distribution' },
          { date: '14 जुलाई 2025', activity: 'सीता देवी ने फोटो अपलोड किया', type: 'photo_upload' },
          { date: '13 जुलाई 2025', activity: 'नया परिवार पंजीकृत', type: 'registration' }
        ]
      },
      month: {
        totalFamilies: 156,
        distributedPlants: 128,
        successRate: 98,
        newAdded: 45,
        activities: [
          { date: '15 जुलाई 2025', activity: 'राम परिवार को मुंगा के पौधे दिए गए', type: 'distribution' },
          { date: '14 जुलाई 2025', activity: 'श्याम परिवार द्वारा फोटो अपलोड की गई', type: 'photo_upload' },
          { date: '13 जुलाई 2025', activity: 'गीता परिवार को नए पौधे दिए गए', type: 'distribution' },
          { date: '12 जुलाई 2025', activity: 'अनिल परिवार का पंजीकरण हुआ', type: 'registration' },
          { date: '11 जुलाई 2025', activity: 'सुनीता परिवार ने प्रगति फोटो भेजी', type: 'photo_upload' }
        ]
      },
      year: {
        totalFamilies: 890,
        distributedPlants: 756,
        successRate: 99,
        newAdded: 245,
        activities: [
          { date: '15 जुलाई 2025', activity: 'राम परिवार को मुंगा के पौधे दिए गए', type: 'distribution' },
          { date: '14 जुलाई 2025', activity: 'श्याम परिवार द्वारा फोटो अपलोड की गई', type: 'photo_upload' },
          { date: '13 जुलाई 2025', activity: 'गीता परिवार को नए पौधे दिए गए', type: 'distribution' }
        ]
      }
    },

    // Plant options
    PLANT_OPTIONS: [
      { id: 1, name: 'Munga 1', hindiName: 'मुंगा 1', emoji: '🌱', description: 'मुंगा किस्म 1' },
      { id: 2, name: 'Munga 2', hindiName: 'मुंगा 2', emoji: '🌱', description: 'मुंगा किस्म 2' },
      { id: 3, name: 'Munga 3', hindiName: 'मुंगा 3', emoji: '🌱', description: 'मुंगा किस्म 3' },
      { id: 4, name: 'Munga 4', hindiName: 'मुंगा 4', emoji: '🌱', description: 'मुंगा किस्म 4' },
      { id: 5, name: 'Munga 5', hindiName: 'मुंगा 5', emoji: '🌱', description: 'मुंगा किस्म 5' },
      { id: 6, name: 'Munga 6', hindiName: 'मुंगा 6', emoji: '🌱', description: 'मुंगा किस्म 6' },
      { id: 7, name: 'Munga 7', hindiName: 'मुंगा 7', emoji: '🌱', description: 'मुंगा किस्म 7' },
      { id: 8, name: 'Munga 8', hindiName: 'मुंगा 8', emoji: '🌱', description: 'मुंगा किस्म 8' },
      { id: 9, name: 'Munga 9', hindiName: 'मुंगा 9', emoji: '🌱', description: 'मुंगा किस्म 9' },
      { id: 10, name: 'Munga 10', hindiName: 'मुंगा 10', emoji: '🌱', description: 'मुंगा किस्म 10' }
    ]
  },

  // Demo Settings
  SETTINGS: {
    LOADING_DELAY: 1500, // milliseconds
    REGISTRATION_DELAY: 2000, // milliseconds
    ENABLE_DEMO_MODE: true, // Set to false to use real API
    SHOW_DEMO_BANNER: true // Show demo mode indicator
  }
};

// Helper functions for demo mode
export const isDemoMode = () => DEMO_CONFIG.SETTINGS.ENABLE_DEMO_MODE;

export const getDemoUser = (username: string) => {
  const upperUsername = username.toUpperCase();
  return Object.values(DEMO_CONFIG.DEMO_CREDENTIALS.USERS).find(
    user => user.username === upperUsername
  );
};

export const validateDemoCredentials = (username: string, password: string) => {
  if (password !== DEMO_CONFIG.DEMO_CREDENTIALS.PASSWORD) {
    return { valid: false, message: 'गलत पासवर्ड!' };
  }
  
  const user = getDemoUser(username);
  if (!user) {
    return { valid: false, message: 'गलत उपयोगकर्ता नाम!' };
  }
  
  return { valid: true, user };
}; 