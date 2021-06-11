import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {colors} from '../utils/index';

export default function ReloadIcon({load}) {
    return (
        <View style={styles.relaodIcon}>
            
            <Ionicons onPress={load} name="refresh-circle" size={36} color={colors.PRIMARY_COLOR} />
        </View>
    )
}
const styles = StyleSheet.create({
    relaodIcon:{
        position: 'absolute',
        top:100,
        right:40,
        // color: PRIMARY_COLOR
    }
})
