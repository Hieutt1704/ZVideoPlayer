import React from 'react'
import { View, FlatList } from 'react-native'

import { filterHtml } from './src/Utils'
import ZVideo from './src/Component/Video'
import ItemMV from './src/Component/ItemMV'
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
            end_page: false
        }
    }

    componentDidMount() {
        fetch(baseUrl).then((resp) => {
            // console.log(resp)
            if (resp.ok) return resp.text()
            return false
        }).then((text) => {
            // console.log('????')
            const list = filterHtml(startUrlItem, endUrlItem, text).map(e => {
                // console.log(e)
                const href = filterHtml(startUrlHref, endUrlHref, e)[0]
                const title = filterHtml(startUrlTitle, endUrlTitle, e)[0]
                const image = filterHtml(startUrlImage, endUrlImage, e)[0]
                const total_time = filterHtml(startUrlTime, endUrlTime, e)[0]
                const total_listen = filterHtml(startUrlListen, endUrlListen, e)[0]
                return { title, href, total_time, total_listen, image }
            })
            // console.log(list)
            this.setState({ videos: list })
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <ZVideo />

                <FlatList
                    data={this.state.videos}
                    numColumns={2}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={({ item, index }) =>
                        <ItemMV
                            item={item}
                            index={index}
                        />
                    }
                />

            </View>
        )
    }
}

export default App