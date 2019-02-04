import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'

import data from '../assets/data'
import Video from 'react-native-video'
import { secondsToTime, fixNumber } from '../Utils'
import * as Progress from 'react-native-progress'
import {
    next, pause, play, prevous, zoom_in, zoom_out, anh_yeu_em, replay,
    skip_next, headphones, alert_outline, volume_off, volume_on
} from '../IconManager'

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

    shouldComponentUpdate(nextProps, nextState) {
        const { parentState } = this.props
        const prevParentState = nextProps.parentState
        if (JSON.stringify(parentState) != JSON.stringify(prevParentState))
            return false
        return true
    }

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
                // console.log('anime')
            }
        }, 500)
    }

    clearCircle() {
        // console.log('clear')
        if (this.state.progress > 0) {
            this.setState({ progress: 0 })
            clearInterval(this.Interval)
        }
    }

    render() {
        return (
            <View style={[styles.midControls]}>

                <Progress.Circle
                    size={40}
                    strokeCap='round'
                    progress={this.state.progress}
                    indeterminate={false}
                />

                <TouchableOpacity onPress={() => this.props.goNext()} activeOpacity={0.7} style={styles.skipNext}>
                    {skip_next(30)}
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
        if (this.player)
            this.player.seek(0)
        let not_found = true
        data.map(e => {
            if (e.html == url) {
                this.setState({ isEnd: false, paused: false, progress: 0, playable: 0, video: e.video })
                not_found = false
            }
        })
        if (not_found)
            this.setState({ isEnd: false, paused: false, progress: 0, playable: 0, video: '', duration: 0 })
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
    }

    _toggleProgress(e, widthProgress) {
        if (this.state.not_found) return
        const position = e.nativeEvent.locationX
        const progress = (position / widthProgress) * this.state.duration
        this.player.seek(progress)
        this.setState({ progress: (position / widthProgress), isEnd: false })
        this._timeOut()
    }

    _toggleFullscreen() {
        // const { isFullscreen } = this.state
        // this.setState({ isFullscreen: !isFullscreen })
        // const resize = isFullscreen == true ? 'stretch' : 'contain'
        // this.setState({ resizeMode: resize })
    }

    _toggleNext() {
        this.props.onNext()
    }

    _togglePrevous() {
        this.props.onPrevous()
    }

    _setProgress(progress) {
        if (this.state.not_found) return
        const { duration } = this.state
        this.setState({
            progress: progress.currentTime / duration,
            playable: progress.playableDuration / duration
        })
    }

    _setEnd() {
        this.setState({ paused: true, isControls: true, isEnd: true }, () => {
            clearTimeout(this.lastTimeout)
        })
    }

    _getDuration(meta) {
        if (this.state.not_found) return
        this.setState({
            duration: meta.duration,
        })
    }

    render() {
        if (!this.state.isVisible) {
            return null
        }
        const { item } = this.props
        const { progress, isControls, isEnd, video, muted, playable,
            paused, isPrevous, isNext, duration, not_found } = this.state
        // const widthProgress = isFullscreen ? height - 120 : width - 120
        // const videoContainer = { width: width, height: 250, }
        // const controls = isFullscreen ? styles.rotateControls : styles.controls
        // const midControls = isFullscreen ? styles.rotateMidControls : styles.midControls
        // const uri = video[data]
        const title = item ? item.title : ''
        const listen = item.total_listen ? fixNumber(item.total_listen) : 0
        const iconPause = isEnd ? replay : !paused ? pause : play
        // const iconFullscreen = !isFullscreen ? zoom_in : zoom_out
        // console.log(video)
        // console.log(isEnd)
        const viewMidControll = !not_found ?
            !isEnd ?
                progress >= playable ?
                    <View style={styles.err}>
                        <ActivityIndicator size={"large"} color={'#009ef8'} animating={true} />
                    </View> :
                    null :
                <ProgressCircle
                    prarentState={this.state}
                    ref={ref => this.Circle = ref}
                    goNext={this._toggleNext}
                /> :
            <View style={styles.err}>
                {alert_outline(40, 'white')}
                <Text style={styles.textErr}>Not found!</Text>
            </View>


        const viewPrevous = !isPrevous ? null :
            <TouchableOpacity onPress={this._togglePrevous} style={styles.iconButton} activeOpacity={0.7}>
                {prevous}
            </TouchableOpacity>

        const viewNext = !isNext ? null :
            <TouchableOpacity onPress={this._toggleNext} style={styles.iconButton} activeOpacity={0.7}>
                {next(18)}
            </TouchableOpacity>

        return (
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={this._toggleShow}
                    style={styles.video}
                    activeOpacity={1}
                >
                    <Video
                        muted={muted}
                        paused={paused}
                        source={{ uri: video ? video : 'https://' }}
                        resizeMode={'cover'}
                        style={styles.player}
                        onLoad={this._getDuration}
                        onProgress={this._setProgress}
                        onEnd={this._setEnd}
                        onError={() => this.setState({ not_found: true })}
                        ref={ref => this.player = ref}
                    />
                </TouchableOpacity>

                {/* ========================== CONTROLL ========================= */}

                {isControls ?
                    <TouchableOpacity
                        onPress={() => this.setState({ muted: !muted })}
                        activeOpacity={0.7}
                        style={[styles.iconButton, { position: 'absolute', top: 0 }]}
                    >
                        {muted ? volume_off : volume_on}
                    </TouchableOpacity>
                    : null
                }
                {viewMidControll}

                {isControls ?
                    <View style={styles.controls}>

                        <TouchableOpacity
                            onPress={(e) => this._toggleProgress(e, width - 20)}
                            activeOpacity={1}
                            style={styles.progress}
                        >
                            <View style={[{ width: playable * (width - 20) }, styles.load]} />
                            <View style={[{ width: progress * (width - 20) }, styles.play]} />
                        </TouchableOpacity>

                        <View style={styles.child}>

                            {viewPrevous}

                            <TouchableOpacity
                                onPress={this._togglePlayPause}
                                style={styles.iconButton}
                                activeOpacity={0.7}
                            >
                                {iconPause}
                            </TouchableOpacity>

                            {viewNext}

                            <Text style={[styles.duration]}>
                                {secondsToTime(Math.floor(progress * duration))}/
                                </Text>

                            <Text style={[styles.duration]}>
                                {secondsToTime(Math.floor(duration))}
                            </Text>

                            <View style={{ flex: 1 }} />

                            <TouchableOpacity
                                onPress={this._toggleFullscreen}
                                activeOpacity={0.7}
                                style={styles.iconButton}
                            >
                                {zoom_in}
                            </TouchableOpacity>

                        </View>

                    </View>
                    : null
                }

                <View style={styles.viewTitle}>
                    <Text style={styles.title} ellipsizeMode='middle' numberOfLines={1}>{title} - </Text>
                    <Text style={styles.singer}>Khắc Việt</Text>
                    <View style={{ flex: 1 }} />
                    {headphones(20, 'black')}
                    <Text style={styles.listen}> {listen}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'blue'
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
        marginHorizontal: 5,
        justifyContent: 'center',
        marginTop: 2.5,
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
        height: 5
    },
    play: {
        backgroundColor: '#009ef8'
        , height: 5,
        position: 'absolute'
    }
})