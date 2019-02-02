import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import Video from 'react-native-video'
import { secondsToTime } from '../Utils'
import { next, pause, play, prevous, zoom_in, zoom_out, anh_yeu_em, replay } from '../IconManager'

const { width, height } = Dimensions.get('window')

export default class ZVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: [],
            paused: true,
            isEnd: false,
            isControls: true,
            isNext: true,
            isPrevous: true,
            progress: 0,
            duration: 0,
            lastScreenPress: 0,
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
        const position = e.nativeEvent.locationX
        const progress = (position / widthProgress) * this.state.duration
        this.player.seek(progress)
        this._timeOut()
    }

    _toggleFullscreen() {
        // const { isFullscreen } = this.state
        // this.setState({ isFullscreen: !isFullscreen })
        // const resize = isFullscreen == true ? 'stretch' : 'contain'
        // this.setState({ resizeMode: resize })
    }

    _toggleNext() {
        // const { data, video } = this.state
        // this.setState({ data: data + 1 })
        // if (data + 1 == video.length - 1)
        //     this.setState({ isNext: false })
        // else
        //     this.setState({ isNext: true, isPrevous: true, paused: false, isEnd: false })
        // this.timeOut()
    }

    _togglePrevous() {
        // const { data, video } = this.state
        // this.setState({ data: data - 1 })
        // if (data - 1 == 0)
        //     this.setState({ isPrevous: false })
        // else
        //     this.setState({ isNext: true, isPrevous: true, paused: false, isEnd: false })
        // this.timeOut()
    }

    _setProgress(progress) {
        const { duration } = this.state
        this.setState({
            progress: progress.currentTime / duration,
        })
    }

    _setEnd() {
        this.setState({ paused: true, isControls: true, isEnd: true })
        // this.setTimeOut(()=>{

        // })
    }

    _getDuration(meta) {
        this.setState({
            duration: meta.duration,
        })
    }

    render() {

        const { data, progress, isControls, isEnd,
            paused, isPrevous, isNext, duration, uri } = this.state
        // const widthProgress = isFullscreen ? height - 120 : width - 120
        // const videoContainer = { width: width, height: 250, }
        // const controls = isFullscreen ? styles.rotateControls : styles.controls
        // const midControls = isFullscreen ? styles.rotateMidControls : styles.midControls
        // const uri = video[data]

        const iconPause = isEnd ? replay : !paused ? pause : play
        // const iconFullscreen = !isFullscreen ? zoom_in : zoom_out
        const viewMidControll = isEnd ? null :
            <View style={styles.midControls}>
                <TouchableOpacity onPress={() => { }} activeOpacity={0.7}>
                    {next(36)}
                </TouchableOpacity>
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
                        paused={paused}
                        // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        source={anh_yeu_em}
                        resizeMode={'cover'}
                        style={{ width, height: 250 }}
                        onLoad={this._getDuration}
                        onProgress={this._setProgress}
                        onEnd={this._setEnd}
                        ref={ref => this.player = ref}
                    />
                </TouchableOpacity>

                {/* ========================== CONTROLL ========================= */}

                {viewMidControll}

                {isControls ?
                    <View style={styles.controls}>

                        <TouchableOpacity
                            onPress={(e) => this._toggleProgress(e, width - 20)}
                            activeOpacity={1}
                            style={styles.progress}
                        >
                            <View style={{ width: progress * (width - 20), backgroundColor: '#009ef8', height: 5 }} />
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    },
    video: {
        width,
        height: 250,
        backgroundColor: 'black'
    },
    midControls: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        left: (width - 36) / 2,
        top: 107
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
        backgroundColor: 'rgba(255,255,255,.5)',
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
        // backgroundColor: 'red',
        height: 30,
        width: 35,
        justifyContent:'center',
        alignItems:'center'
    }
})