import { Image, Text, View } from 'react-native'
import { ThemedText } from './themed-text'

interface Game {
  id: string
  thumbnail: string
  title: string
  short_description: string
}

export function Card({ game }: { game: Game }) {
  return (
    <View
      key={game.id}
      className='flex-row gap-4 items-start space-x-4 p-4 bg-sky-400 dark:bg-sky-700 rounded-lg shadow-md mb-4'
    >
      <Image
        source={{ uri: game.thumbnail }}
        style={{ width: 100, height: 150, borderRadius: 8 }}
      />
      <View className='flex-1'>
        <ThemedText>{game.title} </ThemedText>
        <Text className='text-white'>{game.short_description}</Text>
      </View>
    </View>
  )
}
