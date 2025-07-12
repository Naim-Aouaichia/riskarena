import { ThemedText } from '@/components/ThemedText';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';

export default function CreateFanTokenScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [decimals, setDecimals] = useState(18);
    const [supply, setSupply] = useState(1000000);
    const [receiver, setReceiver] = useState('');
    const [accepted, setAccepted] = useState(false);

    const handleSubmit = () => {
        if (!accepted) return alert('Merci d’accepter les conditions d’utilisation');

        console.log({
            name,
            symbol,
            decimals,
            supply,
            receiver
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Flèche retour */}


            <ThemedText type="title" style={styles.title}>
                Créer un Fan Token
            </ThemedText>

            <ThemedText type="default" style={styles.description}>
                👉 Un fan token est un jeton numérique unique représentant votre communauté de supporters.
                {'\n\n'}
                👉 En le créant, vous permettez à votre audience de vous soutenir et d’échanger ces jetons entre eux.
                {'\n\n'}
                👉 La création d’un fan token coûte 9€ (prix fixe). Ce montant couvre les frais techniques de génération et d’enregistrement du token.
                {'\n\n'}
                👉 Une fois le token créé, il sera échangeable librement avec votre communauté, mais aussi contre les tokens d'autres communautés.
            </ThemedText>

            <TextInput
                label="Nom du Token (ex: YassirSprint)"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                theme={{ colors: { primary: 'white', text: 'white', placeholder: 'white' } }}
            />

            <TextInput
                label="Symbole du Token (max 4 caractères, ex: YSPR)"
                mode="outlined"
                value={symbol}
                maxLength={4}
                onChangeText={setSymbol}
                style={styles.input}
                theme={{ colors: { primary: 'white', text: 'white', placeholder: 'white' } }}
            />

            {/* Decimals */}
            <View style={styles.sliderGroup}>
                <View style={styles.sliderLabelRow}>
                    <Text style={styles.sliderLabelLeft}>Décimales</Text>
                    <Text style={styles.sliderLabelRight}>{decimals}</Text>
                </View>
                <Slider
                    minimumValue={0}
                    maximumValue={18}
                    step={1}
                    value={decimals}
                    onValueChange={setDecimals}
                    minimumTrackTintColor="rgba(255,55,199,0.8)"
                    maximumTrackTintColor="#555"
                    thumbTintColor="rgba(255,55,199,0.8)"
                />
            </View>

            {/* Supply */}
            <View style={styles.sliderGroup}>
                <View style={styles.sliderLabelRow}>
                    <Text style={styles.sliderLabelLeft}>Supply</Text>
                    <Text style={styles.sliderLabelRight}>{supply.toLocaleString()}</Text>
                </View>
                <Slider
                    minimumValue={1000}
                    maximumValue={1000000000}
                    step={1000}
                    value={supply}
                    onValueChange={setSupply}
                    minimumTrackTintColor="rgba(255,55,199,0.8)"
                    maximumTrackTintColor="#555"
                    thumbTintColor="rgba(255,55,199,0.8)"
                />
            </View>

            <TextInput
                label="Adresse Wallet du créateur (recevra toute la supply)"
                mode="outlined"
                value={receiver}
                onChangeText={setReceiver}
                style={styles.input}
                theme={{ colors: { primary: 'white', text: 'white', placeholder: 'white' } }}
            />

            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={accepted ? 'checked' : 'unchecked'}
                    onPress={() => setAccepted(!accepted)}
                    color="rgba(255,55,199,0.8)"
                />
                <Text style={styles.checkboxLabel}>
                    J’accepte les conditions d’utilisation des services RiskArena
                </Text>
            </View>

            <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                contentStyle={{ paddingVertical: 6 }}
                disabled={!accepted}
            >
                Générer le contrat
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#121212',
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        marginBottom: 16,
        color: 'white',
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#1e1e1e',
    },
    sliderGroup: {
        marginBottom: 24,
    },
    sliderLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    sliderLabelLeft: {
        fontWeight: '500',
        color: 'white',
    },
    sliderLabelRight: {
        fontWeight: '500',
        color: 'rgba(255,55,199,0.8)',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 14,
        color: 'white',
    },
    button: {
        marginTop: 16,
        backgroundColor: 'rgba(255,55,199,0.8)',
        color: '#FFFFFF',
    },
    description: {
        marginBottom: 24,
        color: 'white',
        fontSize: 14,
        lineHeight: 20,
    },
});