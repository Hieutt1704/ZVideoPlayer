import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconF from 'react-native-vector-icons/FontAwesome'

// next, pause, play, prevous, zoom_in, zoom_out
export const pause = <Icon name={'pause-circle-outline'} size={px2dp(15)} color='grey' />
export const play = <Icon name={'play-circle-outline'} size={px2dp(15)} color='grey' />
export const next = <Icon name={'skip-next-circle-outline'} size={px2dp(15)} color='grey' />
export const prevous = <Icon name={'skip-previous-circle-outline'} size={px2dp(15)} color='grey' />
export const zoom_in = <IconF name={'expand'} size={px2dp(15)} color='arrow-expand-all' />
export const zoom_out = <IconF name={'compress'} size={px2dp(15)} color='grey' />
