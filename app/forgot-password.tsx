import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { passwordReset } from '@/services/api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) return Alert.alert('Erreur', 'Veuillez entrer votre email');
    setLoading(true);
    try {
      await passwordReset(email);
      Alert.alert('Succès', 'Un email de réinitialisation a été envoyé.');
      router.back();
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Impossible de réinitialiser le mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Mot de passe oublié ?</ThemedText>
      <ThemedText style={styles.description}>
        Entrez votre email ci‑dessous. Vous recevrez un lien pour réinitialiser votre mot de passe.
      </ThemedText>

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

      <Button
        mode="contained"
        onPress={handlePasswordReset}
        loading={loading}
        disabled={loading || !email}
        style={styles.button}
        contentStyle={{ paddingVertical: 6 }}
      >
        Envoyer le lien
      </Button>

      <TouchableOpacity onPress={() => router.back()}>
        <ThemedText style={styles.linkText}>← Retour à la connexion</ThemedText>
      </TouchableOpacity>
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
  title: {
    fontSize: 26,
    marginBottom: 16,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    width: '100%',
  },
  linkText: {
    color: '#FFD700',
    marginTop: 16,
    fontSize: 14,
  },
});