import React from 'react'
import { View } from 'react-native'
import ZVideo from './src/Component/Video'

class App extends React.Component {
    constructor(props) {
        super(props)
        console.disableYellowBox = true
    }

    render() {
        return (
            <ZVideo />
        )
    }
}

export default App