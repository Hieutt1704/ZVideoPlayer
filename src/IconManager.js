import React from 'react'
import { px2dp } from './Utils'
import IconF from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// next, pause, play, prevous, zoom_in, zoom_out
export const pause = (size) => <Icon name={'pause-circle-outline'} size={px2dp(size)} color='#009ef8' />
export const play = (size) => <Icon name={'play-circle-outline'} size={px2dp(size)} color='#009ef8' />
export const replay = (size) => <Icon name={'replay'} size={px2dp(size)} color='#009ef8' />
export const next = (size) => <Icon name={'skip-next-circle-outline'} size={px2dp(size)} color='#009ef8' />
export const skip_next = (size) => <Icon name={'skip-next'} size={px2dp(size)} color='#009ef8' />
export const prevous = (size) => <Icon name={'skip-previous-circle-outline'} size={px2dp(size)} color='#009ef8' />
export const zoom_in = (size) => <IconF name={'expand'} size={px2dp(size)} color='#009ef8' />
export const zoom_out = (size) => <IconF name={'compress'} size={px2dp(size)} color='#009ef8' />
export const headphones = (size, color) => <Icon name={'headphones'} size={px2dp(size)} color={color} />
export const alert_outline = (size, color) => <Icon name={'alert-outline'} size={px2dp(size)} color={color} />
export const volume_on = (size) => <Icon name={'volume-high'} size={px2dp(size)} color='#009ef8' />
export const volume_off = (size) => <Icon name={'volume-off'} size={px2dp(size)} color='#009ef8' />
export const clear = (size) => <Icon name={'close'} size={px2dp(size)} color='white' />
export const search = (size) => <IconF name={'search'} size={px2dp(size)} color='white' />
export const home = (size) => <IconF name={'home'} size={px2dp(size)} color='white' />

//video
export const anh_yeu_em = require('./assets/anh_yeu_em.mp4')