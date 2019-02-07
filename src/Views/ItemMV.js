import React from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { fixNumber, scale } from '../Utils'
import { headphones } from '../IconManager'

const { height, width } = Dimensions.get('window')

const ItemMV = ({ item, openVideo }) => {
    // title, href, total_time, total_listen, image
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => openVideo(item)}>

            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />

            <View style={styles.viewTotal}>
                {headphones(18, 'white')}
                <Text style={styles.total}> {item.total_listen ? fixNumber(item.total_listen) : 0}</Text>
                <View style={{ flex: 1 }} />
                <Text style={styles.total}>{item.total_time} </Text>
            </View>

            <Text style={styles.song} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>

            <Text style={styles.singer}>{item.author}</Text>

        </TouchableOpacity>
    )
}

export default ItemMV

const styles = StyleSheet.create({
    container: {
        width: width / 2 - scale(10),
        margin: scale(5),
    },
    image: {
        width: '100%',
        height: scale(120),
        backgroundColor: '#D6D6D6'
    },
    viewTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: scale(30),
        width: '100%',
        top: scale(95),
        left: 0
    },
    total: {
        fontSize: scale(12),
        color: 'white'
    },
    song: {
        fontSize: scale(14),
        color: 'black',
        fontWeight: 'bold',
        marginVertical: scale(5)
    },
    singer: {
        fontSize: scale(12),
        color: 'grey'
    }
})