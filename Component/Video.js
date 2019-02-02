import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { Component } from 'react'
// import { next, pause, play, prevous, zoom_in, zoom_out } from './IconManager'
import Video from 'react-native-video'
const { width, height } = Dimensions.get('window')

export default class ZVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //Data
            // video: [GuiltyCrown, Overfly, Lk, Guilty],
            data: "dsfsfs",
            // Video
            uri: 'https://www.youtube.com/watch?v=UiTstUYNgvk', type: 'mpd',
            // resizeMode: 'contain',
            paused: false,
            // Control
            isMidPause: false,
            isRepeat: false,
            isControls: true,
            isNext: true,
            isPrevous: true,
            progress: 0,
            duration: 0,
            isFullscreen: false,
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
    // On Control----------------------------------------------------------------------------------------------
    // Timeout hide controls----------------------------------------------------------------------
    _timeOut() {
        // var e = this
        // clearTimeout(e.lastTimeout)
        // e.lastTimeout = setTimeout(function () {
        //     e.setState({ isControls: false })
        // }, 3000)
    }

    // Show Controls--------------------------------------------------------------------
    _toggleShow() {
        const { lastScreenPress } = this.state
        const time = new Date().getTime()
        const delta = time - lastScreenPress
        if (delta < 300) {
            this._toggleFullscreen()
        }
        this._togglePlayPause()
        this.setState({ isControls: true, lastScreenPress: time })
        this._timeOut()
    }

    //Control pause/Play-----------------------------------------------------------------
    _togglePlayPause() {
        const { paused, isMidPause, progress } = this.state
        if (progress >= 0.9981) {
            this.setState({ progress: 0 })
            this.player.seek(0)
        }
        this.setState({
            paused: !paused, isMidPause: !isMidPause
        })
        this._timeOut()
    }

    // Control progress-------------------------------------------------------------------!!!!!!
    _toggleProgress(e, heightProgress) {
        const position = e.nativeEvent.locationX
        const progress = (position / heightProgress) * this.state.duration
        this.setState({ paused: false, isMidPause: false })
        this.player.seek(progress)
        this._timeOut()
    }

    // Full screen-------------------------------------------------------------------------
    _toggleFullscreen() {
        const { isFullscreen } = this.state
        this.setState({ isFullscreen: !isFullscreen })
        // Fullscreen follow resizeMode-------------------------------------------
        // const resize = isFullscreen == true ? 'stretch' : 'contain'
        // this.setState({ resizeMode: resize })
    }

    // Next---------------------------------------------------------------------------------
    _toggleNext() {
        // const { data, video } = this.state
        // this.setState({ data: data + 1 })
        // if (data + 1 == video.length - 1)
        //     this.setState({ isNext: false })
        // else
        //     this.setState({ isNext: true, isPrevous: true, paused: false, isMidPause: false })
        // this.timeOut()
    }

    // prevous------------------------------------------------------------------------------
    _togglePrevous() {
        // const { data, video } = this.state
        // this.setState({ data: data - 1 })
        // if (data - 1 == 0)
        //     this.setState({ isPrevous: false })
        // else
        //     this.setState({ isNext: true, isPrevous: true, paused: false, isMidPause: false })
        // this.timeOut()
    }

    // On Video--------------------------------------------------------------------------------------------------
    // Set progress-----------------------------------------------------------------------
    _setProgress(progress) {
        const { duration } = this.state
        this.setState({
            progress: progress.currentTime / duration,
        })
    }

    // Set pause video when video end-----------------------------------------------------
    _setEnd() {
        this.setState({ paused: true, isControls: true, isMidPause: true })
    }

    // Set duration cua video-------------------------------------------------------------
    _getDuration(meta) {
        this.setState({
            duration: meta.duration,
        })
    }

    render() {

        // const { data, progress, isFullscreen, isControls, isMidPause, isRepeat,
        //     paused, isPrevous, isNext, duration, uri } = this.state
        // const widthProgress = isFullscreen ? height - 120 : width - 120
        // const videoContainer =  { width: width, height: 250, }
        // const controls = isFullscreen ? styles.rotateControls : styles.controls
        // const midControls = isFullscreen ? styles.rotateMidControls : styles.midControls
        // const uri = video[data]

        // const iconPause = !paused ? pause : play
        // const iconFullscreen = !isFullscreen ? zoom_in : zoom_out
        // const viewMidControll = !isMidPause ? null :
        //     <View style={midControls}>
        //         <TouchableWithoutFeedback onPress={this._toggleShow}>
        //             <Image source={iconPause} style={{ height: 40, width: 40 }} />
        //         </TouchableWithoutFeedback>
        //     </View>
        // const viewPrevous = !isPrevous ? null :
        //     <TouchableOpacity onPress={this._togglePrevous} style={styles.iconButton}>
        //         <Image source={prevous} style={styles.icon} />
        //     </TouchableOpacity>
        // const viewNext = !isNext ? null :
        //     <TouchableOpacity onPress={this._toggleNext} style={styles.iconButton}>
        //         <Image source={next} style={styles.icon} />
        //     </TouchableOpacity>

        return (
            <View style={styles.container} />
            // <View style={styles.container}>
            //     <TouchableWithoutFeedback onPress={this._toggleShow}>
            //         <View style={videoContainer}>
            //             <Video
            //                 paused={paused}
            //                 // source={{ uri: uri }}
            //                 source={require('../../assets/Video/EndingDepartures.mp4')}
            //                 source={data}
            //                 style={{ width: "100%", height: "100%" }}
            //                 onLoad={this._getDuration}
            //                 onProgress={this._setProgress}
            //                 onEnd={this._setEnd}
            //                 ref={ref => {
            //                     this.player = ref
            //                 }}
            //             />
            //         </View>
            //     </TouchableWithoutFeedback>
            //     {/* Mid control---------------------------------------------------------------------- */}
            //     {/* Pause----------------------------------------------------- */}
            //     {viewMidControll}
            //     {/* Repeat when video end--------------------------------------
            //     {isRepeat ?
            //         <View style={midControls}>
            //             <TouchableWithoutFeedback>
            //                 <Icon name={'repeat'} size={60} color='#FFF' />
            //             </TouchableWithoutFeedback>
            //         </View> : null
            //     } */}
            //     {/* Control------------------------------------------------------------------------ */}
            //     {
            //         isControls ?
            //             <View style={controls}>
            //                 <View style={styles.child}>
            //                     {/* View duration fowlow progress--------------------------------------- */}
            //                     <Text style={[styles.duration, { right: 10 }]}>
            //                         {/* {secondsToTime(Math.floor(progress * duration))} */}11:00
            //                     </Text>
            //                     {/* Progress------------------------------------------------------------- */}
            //                     <TouchableWithoutFeedback onPress={(e) => this._toggleProgress(e, widthProgress)}>
            //                         <View style={{ width: widthProgress, backgroundColor: 'rgba(255,255,255,.5)', height: 5 }}>
            //                             <View style={{ width: progress * widthProgress, backgroundColor: '#FFF', height: 5 }} />
            //                             {/* <View style={{ width: (1 - progress) * widthProgress, height: 20 }}></View> */}
            //                         </View>
            //                     </TouchableWithoutFeedback>
            //                     <Text style={[styles.duration, { left: 10 }]}>
            //                         {/* {secondsToTime(Math.floor(duration))} */}00:00
            //                     </Text>
            //                 </View>
            //                 <View style={styles.child}>
            //                     {/* Prevous---------------------------------------------------------- */}
            //                     {viewPrevous}
            //                     {/* Play/Pause--------------------------------------------------------- */}
            //                     <TouchableOpacity onPress={this._togglePlayPause} style={styles.iconButton}>
            //                         <Image source={iconPause} style={styles.icon} />
            //                     </TouchableOpacity>
            //                     {/* Next--------------------------------------------------------------- */}
            //                     {viewNext}
            //                     <View style={{ flex: 1 }} />
            //                     <TouchableOpacity onPress={this._toggleFullscreen}>
            //                         <Image source={iconFullscreen} style={styles.icon} />
            //                     </TouchableOpacity>
            //                 </View>
            //             </View>
            //             : null
            //     }
            // </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
        // width: width,
        // height: 200,
    },
    video: {
        width: width,
        height: 200,
    },
    midControls: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        left: (width - 60) / 2,
        // height: 60,
        // width: 60,
    },
    controls: {
        backgroundColor: "#979797",
        height: 55,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        // justifyContent: "space-around",
    },
    child: {
        flexDirection: 'row',
        alignItems: "center",
        marginHorizontal: 15,
        justifyContent: 'center',
        marginTop: 5,
        // backgroundColor: 'blue',
        // alignSelf: 'stretch',
    },
    duration: {
        color: "#FFF",
    },
    icon: {
        height: 15,
        width: 15
    },
    iconButton: {
        marginRight: 15,
    }
})