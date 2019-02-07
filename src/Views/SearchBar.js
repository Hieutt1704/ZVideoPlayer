import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform, TextInput } from 'react-native'

import { clear, search, home } from '../IconManager'
import { scale } from '../Utils';

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
            <View style={styles.container} >

                <TouchableOpacity
                    style={styles.viewButton}
                    activeOpacity={0.7}
                    onPress={() => goHome()}
                >
                    {home(scale(30))}
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
                        placeholder={'Search videos, people, and more...'}
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
                            {clear(scale(18))}
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
        height: scale(40),
        paddingHorizontal: Platform.OS === 'ios' ? 0 : scale(7),
        alignItems: 'center',
        paddingBottom: scale(5)
    },
    viewButton: {
        width: scale(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewSearch: {
        flex: 1,
        flexDirection: 'row',
        // marginLeft: 10,
        height: Platform.OS === 'ios' ? scale(30) : scale(40),
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#DBDBDB',
    },
    search: {
        flex: 1,
        color: 'white',
        fontSize: scale(14),
    },
    clear: {
        height: scale(12),
        width: scale(12)
    },
    icon: {
        height: scale(20),
        width: scale(20)
    }
})
