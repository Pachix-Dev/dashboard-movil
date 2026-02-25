import { FlatList, StyleSheet, View } from 'react-native'

import { Card } from '@/components/card'
import { HelloWave } from '@/components/hello-wave'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { getLatestGames } from '@/lib/metacritic'
import { useEffect, useState } from 'react'

export default function HomeScreen() {
  const [games, setGames] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getLatestGames()
      .then((games) => {
        setGames(games)
      })
      .catch((err) => {
        console.error('Failed to fetch games:', err)
        setError('Error al cargar los juegos')
      })
  }, [])

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>
          Hola estoy aprendiendo React Native!
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Últimos juegos gratuitos:</ThemedText>
        {error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}
        {games.length === 0 && !error && (
          <ThemedText>Cargando juegos...</ThemedText>
        )}
        <FlatList
          data={games.slice(0, 10)}
          keyExtractor={(game) => game.id}
          renderItem={({ item: game }) => <Card game={game} />}
        />
      </ThemedView>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepContainer: {
    gap: 4,
    marginBottom: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
