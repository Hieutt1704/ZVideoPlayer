import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform, TextInput } from 'react-native'

import { clear, search, home } from '../IconManager'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
        this._onSearch = this._onSearch.bind(this)
    }

    _onSearch() {
        const { keyword } = this.state
        if (keyword)
            this.props.onSearch(keyword)
        else
            this.props.goHome()
    }

    render() {
        const { keyword } = this.state
        const { goHome } = this.props
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.viewButton}
                    activeOpacity={0.7}
                    onPress={() => goHome()}
                >
                    {home(30)}
                </TouchableOpacity>

                <View style={styles.viewSearch}>

                    <TextInput
                        autoCapitalize='none'
                        ref={ref => this.TextInput = ref}
                        style={styles.search}
                        value={keyword}
                        // autoFocus={true}
                        placeholderTextColor='#DBDBDB'
                        onChangeText={text => this.setState({ keyword: text })}
                        returnKeyType={'go'}
                        placeholder={'search'}
                        onSubmitEditing={this._onSearch}
                        keyboardType={'default'}
                        autoCorrect={false}
                        selectionColor='white'
                        underlineColorAndroid={'transparent'}
                    />

                    {keyword ?
                        <TouchableOpacity
                            style={[styles.viewButton]}
                            activeOpacity={0.7}
                            onPress={() => this.setState({ keyword: '' })}
                        >
                            {clear(18)}
                        </TouchableOpacity>
                        : null
                    }

                </View>

                <TouchableOpacity
                    style={styles.viewButton}
                    activeOpacity={0.7}
                    onPress={this._onSearch}
                >
                    {search(25)}
                </TouchableOpacity>

            </View>
        )
    }
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        backgroundColor: '#009ef8',
        width: Dimensions.get('window').width,
        height: 40,
        paddingHorizontal: Platform.OS === 'ios' ? 0 : 7,
        alignItems: 'center',
        paddingBottom: 5
    },
    viewButton: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewSearch: {
        flex: 1,
        flexDirection: 'row',
        // marginLeft: 10,
        height: Platform.OS === 'ios' ? 30 : 40,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#DBDBDB',
    },
    search: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    clear: {
        height: 12,
        width: 12
    },
    icon: {
        height: 20,
        width: 20
    }
})
