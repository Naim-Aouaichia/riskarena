import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { login } from '@/services/api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/discover');
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Échec de la connexion');
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

      <ThemedText type="title" style={styles.title}>Bienvenue</ThemedText>

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

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading || !email || !password}
        style={styles.loginButton}
        contentStyle={styles.loginButtonContent}
      >
        Se connecter
      </Button>

      <TouchableOpacity onPress={() => router.push('/forgot-password')}>
        <ThemedText style={styles.linkText}>Mot de passe oublié ?</ThemedText>
      </TouchableOpacity>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Pas encore de compte ?</ThemedText>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <ThemedText style={[styles.linkText, styles.signUpLink]}>Créer un compte</ThemedText>
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
  loginButton: {
    marginTop: 8,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    width: '100%',
  },
  loginButtonContent: {
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
  signUpLink: {
    fontWeight: 'bold',
  },
});