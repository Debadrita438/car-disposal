import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { Minus, Plus } from '../assets';
import { regular, semiBold } from '../theme/Fonts';
import { Colors } from '../theme';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function CollapsableTable({ children }) {
  const [active, setActive] = useState(null);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 2, 3].map((x, i) => (
        <Item key={x} active={active} i={i} setActive={setActive} />
      ))}
      {children}
    </ScrollView>
  );
}

function Item({ i, active, setActive }) {
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setActive(i === active ? null : i);
  };
  const open = active === i;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={1}>
      <View style={styles.row}>
        <Text style={styles.headerText}>How to add Junk vehicle</Text>
        {open ? <Minus /> : <Plus />}
      </View>
      <Text style={styles.subItem} numberOfLines={open ? undefined : 1}>
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  item: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#B8B8B8',
    borderRadius: 5,
    paddingHorizontal: 12,
    overflow: 'hidden',
    paddingVertical: 12,
    marginBottom: 5,
  },
  subItem: {
    maxWidth: '90%',
    fontFamily: regular,
    fontSize: 12,
    color: Colors.blackColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: semiBold,
    fontSize: 14,
    color: Colors.blackColor,
  },
});
