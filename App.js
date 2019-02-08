import React from 'react'
import {
    View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, StatusBar, Keyboard, Platform, ToastAndroid
} from 'react-native'

import ZVideo from './src/Component/Video'
import { getStatusBarHeight, scale } from './src/Utils'
import { alert_outline, home } from './src/IconManager'
import SplashScreen from 'react-native-splash-screen'
import { ItemMV, SearchBar } from './src/Views/ViewManager'
import { getMyVideos, searchVideos } from './src/Networking/Apis'

class App extends React.Component {
    constructor(props) {
        super(props)
        console.disableYellowBox = true
        this.state = {
            type: 'home',
            keysearch: '',
            videos: [],
            next_page: 2,
            end_page: false,
            is_refresh: false,
            err: false,
            load_center: true,
            isFullscreen: false,
            is_search: false
        }
        this._getVideos = this._getVideos.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this._onLoadMore = this._onLoadMore.bind(this)
        this._openVideo = this._openVideo.bind(this)
        this._onNext = this._onNext.bind(this)
        this._onPrevous = this._onPrevous.bind(this)
        this._goHome = this._goHome.bind(this)
        this._onSearch = this._onSearch.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000)

        this.setState({ load_center: true }, () => {
            this._getVideos()
                .then(res => {
                    if (!res.success)
                        setTimeout(() => {
                            this.setState({ err: true, load_center: false })
                        }, 1000)
                    else
                        this.setState({ err: false, load_center: false })
                })
        })
    }

    _getData(page) {
        // console.log(type, keysearch)
        const { type, keysearch } = this.state
        if (type == 'home') {
            const params = '?page=' + page
            return getMyVideos(params)
        }
        else {
            const params = '?page=' + page + '&q=' + keysearch
            return searchVideos(params)
        }
    }

    _getVideos() {
        return this._getData(1)
            .then(res => {
                // console.log(res)
                if (res.success)
                    this.setState({
                        videos: res.data,
                        next_page: 2,
                        end_page: res.data.length < 18
                    })
                return res
            })
    }

    _onRefresh() {
        this.setState({ is_refresh: true }, () => {
            this._getVideos().then(res => {
                this.setState({ is_refresh: false }, () => {
                    if (!res.success)
                        alert('Opps, somthing went wrong!')
                })
            })
        })
    }

    _onLoadMore() {
        const { videos, next_page, end_page } = this.state
        if (end_page) return
        this._getData(next_page).then(res => {
            if (res.success)
                this.setState({
                    videos: videos.concat(res.data),
                    next_page: next_page + 1,
                    end_page: res.data.length < 18
                })
            else alert('Opps, somthing went wrong!')
        })
    }

    _openVideo(item) {
        const { videos } = this.state
        const index = videos.indexOf(item)
        if (index == 0)
            this.ZVideo._getVideo(item.id_video)
        else {
            const cutVideos = videos.splice(0, index).map((e, i, a) => {
                return a[a.length - 1 - i]
            })
            const newVideos = videos.concat(cutVideos)
            this.setState({ videos: newVideos })
        }
        this._scrollToTop()
    }

    _onNext() {
        const { videos } = this.state
        if (videos.length == 0) return
        const cutVideos = videos.splice(0, 1)
        const newVideos = videos.concat(cutVideos)
        this.setState({ videos: newVideos })
        this._scrollToTop()
    }

    _onPrevous() {
        const { videos } = this.state
        if (videos.length == 0) return
        const cutVideos = videos.splice(videos.length - 1, 1)
        const newVideos = cutVideos.concat(videos)
        this.setState({ videos: newVideos })
        this._scrollToTop()
    }

    _scrollToTop() {
        if (this.FlatList)
            this.FlatList.scrollToOffset({ animated: true, offset: 0 })
    }

    _goHome() {
        Keyboard.dismiss()
        this.setState({ type: 'home', is_search: true }, () => {
            this._getVideos().then(res => this.setState({ is_search: false }))
        })
    }

    _onSearch(key) {
        Keyboard.dismiss()
        if (Platform.OS != 'ios') {
            ToastAndroid.showWithGravity(
                'Comming soon on android',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
        else
            this.setState({ type: 'search', keysearch: key, is_search: true }, () => {
                this._getVideos().then(res => this.setState({ is_search: false }))
            })
    }

    render() {
        const { videos, end_page, is_refresh, err, load_center, isFullscreen, keysearch, is_search } = this.state
        const vLoad = !end_page && videos.length > 0 || load_center || is_search ?
            <View style={load_center ? styles.container : styles.loading}>
                <ActivityIndicator size={"large"} color={'#009ef8'} animating={true} />
            </View> : null
        return (
            <TouchableOpacity style={styles.supperContainer} onPress={() => Keyboard.dismiss()} activeOpacity={1}>

                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor='#009ef8'
                />

                {load_center ? vLoad : err ?
                    <View style={styles.container}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.buttonErr}
                            onPress={() => this.componentDidMount()}
                        >
                            {alert_outline(scale(40), 'grey')}
                            <Text style={styles.fail}>Opps, something went wrong!</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    < View style={styles.container}>

                        {!isFullscreen ?
                            <SearchBar
                                goHome={this._goHome}
                                onSearch={this._onSearch}
                            />
                            : null
                        }

                        <ZVideo
                            ref={ref => this.ZVideo = ref}
                            item={videos.length > 0 ? videos[0] : {}}
                            onNext={this._onNext}
                            onPrevous={this._onPrevous}
                            onFullscreen={(isFull) => this.setState({ isFullscreen: !isFull })}
                        />

                        {!isFullscreen ?
                            is_search ?
                                vLoad
                                : videos.length == 0 ?
                                    <View style={styles.container}>
                                        <Text style={styles.fail}>0 results for "{keysearch}".</Text>
                                        <Text style={styles.fail}>Try searching again using broader keywords.</Text>
                                    </View>
                                    :
                                    <FlatList
                                        ref={ref => this.FlatList = ref}
                                        refreshing={is_refresh}
                                        onRefresh={this._onRefresh}
                                        data={videos}
                                        numColumns={2}
                                        keyExtractor={(item, index) => index + ''}
                                        renderItem={({ item, index }) =>
                                            <ItemMV
                                                item={item}
                                                index={index}
                                                openVideo={this._openVideo}
                                            />
                                        }
                                        onEndReached={this._onLoadMore}
                                        onEndReachedThreshold={0.2}
                                        ListFooterComponent={vLoad}
                                    />
                            : null
                        }

                    </View>
                }
            </TouchableOpacity>
        )
    }
}

export default App

const styles = StyleSheet.create({
    supperContainer: {
        flex: 1,
        backgroundColor: '#009ef8',
        paddingTop: getStatusBarHeight(),
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10)
    },
    buttonErr: {
        height: scale(80),
        width: scale(220),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowOffset: { height: 0 },
        shadowColor: 'grey',
        shadowOpacity: 1,
        elevation: 2,
    },
    fail: {
        color: 'grey',
        fontSize: scale(14),
    },
})