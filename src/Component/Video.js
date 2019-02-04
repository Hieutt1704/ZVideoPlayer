import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Animated, Easing, Platform } from 'react-native'

import data from '../assets/data01'
import Video from 'react-native-video'
import * as Progress from 'react-native-progress'
import {
    next, pause, play, prevous, zoom_in, zoom_out, anh_yeu_em, replay,
    skip_next, headphones, alert_outline, volume_off, volume_on
} from '../IconManager'
import { secondsToTime, fixNumber, getStatusBarHeight, getBottomSpace, isIphoneX } from '../Utils'

const { width, height } = Dimensions.get('window')

class ProgressCircle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
        }
    }


    componentDidMount() {
        this.animate()
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const { parentState } = this.props
    //     const prevParentState = nextProps.parentState
    //     if (JSON.stringify(parentState) != JSON.stringify(prevParentState))
    //         return false
    //     return true
    // }

    componentWillUnmount() {
        clearInterval(this.Interval)
    }

    animate() {
        let progress = 0
        this.Interval = setInterval(() => {
            progress += Math.random() / 7
            this.setState({ progress })
            if (progress > 1) {
                progress = 1
                clearInterval(this.Interval)
                this.props.goNext()
            }
        }, 500)
    }

    clearCircle() {
        if (this.state.progress > 0) {
            this.setState({ progress: 0 })
            clearInterval(this.Interval)
        }
    }

    render() {
        const { parentState } = this.props
        const style = parentState.isFullscreen ? styles.fullMidControls : styles.midControls
        const size = parentState.isFullscreen ? 60 : 40
        const styleNext = parentState.isFullscreen ? styles.fullNext : styles.skipNext
        const iconNext = parentState.isFullscreen ? skip_next(45) : skip_next(30)
        return (
            <View style={[style]}>

                <Progress.Circle
                    size={size}
                    strokeCap='round'
                    progress={this.state.progress}
                    indeterminate={false}
                />

                <TouchableOpacity onPress={() => this.props.goNext()} activeOpacity={0.7} style={styleNext}>
                    {iconNext}
                </TouchableOpacity>

            </View>
        )
    }
}

export default class ZVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            video: '',
            not_found: false,
            paused: false,
            isEnd: false,
            isControls: true,
            isNext: true,
            isPrevous: true,
            playable: 0,
            progress: 0,
            duration: 0,
            lastScreenPress: 0,
            isVisible: false,
            muted: false,
            isFullscreen: false,
            rotate: new Animated.Value(0)
        }
        this._timeOut = this._timeOut.bind(this)
        this._toggleShow = this._toggleShow.bind(this)
        this._togglePlayPause = this._togglePlayPause.bind(this)
        this._togglePrevous = this._togglePrevous.bind(this)
        this._toggleNext = this._toggleNext.bind(this)
        this._toggleProgress = this._toggleProgress.bind(this)
        this._toggleFullscreen = this._toggleFullscreen.bind(this)
        this._setProgress = this._setProgress.bind(this)
        this._setEnd = this._setEnd.bind(this)
        this._getDuration = this._getDuration.bind(this)
    }

    componentDidMount() {
        const { item } = this.props
        requestAnimationFrame(() => {
            this.setState({
                isVisible: true,
            })
        })
        this._getVideo(item.href)
    }

    componentDidUpdate(nextProps, nextState) {
        const { item } = this.props
        const prevItem = nextProps.item
        if (item.href != prevItem.href && item.href)
            this._getVideo(item.href)
    }

    _getVideo(url) {
        let not_found = true
        if (this.player && this.state.isEnd)
            this.player.seek(0)
        data.map(e => {
            if (e.html == url) {
                this.setState({ isEnd: false, paused: false, progress: 0, playable: 0, duration: 0, video: e.video })
                not_found = false
            }
        })
        if (not_found)
            this.setState({ isEnd: false, paused: false, progress: 0, playable: 0, duration: 0, video: '' })
        this.setState({ not_found })
        this._timeOut()
    }

    _timeOut() {
        clearTimeout(this.lastTimeout)
        this.lastTimeout = setTimeout(() => {
            this.setState({ isControls: false })
        }, 5000)
    }

    _toggleShow() {
        const { lastScreenPress } = this.state
        const time = new Date().getTime()
        const delta = time - lastScreenPress
        if (delta < 300) {
            this._toggleFullscreen()
        }
        this.setState({ isControls: true, lastScreenPress: time })
        this._timeOut()
    }

    _togglePlayPause() {
        const { paused, progress } = this.state
        if (progress >= 0.9981) { //when video end -> replay
            this.setState({ progress: 0, isEnd: false })
            this.player.seek(0)
        }
        this.setState({
            paused: !paused
        })
        this._timeOut()
    }

    _toggleProgress(e, widthProgress) {
        const { duration, not_found } = this.state
        if (not_found || duration == 0) return
        const position = e.nativeEvent.locationX
        const progress = (position / widthProgress) * duration
        this.player.seek(progress)
        this.setState({ progress: (position / widthProgress), isEnd: false })
        this._timeOut()
    }

    _toggleFullscreen() {
        const { isFullscreen, rotate } = this.state
        this.setState({ isFullscreen: !isFullscreen })
        this.props.onFullscreen(isFullscreen)
        Animated.timing(rotate, {
            toValue: isFullscreen ? 0 : 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start()
    }

    _toggleNext() {
        this.props.onNext()
        this._timeOut()
    }

    _togglePrevous() {
        this.props.onPrevous()
        this._timeOut()
    }

    _setProgress(progress) {
        const { duration, not_found } = this.state
        if (not_found || !duration) return
        this.setState({
            progress: progress.currentTime / duration,
            playable: progress.playableDuration / duration
        })
    }

    _setEnd() {
        this.setState({ paused: true, isControls: true, isEnd: true })
    }

    _getDuration(meta) {
        this.setState({
            duration: meta.duration,
        })
    }

    render() {
        if (!this.state.isVisible) {
            return null
        }
        const { item } = this.props
        const { progress, isControls, isEnd, video, muted, playable, isFullscreen,
            paused, isPrevous, isNext, duration, not_found } = this.state
        const title = item ? item.title : ''
        const listen = item.total_listen ? fixNumber(item.total_listen) : 0
        //Fullscreen
        const iconReplay = isFullscreen ? replay(30) : replay(18)
        const iconPlay = isFullscreen ? play(30) : play(18)
        const iconPause = isFullscreen ? pause(30) : pause(18)
        const iconRun = isEnd ? iconReplay : !paused ? iconPause : iconPlay
        const iconZin = isFullscreen ? zoom_in(30) : zoom_in(18)
        const iconZout = isFullscreen ? zoom_out(30) : zoom_out(18)
        const iconFullscreen = !isFullscreen ? iconZin : iconZout
        const styleVideo = isFullscreen ? styles.fullVideo : styles.video
        const stylePlayer = isFullscreen ? styles.fullPlayer : styles.player
        const styleIcon = isFullscreen ? styles.fullIcon : styles.iconButton
        const iconVolumeOn = isFullscreen ? volume_on(30) : volume_on(18)
        const iconVolumeOff = isFullscreen ? volume_off(30) : volume_off(18)
        const styleControl = isFullscreen ? styles.fullControls : styles.controls
        const heightProgress = isFullscreen ? 10 : 5
        const widthProgress = isFullscreen ? height - getStatusBarHeight() - getBottomSpace(10) : width
        const sizeDuration = isFullscreen ? 16 : 12
        const styleMid = isFullscreen ? styles.fullErr : styles.err
        //animation
        const rotate = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        })

        const viewMidControll = !not_found ?
            !isEnd ?
                progress >= playable || duration == 0 ?
                    <View style={styleMid}>
                        <ActivityIndicator size={"large"} color={'#009ef8'} animating={true} />
                    </View> :
                    null :
                <ProgressCircle
                    parentState={this.state}
                    ref={ref => this.Circle = ref}
                    goNext={this._toggleNext}
                /> :
            <View style={styleMid}>
                {alert_outline(40, 'white')}
                <Text style={styles.textErr}>Not found!</Text>
            </View>

        const viewPrevous = !isPrevous ? null :
            <TouchableOpacity onPress={this._togglePrevous} style={styleIcon} activeOpacity={0.7}>
                {isFullscreen ? prevous(30) : prevous(18)}
            </TouchableOpacity>

        const viewNext = !isNext ? null :
            <TouchableOpacity onPress={this._toggleNext} style={styleIcon} activeOpacity={0.7}>
                {isFullscreen ? next(30) : next(18)}
            </TouchableOpacity>

        return (
            <Animated.View style={isFullscreen ? { transform: ([{ rotate }]) } : {}}>

                <TouchableOpacity
                    onPress={this._toggleShow}
                    style={styleVideo}
                    activeOpacity={1}
                >
                    <Video
                        muted={muted}
                        paused={paused}
                        source={{ uri: video ? video : 'https://' }}
                        resizeMode={'cover'}
                        style={stylePlayer}
                        onLoad={this._getDuration}
                        onProgress={this._setProgress}
                        onEnd={this._setEnd}
                        onError={() => this.setState({ not_found: true })}
                        ref={ref => this.player = ref}
                    />
                </TouchableOpacity>

                {/* ========================== CONTROLL ========================= */}

                {isControls ?
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => this.setState({ muted: !muted })}
                            activeOpacity={0.7}
                            style={[styleIcon]}
                        >
                            {muted ? iconVolumeOff : iconVolumeOn}
                        </TouchableOpacity>

                        {isFullscreen ?
                            <View style={styles.info}>
                                <Text style={[styles.fullTitle, { fontWeight: 'bold' }]}
                                    ellipsizeMode='middle' numberOfLines={1}>{title} - </Text>
                                <Text style={styles.fullTitle}>Khắc Việt</Text>
                                <View style={{ flex: 1 }} />
                                {headphones(25, 'white')}
                                <Text style={styles.fullTitle}> {listen}</Text>
                            </View>
                            : null
                        }

                    </View>

                    : null
                }

                {viewMidControll}

                {isControls ?
                    <View style={styleControl}>

                        <TouchableOpacity
                            onPress={(e) => this._toggleProgress(e, widthProgress - 20)}
                            activeOpacity={1}
                            style={[styles.progress, { height: heightProgress }]}
                        >
                            <View style={[{ width: playable * (widthProgress - 20), height: heightProgress }, styles.load]} />
                            <View style={[{ width: progress * (widthProgress - 20), height: heightProgress }, styles.play]} />
                        </TouchableOpacity>

                        <View style={[styles.child, { marginHorizontal: isFullscreen ? 10 : 5 }]}>

                            {viewPrevous}

                            <TouchableOpacity
                                onPress={this._togglePlayPause}
                                style={styleIcon}
                                activeOpacity={0.7}
                            >
                                {iconRun}
                            </TouchableOpacity>

                            {viewNext}

                            <Text style={[styles.duration, { fontSize: sizeDuration }]}>
                                {secondsToTime(Math.floor(progress * duration))}/
                                </Text>

                            <Text style={[styles.duration, { fontSize: sizeDuration }]}>
                                {secondsToTime(Math.floor(duration))}
                            </Text>

                            <View style={{ flex: 1 }} />

                            <TouchableOpacity
                                onPress={this._toggleFullscreen}
                                activeOpacity={0.7}
                                style={styleIcon}
                            >
                                {iconFullscreen}
                            </TouchableOpacity>

                        </View>

                    </View>
                    : null
                }

                {isFullscreen ? null :
                    <View style={styles.viewTitle}>
                        <Text style={styles.title} ellipsizeMode='middle' numberOfLines={1}>{title} - </Text>
                        <Text style={styles.singer}>Khắc Việt</Text>
                        <View style={{ flex: 1 }} />
                        {headphones(20, 'black')}
                        <Text style={styles.listen}> {listen}</Text>
                    </View>
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        transform: ([
            { rotate: '90deg' },
        ])
    },
    video: {
        width,
        height: 250,
        backgroundColor: '#000007'
    },
    player: {
        width,
        height: 250
    },
    midControls: {
        position: 'absolute',
        left: (width - 40) / 2,
        top: 105
    },
    skipNext: {
        position: 'absolute',
        top: 5,
        left: 5
    },
    controls: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 40,
        left: 0,
        right: 0,
        top: 210,
        position: 'absolute',
    },
    progress: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 5,
        marginHorizontal: 10
    },
    child: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 5,
        justifyContent: 'center',
        marginTop: 2,
    },
    duration: {
        color: '#009ef8',
        fontSize: 12,
    },
    icon: {
        height: 15,
        width: 15
    },
    iconButton: {
        height: 30,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewTitle: {
        // flex: 1,
        width: width - 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'stretch',
        marginHorizontal: 5,
        marginTop: 10,
        paddingBottom: 10,
        marginBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    title: {
        maxWidth: width / 2,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    singer: {
        fontSize: 14,
        color: 'black',
        minWidth: 60,
        flex: 1
    },
    listen: {
        fontSize: 14,
        color: 'black'
    },
    err: {
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        left: (width - 80) / 2,
        position: 'absolute',
        top: 105
    },
    textErr: {
        color: 'white',
        fontSize: 14
    },
    load: {
        backgroundColor: 'rgba(255,255,255,.5)',
        // height: 5
    },
    play: {
        backgroundColor: '#009ef8',
        // , height: 5,
        position: 'absolute'
    },
    volume: {
        height: 30,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    //Fullscreen
    fullVideo: {
        width: height - getStatusBarHeight(),
        height: width + 2,
        backgroundColor: '#000007'
    },
    fullPlayer: {
        width: height - getStatusBarHeight(),
        height: width + 2,
        backgroundColor: '#000007',
    },
    fullIcon: {
        height: 40,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullControls: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 50,
        left: 0,
        right: 0,
        top: width - 50,
        position: 'absolute',
    },
    fullErr: {
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        left: (height - 80) / 2,
        position: 'absolute',
        top: (width - 50) / 2,
    },
    fullMidControls: {
        position: 'absolute',
        left: (height - 60) / 2,
        top: (width - 60) / 2,
    },
    fullNext: {
        position: 'absolute',
        top: 7,
        left: 7
    },
    header: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        width: height - (isIphoneX() ? 70 : 30),
        paddingLeft: Platform.OS !== 'ios' ? 10 : 0,
    },
    info: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1
    },
    fullTitle: {
        fontSize: 16,
        color: 'white'
    },
})

// midControls: {
//     position: 'absolute',
//     left: (width - 40) / 2,
//     top: 105
// },