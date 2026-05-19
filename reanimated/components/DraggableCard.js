import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function DraggableCard({ item, startX, startY }) {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const scale = useSharedValue(1);

  const context = useSharedValue({ x: 0, y: 0 });

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = {
        x: translateX.value,
        y: translateY.value,
      };

      scale.value = withSpring(1.05);
    })

    .onUpdate((event) => {
      translateX.value = context.value.x + event.translationX;
      translateY.value = context.value.y + event.translationY;
    })

    .onEnd(() => {
      const droppedLeft = translateX.value < width * 0.35;
      const droppedRight = translateX.value > width * 0.65;

      if (droppedLeft) {
        translateX.value = withSpring(40);
      } else if (droppedRight) {
        translateX.value = withSpring(width - 170);
      } else {
        translateX.value = withSpring(startX);
        translateY.value = withSpring(startY);
      }

      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.text}>{item}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: 130,
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 5,
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});