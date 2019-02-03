import React from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { fixNumber } from '../Utils'
import { headphones } from '../IconManager'

const { height, width } = Dimensions.get('window')

const ItemMV = ({ item, }) => {
    // title, href, total_time, total_listen, image
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => openVideo(item.href)}>

            <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: 120 }}
            />

            <View style={styles.viewTotal}>
                {headphones(18, 'white')}
                <Text style={styles.total}> {item ? fixNumber(item.total_listen) : 0}</Text>
                <View style={{ flex: 1 }} />
                <Text style={styles.total}>{item.total_time} </Text>
            </View>

            <Text style={styles.song}>{item.title}</Text>

            <Text style={styles.singer}>Khắc Việt</Text>

        </TouchableOpacity>
    )
}

export default ItemMV

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 10,
        margin: 5
    },
    viewTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: 30,
        width: '100%',
        top: 95,
        left: 0
    },
    total: {
        fontSize: 12,
        color: 'white'
    },
    song: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginVertical: 5
    },
    singer: {
        fontSize: 12,
        color: 'grey'
    }
})