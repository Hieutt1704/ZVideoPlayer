import React from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import ZVideo from './src/Component/Video'
import ItemMV from './src/Component/ItemMV'
import { alert_outline } from './src/IconManager'
import { filterHtml, getStatusBarHeight } from './src/Utils'
import {
    baseUrl, startUrlItem, endUrlItem, startUrlHref, endUrlHref, startUrlTitle, endUrlTitle,
    startUrlImage, startUrlTime, endUrlTime, startUrlListen, endUrlListen, endUrlImage
} from './src/Networking/Apis'

class App extends React.Component {
    constructor(props) {
        super(props)
        console.disableYellowBox = true
        this.state = {
            videos: [],
            next_page: 1,
            end_page: false,
            is_refresh: false,
            err: false,
            load_center: true
        }
        this._getVideos = this._getVideos.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this._onLoadMore = this._onLoadMore.bind(this)
        this._openVideo = this._openVideo.bind(this)
        this._onNext = this._onNext.bind(this)
        this._onPrevous = this._onPrevous.bind(this)
    }

    componentDidMount() {
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

    _getData(url) {
        return fetch(url).then((resp) => {
            // console.log(resp)
            if (resp.ok) return resp.text()
        }).then((text) => {
            if (text)
                return {
                    data: filterHtml(startUrlItem, endUrlItem, text).map((e, i) => {
                        // console.log(e)
                        const href = filterHtml(startUrlHref, endUrlHref, e)[0] + endUrlHref
                        const title = filterHtml(startUrlTitle, endUrlTitle, e)[0]
                        const image = filterHtml(startUrlImage, endUrlImage, e)[0]
                        const total_time = filterHtml(startUrlTime, endUrlTime, e)[0]
                        const total_listen = filterHtml(startUrlListen, endUrlListen, e)[0]
                        const item = { title, href, total_time, total_listen, image }
                        return item
                    }),
                    success: true
                }
            return { success: false }
        }).catch(err => { return { success: false } })
    }

    _getVideos() {
        return this._getData(baseUrl)
            .then(res => {
                if (res.success)
                    this.setState({
                        videos: res.data,
                        end_page: res.data.length < 40
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
        this._getData(baseUrl + next_page).then(res => {
            if (res.success)
                this.setState({
                    videos: videos.concat(res.data),
                    next_page: next_page + 1,
                    end_page: res.data.length < 40
                })
            else alert('Opps, somthing went wrong!')
        })
    }

    _openVideo(item) {
        const { videos } = this.state
        const index = videos.indexOf(item)
        if (index == 0)
            this.ZVideo._getVideo(item.href)
        else {
            const cutVideos = videos.splice(0, index)
            const newVideos = videos.concat(cutVideos)
            this.setState({ videos: newVideos })
        }
    }

    _onNext() {
        const { videos } = this.state
        if (videos.length == 0) return
        const cutVideos = videos.splice(0, 1)
        const newVideos = videos.concat(cutVideos)
        this.setState({ videos: newVideos })
    }

    _onPrevous() {
        const { videos } = this.state
        if (videos.length == 0) return
        const cutVideos = videos.splice(videos.length - 1, 1)
        const newVideos = cutVideos.concat(videos)
        this.setState({ videos: newVideos })
    }

    render() {

        const { videos, end_page, is_refresh, err, load_center } = this.state
        const vLoad = !end_page && videos.length > 0 || load_center ?
            <View style={load_center ? styles.container : styles.loading}>
                <ActivityIndicator size={"large"} color={'#009ef8'} animating={true} />
            </View> : null
        return (
            <View style={styles.supperContainer}>
                {load_center ? vLoad : err ?
                    <View style={styles.container}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.buttonErr}
                            onPress={() => this.componentDidMount()}
                        >
                            {alert_outline(40, 'grey')}
                            <Text style={styles.fail}>Opps, something went wrong!</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    < View style={styles.container}>

                        <ZVideo
                            ref={ref => this.ZVideo = ref}
                            item={videos.length > 0 ? videos[0] : {}}
                            onNext={this._onNext}
                            onPrevous={this._onPrevous}
                        />

                        <FlatList
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

                    </View>
                }
            </View>
        )
    }
}

export default App

const styles = StyleSheet.create({
    supperContainer: {
        flex: 1,
        backgroundColor: '#009ef8',
        paddingTop: 20 + getStatusBarHeight(),
        // paddingBottom: 20 + getBottomSpace(),
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
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    buttonErr: {
        height: 80,
        width: 220,
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
        fontSize: 14,
    }
})