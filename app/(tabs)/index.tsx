import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const conversations = [
  {
    id: '1',
    name: 'Alice Dupont',
    lastMessage: 'Salut, tu viens au match ce soir ?',
    avatar: require('@/assets/images/9.png'),
    isRead: false,
  },
  {
    id: '2',
    name: 'Maxime Leroy',
    lastMessage: 'Pas de souci pour demain !',
    avatar: require('@/assets/images/partial-react-logo.png'),
    isRead: true,
  },
  {
    id: '3',
    name: 'Sophie Lemoine',
    lastMessage: 'Voici le lien pour les billets.',
    avatar: require('@/assets/images/9.png'),
    isRead: false,
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Rechercher une conversation"
        value={search}
        onChangeText={setSearch}
        style={styles.searchBar}
        theme={{ colors: { primary: '#007aff', text: '#000' } }}
      />

      <FlatList
        data={conversations.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationRow}
            onPress={() => router.push(`/converse/${item.id}`)}
          >
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.conversationTextContainer}>
              <ThemedText type="defaultSemiBold" style={styles.name}>{item.name}</ThemedText>
              <ThemedText numberOfLines={1} style={styles.message}>{item.lastMessage}</ThemedText>
            </View>
            <View
              style={[
                styles.readIndicator,
                {
                  backgroundColor: item.isRead ? 'transparent' : '#007aff',
                  borderWidth: item.isRead ? 1 : 0,
                  borderColor: '#007aff',
                },
              ]}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  conversationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  conversationTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  readIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
});