import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SearchProduct } from '../../redux/reducer/searchSlice';

const Search = () => {
    const dispatch = useDispatch();
    const { searchData, searchStatus, searchError } = useSelector(state => state.search);
    const [txtSearch, setTxtSearch] = useState('');

    const handleSearch = () => {
        dispatch(SearchProduct(txtSearch));
    };

    return (
        <View style={styles.container}>
            {/* Phần header */}
            <View style={styles.rowTitle}>
                <Image source={require('../../img/avatar.png')} style={styles.avatar} />
                <Text style={styles.txtTitle}>Tìm kiếm</Text>
                <Text style={styles.txtTitle}>     </Text>
            </View>
            
            <View style={styles.rowSearch}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setTxtSearch(text)}
                    placeholder="Search"
                    placeholderTextColor={'gray'}
                    value={txtSearch}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {searchStatus === 'loading' ? (
                <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#7B68EE" />
            ) : searchStatus === 'failed' ? (
                <Text style={styles.errorText}>Lỗi: {searchError}</Text>
            ) : (
                <FlatList
                    style={styles.productList}
                    data={searchData}
                            keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productItem}>
                            <Image source={{ uri: item.img }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    rowTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 25,
        height: 25,
    },
    searchIcon: {
        width: 25,
        height: 25,
    },
    txtTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    rowSearch: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        height: 42,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    searchButton: {
        backgroundColor: '#7B68EE',
        padding: 9,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: -1,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    productList: {
        flex: 1,
        marginTop: 20,
    },
    productItem: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        paddingVertical: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    }
});
