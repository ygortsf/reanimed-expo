import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DraggableCard from '../components/DraggableCard';

const { width } = Dimensions.get('window');

export default function App() {
  const items = ['Brócolis', 'Pizza', 'Chuva', 'Praia'];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

      <View style={styles.container}>
        <Text style={styles.header}>Arraste para escolher</Text>
        <Text style={styles.subHeader}>Organize o que você gosta ou não gosta</Text>

        <View style={styles.columns}>
          <View style={styles.leftZone}>
            <Text style={styles.icon}>👎</Text>
            <Text style={styles.title}>NÃO GOSTO</Text>
          </View>

          <View style={styles.rightZone}>
            <Text style={styles.icon}>👍</Text>
            <Text style={styles.title}>GOSTO</Text>
          </View>
        </View>

        {items.map((item, index) => (
          <DraggableCard
            key={item}
            item={item}
            startX={width / 2 - 75}
            startY={180 + index * 85}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingTop: 55,
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 6,
  },

  subHeader: {
    fontSize: 15,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 25,
  },

  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 15,
    gap: 12,
  },

  leftZone: {
    width: width / 2 - 22,
    backgroundColor: '#ffe6e6',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#ffb3b3',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },

  rightZone: {
    width: width / 2 - 22,
    backgroundColor: '#e8fff0',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#a8e6b5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },

  icon: {
    fontSize: 28,
    marginBottom: 8,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#34495e',
    letterSpacing: 1,
  },
});