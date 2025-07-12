import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Community = {
  id: string;
  name: string;
  description: string;
  image: any;
};

const COMMUNITIES: Community[] = [
  {
    id: '1',
    name: 'CR7',
    description: 'Christiano Ronaldo',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '2',
    name: 'LeBron23',
    description: 'LeBron James',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '3',
    name: 'M10',
    description: 'Lionel Messi',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '4',
    name: 'KillianSpeed',
    description: 'Kylian Mbappé',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '5',
    name: 'JujuBike',
    description: 'Julien Dupont – VTT freestyle',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '6',
    name: 'ZionDunk',
    description: 'Zion Williamson',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '7',
    name: 'SerenaSmash',
    description: 'Serena Williams',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '8',
    name: 'NoahServe',
    description: 'Noah Roland – Tennis junior',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '9',
    name: 'AyaFighter',
    description: 'Aya Shibata – MMA Japon',
    image: require('@/assets/images/cr7.jpg'),
  },
  {
    id: '10',
    name: 'YassirSprint',
    description: 'Yassir Ben Khaled – Sprinteur U23',
    image: require('@/assets/images/cr7.jpg'),
  },
];

export default function TabTwoScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Community }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/community/${item.id}`)}
    >
      <Image source={item.image} style={styles.image} />
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

      <FlatList
        data={COMMUNITIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
  color: 'black'
},

createButton: {
  backgroundColor: '#FFD700',
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 8,
  color: 'black'
},

createButtonText: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#000',
},
});