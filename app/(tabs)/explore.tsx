import { useRouter } from 'expo-router';
import React from 'react';
import { ListRenderItem, Text, TouchableOpacity, View } from 'react-native';


import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet
} from 'react-native';



type FanToken = {
  id: string;
  logo: ImageSourcePropType;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: string;
  sparkline: ImageSourcePropType;
};

const fanTokens: FanToken[] = [
  {
    id: '1',
    logo: require('@/assets/images/9.png'),
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 117640.66,
    change1h: 0.0,
    change24h: 3.54,
    change7d: 9.04,
    marketCap: 2339982050775,
    volume24h: 125011548085,
    circulatingSupply: '19.89M BTC',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '2',
    logo: require('@/assets/images/9.png'),
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2993.43,
    change1h: 0.8,
    change24h: 5.66,
    change7d: 19.88,
    marketCap: 361320300816,
    volume24h: 43624145306,
    circulatingSupply: '120.71M ETH',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '3',
    logo: require('@/assets/images/9.png'),
    name: 'Solana',
    symbol: 'SOL',
    price: 164.13,
    change1h: 0.8,
    change24h: 2.06,
    change7d: 12.01,
    marketCap: 87982646683,
    volume24h: 8140110657,
    circulatingSupply: '536.03M SOL',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '4',
    logo: require('@/assets/images/9.png'),
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.7335,
    change1h: 0.52,
    change24h: 11.45,
    change7d: 28.56,
    marketCap: 25960140071,
    volume24h: 2838597100,
    circulatingSupply: '35.38B ADA',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '5',
    logo: require('@/assets/images/9.png'),
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.2108,
    change1h: 3.29,
    change24h: 13.16,
    change7d: 29.50,
    marketCap: 31632333870,
    volume24h: 3659397664,
    circulatingSupply: '150.05B DOGE',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '6',
    logo: require('@/assets/images/9.png'),
    name: 'XRP',
    symbol: 'XRP',
    price: 2.79,
    change1h: 0.75,
    change24h: 11.98,
    change7d: 25.92,
    marketCap: 165241974120,
    volume24h: 14488054826,
    circulatingSupply: '59.06B XRP',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '7',
    logo: require('@/assets/images/9.png'),
    name: 'Chainlink',
    symbol: 'LINK',
    price: 15.71,
    change1h: 0.84,
    change24h: 6.88,
    change7d: 20.04,
    marketCap: 10659100991,
    volume24h: 885181510,
    circulatingSupply: '678.09M LINK',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '8',
    logo: require('@/assets/images/9.png'),
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.9423,
    change1h: 0.10,
    change24h: 3.75,
    change7d: 7.44,
    marketCap: 8765432100,
    volume24h: 654321098,
    circulatingSupply: '9.31B MATIC',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '9',
    logo: require('@/assets/images/9.png'),
    name: 'PepeCoin',
    symbol: 'PEPE',
    price: 0.00000123,
    change1h: 2.3,
    change24h: 12.6,
    change7d: 65.0,
    marketCap: 123456789,
    volume24h: 98765432,
    circulatingSupply: '420.69T PEPE',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '10',
    logo: require('@/assets/images/9.png'),
    name: 'FanTokenX',
    symbol: 'FTX',
    price: 4.56,
    change1h: -0.45,
    change24h: -1.22,
    change7d: 4.89,
    marketCap: 223456789,
    volume24h: 23456789,
    circulatingSupply: '50M FTX',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '11',
    logo: require('@/assets/images/9.png'),
    name: 'AlphaFans',
    symbol: 'ALF',
    price: 2.14,
    change1h: 0.35,
    change24h: 1.12,
    change7d: 3.22,
    marketCap: 134567890,
    volume24h: 15432100,
    circulatingSupply: '62M ALF',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '12',
    logo: require('@/assets/images/9.png'),
    name: 'RisingStars',
    symbol: 'RST',
    price: 1.89,
    change1h: -0.12,
    change24h: 0.44,
    change7d: 2.18,
    marketCap: 98900000,
    volume24h: 10500000,
    circulatingSupply: '52M RST',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '13',
    logo: require('@/assets/images/9.png'),
    name: 'ArenaGold',
    symbol: 'ARG',
    price: 6.73,
    change1h: 0.87,
    change24h: 2.99,
    change7d: 5.41,
    marketCap: 302000000,
    volume24h: 45600000,
    circulatingSupply: '45M ARG',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '14',
    logo: require('@/assets/images/9.png'),
    name: 'FanPower',
    symbol: 'FNP',
    price: 3.21,
    change1h: -0.22,
    change24h: -1.11,
    change7d: -0.92,
    marketCap: 176500000,
    volume24h: 19200000,
    circulatingSupply: '55M FNP',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '15',
    logo: require('@/assets/images/9.png'),
    name: 'GloryToken',
    symbol: 'GLT',
    price: 9.48,
    change1h: 1.05,
    change24h: 3.88,
    change7d: 7.12,
    marketCap: 412000000,
    volume24h: 88000000,
    circulatingSupply: '43M GLT',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '16',
    logo: require('@/assets/images/9.png'),
    name: 'SupporterOne',
    symbol: 'SPO',
    price: 0.92,
    change1h: 0.00,
    change24h: 0.12,
    change7d: 0.88,
    marketCap: 61000000,
    volume24h: 9400000,
    circulatingSupply: '66M SPO',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '17',
    logo: require('@/assets/images/9.png'),
    name: 'VictoryToken',
    symbol: 'VCT',
    price: 5.66,
    change1h: -0.33,
    change24h: 2.01,
    change7d: 3.77,
    marketCap: 275000000,
    volume24h: 38700000,
    circulatingSupply: '48M VCT',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '18',
    logo: require('@/assets/images/9.png'),
    name: 'SquadCoin',
    symbol: 'SQD',
    price: 3.88,
    change1h: 0.44,
    change24h: -0.98,
    change7d: 1.21,
    marketCap: 189000000,
    volume24h: 22000000,
    circulatingSupply: '49M SQD',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '19',
    logo: require('@/assets/images/9.png'),
    name: 'LegendsToken',
    symbol: 'LGD',
    price: 7.35,
    change1h: 1.32,
    change24h: 2.54,
    change7d: 6.03,
    marketCap: 366000000,
    volume24h: 41000000,
    circulatingSupply: '50M LGD',
    sparkline: require('@/assets/images/9.png'),
  },
  {
    id: '20',
    logo: require('@/assets/images/9.png'),
    name: 'PulseFans',
    symbol: 'PLF',
    price: 2.78,
    change1h: -0.17,
    change24h: 0.75,
    change7d: 2.31,
    marketCap: 142000000,
    volume24h: 18900000,
    circulatingSupply: '51M PLF',
    sparkline: require('@/assets/images/9.png'),
  },
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
};

const FanTokenMarketView = () => {
  const router = useRouter();

  const totalMarketCap = fanTokens.reduce((sum, t) => sum + t.marketCap, 0);
  const totalTokens = fanTokens.length;
  const tokensLast7Days = 3; // valeur fictive

  const renderHeaderStats = () => (
    <View style={styles.statsContainer}>
      {fanTokens.slice(0, 3).map((token) => (
        <View key={token.id} style={styles.card}>
          <Text style={styles.cardTitle}>{token.name}</Text>
          <Text style={styles.cardPrice}>${token.price.toFixed(2)}</Text>
          <Text
            style={[styles.cardChange, token.change24h >= 0 ? styles.green : styles.red]}
          >
            24h: {token.change24h.toFixed(2)}%
          </Text>
        </View>
      ))}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Market Cap Total</Text>
        <Text style={styles.cardPrice}>${formatNumber(totalMarketCap)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fan Tokens</Text>
        <Text style={styles.cardPrice}>{totalTokens}</Text>
        <Text style={styles.cardChange}>+{tokensLast7Days} (7j)</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Swap Token</Text>
        <Text style={styles.cardPrice}>Échanger facilement vos tokens</Text>

        <TouchableOpacity
          style={styles.swapButton}
          onPress={() => router.push('/swap')}
        >
          <Text style={styles.swapButtonText}>Accéder au Swap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem: ListRenderItem<FanToken> = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.row} onPress={() => { }}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image source={item.logo} style={styles.logo} />
        <View style={styles.nameCol}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.symbol}>{item.symbol}</Text>
        </View>
        <Text style={styles.price}>${item.price.toFixed(0)}</Text>
        <Text style={[styles.percent, item.change1h >= 0 ? styles.green : styles.red]}>
          {item.change1h.toFixed(1)}%
        </Text>
        <Text style={[styles.percent, item.change24h >= 0 ? styles.green : styles.red]}>
          {item.change24h.toFixed(1)}%
        </Text>
        <Text style={[styles.percent, item.change7d >= 0 ? styles.green : styles.red]}>
          {item.change7d.toFixed(1)}%
        </Text>
        <Text style={styles.marketCap}>{formatNumber(item.marketCap)}</Text>
        <Text style={styles.volume}>{formatNumber(item.volume24h)}</Text>
        <Text style={styles.supply}>{item.circulatingSupply}</Text>
        <Image source={item.sparkline} style={styles.sparkline} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={renderHeaderStats}
      data={fanTokens}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      horizontal={false}
    />
  );
};

export default FanTokenMarketView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
    paddingTop: 16, // Ajoute du padding en haut ici

  },
  card: {
    backgroundColor: '#2c2c2e',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  cardChange: {
    fontSize: 13,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  index: {
    width: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginHorizontal: 6,
  },
  nameCol: {
    width: 70,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  symbol: {
    fontSize: 11,
    color: '#666',
  },
  price: {
    width: 70,
    fontSize: 12,
    textAlign: 'right',
    color: 'white',
    paddingHorizontal: 5,
  },
  percent: {
    width: 50,
    fontSize: 12,
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
  marketCap: {
    width: 90,
    fontSize: 12,
    textAlign: 'right',
  },
  volume: {
    width: 90,
    fontSize: 12,
    textAlign: 'right',
  },
  supply: {
    width: 90,
    fontSize: 12,
    textAlign: 'right',
  },
  sparkline: {
    width: 60,
    height: 24,
    marginLeft: 4,
  },
  swapButton: {
    marginTop: 8,
    backgroundColor: 'rgba(255,55,199,0.8)',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },

  swapButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
