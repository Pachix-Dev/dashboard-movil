// components/UserMenuSimple.tsx
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { HelloWave } from './hello-wave'

export default function UserMenuSimple() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  if (!user) return null

  const fullName =
    user.fullName ||
    `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ||
    user.primaryEmailAddress?.emailAddress ||
    'User'

  const goProfile = () => {
    setOpen(false)
    router.push('/(protected)/(tabs)/profile')
  }

  const onSignOut = async () => {
    setOpen(false)
    await signOut()
    router.replace('/(public)/sign-in')
  }

  return (
    <>
      <View className='flex-row items-center gap-3'>
        <Pressable onPress={() => setOpen(true)} hitSlop={10}>
          <Image
            source={{ uri: user.imageUrl }}
            className='h-10 w-10 rounded-full bg-gray-200 object-top object-cover'
          />
        </Pressable>
        <View>
          <Text
            className='text-[18px] font-semibold text-gray-900'
            numberOfLines={1}
          >
            Hi, {fullName} <HelloWave />
          </Text>
          <Text className='text-gray-500 text-lg'>welcome back!</Text>
        </View>
      </View>
      {/* Dropdown */}
      <Modal
        transparent
        visible={open}
        animationType='fade'
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className='flex-1 bg-black/20'
          onPress={() => setOpen(false)}
        >
          {/* Caja del menú */}
          <View className='absolute right-4 top-20 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow'>
            <TouchableOpacity
              onPress={goProfile}
              className='px-4 py-3 active:bg-gray-50'
            >
              <Text className='text-[14px] font-semibold text-gray-900'>
                Profile
              </Text>
            </TouchableOpacity>

            <View className='h-px bg-gray-200' />

            <TouchableOpacity
              onPress={onSignOut}
              className='px-4 py-3 active:bg-gray-50'
            >
              <Text className='text-[14px] font-semibold text-red-700'>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  )
}
