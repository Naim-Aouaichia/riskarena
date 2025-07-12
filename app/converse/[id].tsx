import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const messages = [
  { id: '1', fromMe: false, text: 'Salut, comment ça va ?', timestamp: '3d ago' },
  { id: '2', fromMe: true, text: 'Ça va super, merci et toi ?', timestamp: '3d ago' },
  { id: '3', fromMe: false, text: 'Bien aussi. Tu as vu le dernier match ?', timestamp: '3d ago' },
];

export default function ChatScreen() {
  const [text, setText] = useState('');
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View style={styles.header}>
        
        <Image source={require('@/assets/images/9.png')} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Alice Dupont</Text>
          <Text style={styles.lastSeen}>3d ago</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.messageBubble, msg.fromMe ? styles.fromMe : styles.fromOther]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Ionicons name="attach" size={22} color="#888" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="images" size={22} color="#888" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={[styles.textInput, text.length > 0 && { paddingRight: 40 }]}
          placeholder="Écrire un message..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />
        {text.length > 0 && (
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e1e1e',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastSeen: {
    color: '#ccc',
    fontSize: 12,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  fromMe: {
    backgroundColor: '#2a2a2a',
    alignSelf: 'flex-end',
  },
  fromOther: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    backgroundColor: '#1e1e1e',
  },
  icon: {
    marginHorizontal: 6,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: 'white',
  },
  sendButton: {
    position: 'absolute',
    right: 12,
    padding: 6,
    backgroundColor: '#007aff',
    borderRadius: 20,
  },
});