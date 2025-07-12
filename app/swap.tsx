import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FlatList, Modal } from 'react-native';

const AVAILABLE_TOKENS = ['BTC', 'ETH', 'USDT', 'ADA', 'SOL', 'DOT', 'DOGE', 'MATIC'];

export default function SwapScreen() {
  const router = useRouter();
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState('ETH');
  const [isSelecting, setIsSelecting] = useState<'from' | 'to' | null>(null);

  const calculateOut = (input: string) => {
    const rate = 30000; // simulate 1 BTC = 30k ETH
    if (!input || isNaN(+input)) {
      setAmountOut('');
    } else {
      const out = (+input) * rate;
      setAmountOut(String(out.toFixed(6)));
    }
  };

  useEffect(() => {
    calculateOut(amountIn);
  }, [amountIn, fromToken, toToken]);

  const selectToken = (token: string) => {
    if (isSelecting === 'from') {
      setFromToken(token);
      if (token === toToken) setToToken(fromToken);
    } else if (isSelecting === 'to') {
      setToToken(token);
      if (token === fromToken) setFromToken(toToken);
    }
    setIsSelecting(null);
  };

  return (
    <View style={styles.root}>
      

      <Text style={styles.title}>Échangez Vos Fan Token</Text>

      <View style={styles.card}>
        {/* Input "Vendre" */}
        <View style={styles.row}>
          <Text style={styles.label}>Vendre</Text>
          <View style={styles.inputTokenRow}>
            <RNTextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#666"
              keyboardType="decimal-pad"
              value={amountIn}
              onChangeText={text => {
                setAmountIn(text);
                calculateOut(text);
              }}
            />
            <TouchableOpacity
              style={styles.tokenButton}
              onPress={() => setIsSelecting('from')}
            >
              <Text style={styles.tokenText}>{fromToken}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Switch tokens */}
        <TouchableOpacity style={styles.switchButton} onPress={() => {
          setFromToken(toToken);
          setToToken(fromToken);
          setAmountIn('');
          setAmountOut('');
        }}>
          <Text style={styles.switchIcon}>⇅</Text>
        </TouchableOpacity>

        {/* Input "Acheter" */}
        <View style={styles.row}>
          <Text style={styles.label}>Acheter</Text>
          <View style={styles.inputTokenRow}>
            <RNTextInput
              style={[styles.input, { color: 'white' }]}
              placeholder="0"
              placeholderTextColor="#666"
              value={amountOut}
              onChangeText={(text) => {
                setAmountOut(text);
                // Optionally: recalc reverse
              }}
              keyboardType="decimal-pad"
            />
            <TouchableOpacity
              style={styles.tokenButton}
              onPress={() => setIsSelecting('to')}
            >
              <Text style={styles.tokenText}>{toToken}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Slippage : 0.5 %</Text>
          <Text style={styles.infoText}>Frais estimés</Text>
        </View>

        <TouchableOpacity
          style={[styles.swapButton, (!amountIn || !amountOut) && styles.swapDisabled]}
          disabled={!amountIn || !amountOut}
          onPress={() => console.log('Swap exécuté', { fromToken, toToken, amountIn, amountOut })}
        >
          <Text style={styles.swapText}>Swap Comming Soon</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de sélection */}
      <Modal visible={isSelecting !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Sélectionnez un token à {isSelecting === 'from' ? 'vendre' : 'acheter'}
            </Text>
            <FlatList
              data={AVAILABLE_TOKENS}
              keyExtractor={(token) => token}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectToken(item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalClose} onPress={() => setIsSelecting(null)}>
              <Text style={styles.modalCloseText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    backButton: { marginBottom: 12 },
    backText: { color: '#fff', fontSize: 16 },
    title: { color: '#fff', fontSize: 24, textAlign: 'center', marginBottom: 24, lineHeight: 32 },
    card: { backgroundColor: '#1f1f1f', borderRadius: 20, padding: 16, alignSelf: 'center', width: '100%', maxWidth: 480 },
    row: { marginBottom: 16 },
    label: { color: '#ccc', fontSize: 14, marginBottom: 8 },
    inputTokenRow: { flexDirection: 'row', alignItems: 'center' },
    input: { flex: 1, fontSize: 32, color: '#fff', paddingVertical: 4 },
    tokenButton: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#313131', borderRadius: 20, marginLeft: 8 },
    tokenText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    switchButton: { alignSelf: 'center', marginBottom: 16 },
    switchIcon: { fontSize: 24, color: '#fff' },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
    infoText: { color: '#888', fontSize: 12 },
    swapButton: { backgroundColor: 'rgba(255,55,199,0.8)', paddingVertical: 16, borderRadius: 20, alignItems: 'center' },
    swapDisabled: { backgroundColor: 'rgba(120,120,120,0.5)' },
    swapText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#1f1f1f', borderRadius: 20, padding: 20, width: '80%', maxHeight: '60%' },
    modalTitle: { color: '#fff', fontSize: 18, marginBottom: 12 },
    modalItem: { paddingVertical: 12 },
    modalItemText: { color: '#fff', fontSize: 16 },
    modalClose: { marginTop: 16, alignSelf: 'center' },
    modalCloseText: { color: '#ff5555', fontSize: 16 },

});