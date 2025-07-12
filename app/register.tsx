import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { register } from '@/services/api'; // à créer dans services/api.ts
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirm) {
      return Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    }
    setLoading(true);
    try {
      await register(email, password);
      Alert.alert('Succès', 'Votre compte a été créé');
      router.replace('/login');
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Échec de la création de compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/app-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ThemedText type="title" style={styles.title}>Créer un compte</ThemedText>

      <TextInput
        label="Email"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        theme={{ colors: { primary: '#FFD700', background: '#1e1e1e', text: 'white' } }}
      />

      <TextInput
        label="Mot de passe"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        theme={{ colors: { primary: '#FFD700', background: '#1e1e1e', text: 'white' } }}
      />

      <TextInput
        label="Confirmer le mot de passe"
        mode="outlined"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        style={styles.input}
        theme={{ colors: { primary: '#FFD700', background: '#1e1e1e', text: 'white' } }}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading || !email || !password || password !== confirm}
        style={styles.registerButton}
        contentStyle={styles.registerButtonContent}
      >
        Créer un compte
      </Button>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Déjà un compte ?</ThemedText>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <ThemedText style={[styles.linkText, styles.signInLink]}>Se connecter</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    marginBottom: 24,
    color: 'white',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 8,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    width: '100%',
  },
  registerButtonContent: {
    paddingVertical: 8,
  },
  linkText: {
    color: '#FFD700',
    marginTop: 12,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    marginRight: 8,
    fontSize: 14,
  },
  signInLink: {
    fontWeight: 'bold',
  },
});