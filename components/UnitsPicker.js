import React from 'react'
import { View, StyleSheet, Text} from 'react-native';
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({unitSystem, setUnitSystem}) {
    return (
        <View style={styles.unitSystem}>
            <Picker selectedValue={unitSystem} onValueChange={(item)=>setUnitSystem(item)} itemStyle={{fontSize:12}}>
            <Picker.Item label='°C' value="metric" />
            <Picker.Item label='°F' value="imperial" />
            </Picker>
        </View>
    )
}
const styles = StyleSheet.create({
    unitSystem:{
        position: 'absolute',
        top:100,
        left:20,
        height:50,
        width:100,
    }
})
