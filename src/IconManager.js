import React from 'react'
import { px2dp } from './Utils'
import IconF from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// next, pause, play, prevous, zoom_in, zoom_out
export const pause = <Icon name={'pause-circle-outline'} size={px2dp(18)} color='#009ef8' />
export const play = <Icon name={'play-circle-outline'} size={px2dp(18)} color='#009ef8' />
export const replay = <Icon name={'replay'} size={px2dp(18)} color='#009ef8' />
export const next = (size) => <Icon name={'skip-next-circle-outline'} size={px2dp(size)} color='#009ef8' />
export const skip_next = (size) => <Icon name={'skip-next'} size={px2dp(size)} color='#009ef8' />
export const prevous = <Icon name={'skip-previous-circle-outline'} size={px2dp(18)} color='#009ef8' />
export const zoom_in = <IconF name={'expand'} size={px2dp(18)} color='#009ef8' />
export const zoom_out = <IconF name={'compress'} size={px2dp(18)} color='#009ef8' />
//video
export const anh_yeu_em = require('./assets/anh_yeu_em.mp4')