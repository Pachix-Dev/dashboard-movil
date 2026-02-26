import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'
import { AuthProvider } from '../lib/auth/AuthProvider'

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'top', 'left']}>
      <AuthProvider>
        <Stack
          initialRouteName='(public)'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='(public)' />
          <Stack.Screen name='(protected)' />
        </Stack>
      </AuthProvider>
    </SafeAreaView>
  )
}
