import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Community, fetchCommunities } from '@/services/api';


export default function TabTwoScreen() {
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities()
      .then(setCommunities)
      .catch(error => {
        console.error(error);
        Alert.alert('Erreur', "Impossible de récupérer les communautés");
      })
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: Community }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/community/${item.id}`)}
    >
      
      <Image source={ require(`@/assets/images/cr7.jpg`)  } style={styles.image} />
      <ThemedView style={styles.info}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedText>{item.description}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/choose-comunity.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.titleRow}>
        <TouchableOpacity style={styles.smallButton} onPress={() => console.log('Sort')}>
          <ThemedText style={styles.smallButtonText}>Sort</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={() => console.log('Filter')}>
          <ThemedText style={styles.smallButtonText}>Filter</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton} onPress={() => router.push('/create-token')}>
          <ThemedText style={styles.createButtonText}>Create</ThemedText>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={communities}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  smallButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  smallButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  createButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});