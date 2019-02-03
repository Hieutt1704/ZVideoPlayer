import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Video from 'react-native-video'
import * as Progress from 'react-native-progress'
import { secondsToTime, filterHtml, findAllLetter } from '../Utils'
import { endUrlHref, startUrlVideo, endUrlVideo } from '../Networking/Apis'
import { next, pause, play, prevous, zoom_in, zoom_out, anh_yeu_em, replay, skip_next, headphones } from '../IconManager'

const { width, height } = Dimensions.get('window')

class ProgressCircle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            indeterminate: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { parentState } = this.props
        const prevParentState = nextProps.parentState
        if (JSON.stringify(parentState) != JSON.stringify(prevParentState))
            return false
        return true
    }

    animate() {
        let progress = 0
        this.setState({ progress });
        this.Interval = setInterval(() => {
            progress += Math.random() / 7
            if (progress > 1) {
                progress = 1
                clearInterval(this.Interval)
                alert('go')
            }
            // console.log(progress)
            this.setState({ progress })
        }, 500)
    }

    clearCircle() {
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

                <TouchableOpacity onPress={() => { }} activeOpacity={0.7} style={styles.skipNext}>
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
            videos: [],
            paused: false,
            isEnd: false,
            isControls: true,
            isNext: true,
            isPrevous: true,
            progress: 0,
            duration: 0,
            lastScreenPress: 0,
            isVisible: false,
            progress: 0,
            indeterminate: true,
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
        this._getVideo()
        // var arrListCSSFilePlayer = [{ k: "player", v: "html5/nct-player-video/css/style.0.9.css" }];
        // loadScript("css", arrListCSSFilePlayer, "html5/nct-player-video/");
        // var arrListFilePlayer = [
        //     { k: "player", v: "html5/nct-player-video/version/0.73.js" },
        //     { k: "polyfiller", v: "html5/nct-player-video/polyfiller.js" },
        //     { k: "vast-client", v: "html5/nct-player-video/utils/vast-client.js" },
        //     { k: "hls-core", v: "html5/nct-player-video/hls/dist/hls.js" },
        //     { k: "player16", v: "js/lib/nct.player.1.6.js" }
        // ];
        // loadScript("js", arrListFilePlayer, "");
        this._timeOut()
        requestAnimationFrame(() => {
            this.setState({
                isVisible: true,
            })
        })
    }

    componentDidUpdate(nextProps, nextState) {
        const { item } = this.props
        const prevItem = nextProps.item
        // console.log(item)
        // if (item.href != prevItem.href && item.href)
        //     this._getVideo(item.href)
    }

    _getVideo() {
        const url = 'https://www.nhaccuatui.com/video/nu-cuoi-man-khac-viet.bPlblM0LyNNcT.html'
        fetch(url).then((resp) => {
            console.log('??', resp)
            if (resp.ok) return resp.text()
            return false
        }).then((text) => {
            console.log(text)
            //'5821823', '1549196522737', 'bf668d2d2a4081a5027a5b549a8041cd', "video

            // link = 'https://vredir.nixcdn.com/PreNCT15/NuCuoiMan-KhacViet-5821823.mp4?st=bf668d2d2a4081a5027a5b549a8041cd&e=1549279520&t=1549196522737'
            // console.log('???', findAllLetter(text, 'https://mcloud-bf-s7-mv-zmp3.zadn.vn/bp7rX-LThpo/cbcf9b690b2de273bb3c/d239953d9c7875262c69/360/Phia-Sau-Mot-Co-Gai.mp4?authen=exp=1549370916~acl=/bp7rX-LThpo/*~hmac=426a64ee2fb7ceba040d30d653ea8068'))
            console.log('????', findAllLetter(text, '1549279520'))
            console.log(findAllLetter(text, 'video'))
            // console.log(findAllLetter(text, 'nQzcjJEwikmnqrIIUgYqXg'))
            // // const list = filterHtml(startUrlVideo, endUrlVideo, text).map((e, i) => {
            //     console.log(e)
            // })
            // <video playsinline="" class="videoTag" id="videonctPlayer" poster="" src="https://vredir.nixcdn.com/PreNCT15/NuCuoiMan-KhacViet-5831902.mp4?st=nQzcjJEwikmnqrIIUgYqXg&amp;e=1549279520&amp;t=1549193162296"></video>
        })
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
            if (this.Circle)
                this.Circle.clearCircle()
        }
        this.setState({
            paused: !paused
        })
    }

    _toggleProgress(e, widthProgress) {
        const position = e.nativeEvent.locationX
        const progress = (position / widthProgress) * this.state.duration
        this.player.seek(progress)
        this.setState({ progress: (position / widthProgress), isEnd: false })
        if (this.Circle)
            this.Circle.clearCircle()
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
        this.setState({ paused: true, isControls: true, isEnd: true }, () => {
            this.Circle.animate()
            clearTimeout(this.lastTimeout)
        })
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
        // console.log(item)
        const { data, progress, isControls, isEnd, indeterminate,
            paused, isPrevous, isNext, duration, progressCircle } = this.state
        // const widthProgress = isFullscreen ? height - 120 : width - 120
        // const videoContainer = { width: width, height: 250, }
        // const controls = isFullscreen ? styles.rotateControls : styles.controls
        // const midControls = isFullscreen ? styles.rotateMidControls : styles.midControls
        // const uri = video[data]
        const title = item ? item.title : ''
        const listen = item ? item.total_listen : ''
        const iconPause = isEnd ? replay : !paused ? pause : play
        // const iconFullscreen = !isFullscreen ? zoom_in : zoom_out
        const viewMidControll = !isEnd ? null :
            <ProgressCircle
                prarentState
                ref={ref => this.Circle = ref}
            />

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
                        // source={{ uri: 'blob:https://mp3.zing.vn/3ce8ac23-507a-4066-b7be-622ca43623cf' }}
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

                <View style={styles.viewTitle}>
                    <Text style={styles.title}>{title} - </Text>
                    <Text style={styles.singer}>Khắc Việt</Text>
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
        backgroundColor: 'black'
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
        height: 30,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 10,
        paddingBottom: 10,
        marginBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    title: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    singer: {
        fontSize: 14,
        color: 'black',
        flex: 1
    },
    listen: {
        fontSize: 14,
        color: 'black'
    }
})