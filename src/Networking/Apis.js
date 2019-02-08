import { Platform } from 'react-native'
import { filterHtml } from '../Utils'
import {
    startUrlItem, endUrlItem, startUrlHref, endUrlHref, startUrlTitle, endUrlTitle, startUrlImage, endUrlImage,
    startUrlTime, endUrlTime, endUrlListen, startUrlListen, startUrlAuthor, endUrlAuthor, startUrlAndroid, endUrlAndroid
} from './Const'

function request(api, type) {
    return fetch(api).then((resp) => {
        // console.log(resp)
        if (resp.ok) {
            if (type == 'html') {
                if (Platform.OS !== 'ios')
                    return {
                        data: JSON.parse(filterHtml(startUrlAndroid, endUrlAndroid, resp.text()._55)).profile.initial_state.clips.map(e => {
                            return {
                                title: e.title,
                                author: e.user.name,
                                id_video: e.clip_id,
                                total_time: e.duration.formatted,
                                total_listen: e.total_plays ? e.total_plays.formatted : 0,
                                image: e.thumbnail.src_8x
                            }
                        }),
                        success: true
                    }
                else
                    return {
                        data: filterHtml(startUrlItem, endUrlItem, resp.text()._55)
                            .filter(item => { if (item) return item })
                            .map(e => {
                                const id_video = filterHtml(startUrlHref, endUrlHref, e)[0]
                                const title = filterHtml(startUrlTitle, endUrlTitle, e)[0]
                                const author = filterHtml(startUrlAuthor, endUrlAuthor, e)[0]
                                const image = filterHtml(startUrlImage, endUrlImage, e)[0]
                                const total_time = filterHtml(startUrlTime, endUrlTime, e)[0]
                                const total_listen = filterHtml(startUrlListen, endUrlListen, e)[0]
                                return { title, author, id_video, total_time, total_listen, image }
                            }),
                        success: true
                    }
            }
            else {
                return {
                    data: resp.json(),
                    success: true
                }
            }
        }
        else {
            // console.log(resp.text()._55)
            return { success: false }
        }
    }).catch(err => { return { success: false } })
}

// =============================== Apis ================================= //

export function getMyVideos(params) {
    // console.log(params)
    let api = `https://vimeo.com/user94770972` + params
    return request(api, 'html')
}

export function searchVideos(params) {
    let api = `https://vimeo.com/search` + params
    return request(api, 'html')
}

export function getVideo(id_video) {
    let api = `https://player.vimeo.com/video/${id_video}/config?autopause=1&autoplay=1&byline=0&bypass_privacy=1&collections=1&context=Vimeo%5CController%5CClipController.main&default_to_hd=1&outro=nothing&portrait=0&share=1&title=0&watch_trailer=0`
    return request(api, 'json')
}
