import { Dimensions, Platform } from 'react-native'

const deviceW = Dimensions.get('window').width
const basePx = 375
const guidelineBaseWidth = 350
// const guidelineBaseHeight = 680

const scale = size => deviceW / guidelineBaseWidth * size

function px2dp(px) {
    return px * deviceW / basePx
}

// set ss -> mm:ss!
function secondsToTime(time) {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60
}

function isIphoneX() {
    const dimen = Dimensions.get('window')
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

function getStatusBarHeight() {
    return Platform.select({
        ios: isIphoneX() ? scale(40) : scale(20),
        android: 0
    })
}

function getBottomSpace(value) {
    return isIphoneX() ? scale(30) : value || 0
}


function findAllLetter(source, find) {
    var result = []
    if (source)
        for (i = 0; i < source.length; ++i) {
            // If you want to search case insensitive use 
            // if (source.substring(i, i + find.length).toLowerCase() == find) {
            if (source.substring(i, i + find.length) == find) {
                result.push(i)
            }
        }
    return result
}

function filterHtml(start_letter, end_letter, html) {
    html = html.replace(/\n/ig, '')
    let startArr = findAllLetter(html, start_letter)
    let endArr = findAllLetter(html, end_letter)
    let videos = []
    const slength = start_letter.length
    const elength = end_letter.length
    let firsrtItem = true
    // console.log(start_letter, end_letter, startArr, endArr)
    startArr.map((s, i) => { //s la index cua day chuoi dau 
        endArr.map((e, j) => { // e la index cua day chuoi cuoi
            if (endArr.length == 1 && s < e || firsrtItem) {
                const item = html.slice(s + slength, e)
                firsrtItem = false
                videos.push(item)
            }
            if (j != 0 && endArr[j - 1] < s && s < e) {// s {...} e dung lien nhau 
                const item = html.slice(s + slength, e - elength)
                videos.push(item)
            }
        })
    })
    return videos
}

// Fix number xxxx -> x.xxx
function fixNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export {
    px2dp,
    secondsToTime,
    isIphoneX,
    getStatusBarHeight,
    getBottomSpace,
    scale,
    findAllLetter,
    filterHtml,
    fixNumber
}