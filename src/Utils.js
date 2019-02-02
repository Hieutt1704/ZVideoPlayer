import { Dimensions, Platform } from 'react-native'

const deviceW = Dimensions.get('window').width
const basePx = 375
const guidelineBaseWidth = 350
// const guidelineBaseHeight = 680

function px2dp(px) {
    return px * deviceW / basePx
}

// set ss -> mm:ss!
function secondsToTime(time) {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60
}

function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((deviceW.height === 812 || deviceW.width === 812) || (deviceW.height === 896 || deviceW.width === 896))
    )
}

function getStatusBarHeight() {
    return Platform.select({
        ios: isIphoneX() ? 30 : 20,
        android: 0
    })
}

function getBottomSpace(value) {
    return isIphoneX() ? 34 : value || 0
}

const scale = size => deviceW / guidelineBaseWidth * size

export {
    px2dp,
    secondsToTime,
    isIphoneX,
    getStatusBarHeight,
    getBottomSpace,
    scale
}