import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ResizeMode, Video } from 'expo-av';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { default as React, useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const screenDefaultRatio = screenWidth / (screenWidth * 0.5625); // ratio 16:9 par défaut
const [videoRatio, setVideoRatio] = useState(screenDefaultRatio);

type Post = {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;     // URL de l'image ou vidéo, ou texte si type text
  text?: string;       // texte optionnel à afficher sous la media
  likes: number;
  comments: number;
  createdAt: string;
};

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    type: 'image',
    content: 'https://picsum.photos/600/400',
    text: "Super but marqué hier par CR7 ! 🚀",
    likes: 128,
    comments: 32,
    createdAt: '2025-07-11T15:00:00Z',
  },
  {
    id: '2',
    type: 'video',
    content: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    text: "Revivez les temps forts du match 📹",
    likes: 256,
    comments: 85,
    createdAt: '2025-07-12T11:00:00Z',
  },
  {
    id: '3',
    type: 'image',
    content: 'https://picsum.photos/800/500',
    text: "Moment convivial avec les fans !",
    likes: 92,
    comments: 14,
    createdAt: '2025-07-12T13:30:00Z',
  },
  {
    id: '4',
    type: 'text',
    content: "Merci à tous pour votre incroyable soutien ! 🙏",
    text: undefined,
    likes: 47,
    comments: 9,
    createdAt: '2025-07-12T14:45:00Z',
  },
  {
    id: '5',
    type: 'image',
    content: 'https://picsum.photos/700/300',
    text: "Échauffement avant le grand match 🏆",
    likes: 183,
    comments: 27,
    createdAt: '2025-07-12T16:00:00Z',
  },
];

const dummyData = {
  name: "CR7",
  description: "La communauté officielle autour de Ronaldo...",
  image: require('@/assets/images/choose-comunity.png'),
  members: 12456,
  tokenSymbol: 'CR7T',
  tokenPrice: '2.45 €',
};
const userLevel = 4;

export default function CommunityPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<'Community' | 'Calendar' | 'Map' | 'LevelBoard'>('Community');

  const renderTabContent = () => {
    if (tab === 'Community') {
      return (
  <>
  {/* Stats existantes */}
  <ThemedView style={styles.infoRow}>…</ThemedView>

  {/* Le feed */}
  <FlatList
    data={MOCK_POSTS}
    keyExtractor={item => item.id}
    style={{ marginTop: 16 }}
    renderItem={({ item }) => (
      <ThemedView style={styles.postCard}>
        <ThemedText type="defaultSemiBold" style={styles.postTime}>
          {new Date(item.createdAt).toLocaleString()}
        </ThemedText>

        {/* Texte (s’il existe ou si post type text) */}
        {item.text && (
          <ThemedText style={styles.postText}>{item.text}</ThemedText>
        )}
        {!item.text && item.type === 'text' && (
          <ThemedText style={styles.postText}>{item.content}</ThemedText>
        )}

        {/* Média */}
        {item.type === 'image' && (
          <Image source={{ uri: item.content }} style={styles.postMedia} contentFit="cover" />
        )}
        {item.type === 'video' && (
          <Video
            source={{ uri: item.content }}
            style={styles.postMedia}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        )}

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity>
            <ThemedText style={styles.actionText}>❤️ {item.likes}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedText style={styles.actionText}>💬 {item.comments}</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    )}
  />
</>
      );
    }
    if (tab === 'Calendar') {
      return (
        <ThemedView style={styles.tabContent}>
          <Calendar
            markedDates={{ '2025-07-12': { marked: true, dotColor: 'blue' } }}
          />
        </ThemedView>
      );
    }
    if (tab === 'Map') {
      return (
        <View style={styles.mapContainer}>
          <Image
            source={require('@/assets/images/map.png')}
            style={styles.mapImage}
            contentFit="cover"
          />
        </View>
      );
    }
    if (tab === 'LevelBoard') {
      return (
        <ThemedView style={styles.tabContent}>
          {Array.from({ length: 7 }).map((_, i) => (
            <View key={i} style={styles.levelRow}>
              <ThemedText style={styles.whiteText}>Niveau {i + 1}</ThemedText>
              <ThemedText style={styles.whiteText}>
                {i + 1 < userLevel ? '✔'
                  : i + 1 === userLevel ? <Text style={{ color: '#0f0' }}>En cours</Text>
                    : ''}
              </ThemedText>
            </View>
          ))}
        </ThemedView>
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>

      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.title}>{dummyData.name}</ThemedText>
        <Image source={dummyData.image} style={styles.image} contentFit="cover" />

        <Button mode="contained" onPress={() => { }} style={styles.joinButton}>
          JOIN COMMUNITY
        </Button>

        <View style={styles.tabRow}>
          {['Community', 'Calendar', 'Map', 'LevelBoard'].map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.tabButton, tab === t && styles.tabActive]}
              onPress={() => setTab(t as any)}
            >
              <ThemedText style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 80 },
  backButton: { position: 'absolute', top: 40, left: 16, zIndex: 10 },
  title: { marginBottom: 12, textAlign: 'center', color: 'white' },
  image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 },
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  tabActive: { backgroundColor: '#333' },
  tabText: { color: '#888' },
  tabTextActive: { color: '#fff', fontWeight: 'bold' },
  tabContent: { padding: 12, backgroundColor: '#1e1e1e', borderRadius: 12, marginBottom: 16 },
  mapContainer: { width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  levelRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#333'
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, gap: 12,
  },
  infoBox: { flex: 1, padding: 12, backgroundColor: '#222', borderRadius: 8 },
  descriptionBox: { padding: 16, backgroundColor: '#222', borderRadius: 8, marginBottom: 16 },
  whiteText: { color: 'white' },
  joinButton: {
    marginTop: 12,
    marginBottom: 24,
  },
  postCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  postTime: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  postText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  postMedia: {
    width: '100%',
    aspectRatio: 16 / 9, // format paysage par défaut ; tu peux spécifier 1 pour carré, ou laisser responsif
    borderRadius: 8,
    backgroundColor: '#000',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  actionText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  
    
});