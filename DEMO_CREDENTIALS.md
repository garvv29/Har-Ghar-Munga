# Har Ghar Munga - Demo Credentials

## 🚀 Demo Login Credentials

### **Password for all users:** `hgm@2025`

### **Admin User**
- **Username:** `CGCO001`
- **Role:** Admin
- **Access:** Admin Dashboard with district-wide statistics

### **Anganwadi Worker**
- **Username:** `CGAB001`
- **Role:** Anganwadi Worker
- **Access:** Anganwadi Dashboard with family management

### **Family User**
- **Username:** `CGPV001`
- **Role:** Family
- **Access:** Family Dashboard with plant tracking

## 📱 How to Use

1. **Open the app**
2. **Enter any of the above usernames**
3. **Enter password:** `hgm@2025`
4. **Press Login button**
5. **You'll be redirected to the appropriate dashboard based on the username**

## 🔄 Switching to Real API

When you're ready to use real API:

1. **Update `src/utils/demoConfig.ts`**
   - Set `ENABLE_DEMO_MODE: false`
2. **Update `src/utils/api.ts`**
   - Change `API_BASE_URL` to your actual backend URL
3. **The app will automatically switch to real API calls**

## 📊 Demo Data

The app includes realistic demo data for:
- ✅ Family registrations
- ✅ Progress reports
- ✅ Dashboard statistics
- ✅ Recent activities
- ✅ Plant options

## 🎯 Features Available in Demo Mode

- **Login/Logout** - Working with demo credentials
- **Family Registration** - Simulated registration process
- **Photo Upload** - Camera and gallery integration
- **Progress Reports** - Period-based reports (week/month/year)
- **Family Search** - Search and filter functionality
- **Dashboard Stats** - Realistic statistics display
- **Plant Options** - Available plant varieties

## 🔧 Technical Notes

- **API Structure:** All API endpoints are defined and ready for backend integration
- **TypeScript:** Full type safety with proper interfaces
- **Error Handling:** Comprehensive error handling for both demo and real API modes
- **Loading States:** Proper loading indicators throughout the app
- **Responsive Design:** Works on all screen sizes

## 🚀 Ready for Production

The app is production-ready with:
- ✅ Clean, modern UI
- ✅ Hindi language support
- ✅ Role-based access control
- ✅ Complete feature set
- ✅ API integration ready
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation

Just switch to real API when your backend is ready! 🌱 