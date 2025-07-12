import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-paper';
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
          <ThemedView style={styles.descriptionBox}>
            <ThemedText style={styles.whiteText}>{dummyData.description}</ThemedText>
          </ThemedView>
          
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
          {/* Intégrer MapView ou autre */}
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
  mapContainer: { height: 200, borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
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
});