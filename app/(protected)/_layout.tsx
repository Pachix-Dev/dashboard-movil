import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'

export default function ProtectedLayout() {
  const { isLoaded, isSignedIn } = useAuth()

  // Evita render mientras Clerk carga
  if (!isLoaded) return null

  // Si no hay sesión, volver a login
  if (!isSignedIn) {
    return <Redirect href='/(public)/sign-in' />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}
