import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function UserProfileScreen() {
  const router = useRouter(); // ✅ initialise le hook ici

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f1f1f1', dark: '#1c1c1e' }}
      headerImage={
        <View style={styles.avatarContainer}>
          <Image source={require('@/assets/images/9.png')} style={styles.avatar} />
        </View>
      }
    >
      <ThemedView style={styles.centeredSection}>
        <ThemedText type="title">John Doe</ThemedText>
        <Button mode="outlined" style={styles.editButton} labelStyle={{ color: 'white' }}>
          Edit Profile
        </Button>
      </ThemedView>

      <ThemedView style={styles.infoRow}>
        <ThemedView style={styles.infoBox}>
          <Ionicons name="checkmark-circle-outline" size={16} color="green" />
          <ThemedText style={styles.infoText}>KYC</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoBox}>
          <FontAwesome name="bank" size={16} color="white" />
          <ThemedText style={styles.infoText}>Bank</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoBox}>
          <ThemedText style={styles.infoText}>Créé le 01/01/2024</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.statsRow}>
        <ThemedView style={styles.statsBox}>
          <ThemedText type="subtitle">12</ThemedText>
          <ThemedText>Fan Tokens</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statsBox}>
          <ThemedText type="subtitle" style={styles.greenText}>99$</ThemedText>
          <ThemedText>Total Value</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statsBox}>
          <ThemedText type="subtitle">34</ThemedText>
          <ThemedText>Interactions</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Activité (6 mois)</ThemedText>
        <View style={styles.activityGrid}>
          {[...Array(7)].map((_, row) => (
            <View key={row} style={styles.activityRow}>
              {[...Array(26)].map((_, col) => (
                <View
                  key={`${row}-${col}`}
                  style={[styles.activityCell, { backgroundColor: Math.random() > 0.7 ? '#4caf50' : '#ccc' }]}
                />
              ))}
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
  <ThemedText type="subtitle">Mes communautés</ThemedText>
  {[1, 2, 3].map((_, index) => (
    <TouchableOpacity
      key={index}
      style={styles.communityCard}
      onPress={() => router.push(`/community/${index}`)}
    >
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.communityImage}
      />
      <ThemedView style={styles.communityContent}>
        <ThemedText type="subtitle" style={{ fontSize: 18 }}>Zeroday Circle</ThemedText>
        <ThemedText style={{ fontSize: 14, opacity: 0.8 }}>Accès à du contenu exclusif, des événements live et des avantages pour les fans fidèles.</ThemedText>

        <ThemedView style={{ marginTop: 8 }}>
          <ThemedText style={{ fontSize: 13 }}>12456 membres</ThemedText>
          <ThemedText style={{ fontSize: 13 }}>Tokens détenus : 234</ThemedText>
          <ThemedText style={{ fontSize: 13 }}>Prix / token : 2.45 €</ThemedText>
          <ThemedText style={{ fontSize: 13, fontWeight: '600' }}>Valeur totale : 573.30 €</ThemedText>
        </ThemedView>

        <View style={styles.buttonRow}>
          <Button mode="contained" style={styles.sellButton}>Sell token</Button>
          <Button mode="contained" style={styles.buyButton}>Buy token</Button>
        </View>
      </ThemedView>
    </TouchableOpacity>
  ))}
</ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  centeredSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  editButton: {
    marginTop: 8,
    borderColor: 'white',
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: 'white',
  },
  greenText: {
    color: 'green',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  section: {
    marginVertical: 24,
  },
  activityGrid: {
    marginTop: 12,
  },
  activityRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  activityCell: {
    width: 10,
    height: 10,
    marginRight: 2,
    borderRadius: 2,
  },
  communityCard: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
  },
  communityImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  communityContent: {
    flex: 1,
    gap: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  sellButton: {
    backgroundColor: 'red',
    flex: 1,
  },
  buyButton: {
    backgroundColor: 'green',
    flex: 1,
  },
});