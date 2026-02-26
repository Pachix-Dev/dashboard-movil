import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'

export default function PublicLayout() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return null

  // Si ya inició sesión, entra al área protegida
  if (isSignedIn) {
    return <Redirect href='/(protected)/(tabs)' />
  }

  return (
    <Stack initialRouteName='sign-in' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='sign-in' />
      <Stack.Screen name='sign-up' />
    </Stack>
  )
}
