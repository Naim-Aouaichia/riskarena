import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const dummyData = {
  id: '3',
  name: 'CR7',
  description: 'La communauté officielle autour de Ronaldo. Accès à du contenu exclusif, des événements live et des avantages pour les fans fidèles.',
  image: require('@/assets/images/partial-react-logo.png'),
  members: 12456,
  tokenSymbol: 'CR7T',
  tokenPrice: '2.45 €',
};

export default function CommunityPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bouton retour */}
      

      {/* Titre */}
      <ThemedText type="title" style={styles.title}>
        {dummyData.name}
      </ThemedText>

      {/* Image */}
      <Image source={dummyData.image} style={styles.image} contentFit="cover" />

      {/* Infos : 2 lignes, 2 cases par ligne */}
      <ThemedView style={styles.infoRow}>
        <ThemedView style={styles.infoBox}>
          <ThemedText type="defaultSemiBold" style={styles.whiteText}>Membres</ThemedText>
          <ThemedText style={styles.whiteText}>{dummyData.members}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoBox}>
          <ThemedText type="defaultSemiBold" style={styles.whiteText}>Token</ThemedText>
          <ThemedText style={styles.whiteText}>{dummyData.tokenSymbol}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.infoRow}>
        <ThemedView style={styles.infoBox}>
          <ThemedText type="defaultSemiBold" style={styles.whiteText}>Prix</ThemedText>
          <ThemedText style={styles.whiteText}>{dummyData.tokenPrice}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoBox}>
          <ThemedText type="defaultSemiBold" style={styles.whiteText}>ID</ThemedText>
          <ThemedText style={styles.whiteText}>{id}</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Bouton */}
      <Button mode="contained" onPress={() => {}} style={styles.joinButton}>
        JOIN COMMUNITY
      </Button>

      {/* Description longue */}
      <ThemedView style={styles.descriptionBox}>
        <ThemedText type="default" style={styles.whiteText}>{dummyData.description}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: 'white',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  infoBox: {
    flex: 1,
    padding: 12,
  },
  whiteText: {
    color: 'white',
  },
  joinButton: {
    marginTop: 12,
    marginBottom: 24,
  },
  descriptionBox: {
    padding: 16,
  },
});