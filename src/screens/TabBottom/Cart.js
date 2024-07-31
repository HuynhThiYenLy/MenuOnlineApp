import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GetCart } from '../../redux/reducer/cartSlice'; 

const CartScreen = ({ route }) => {
  const { userID } = route.params;
  const dispatch = useDispatch();
  const { cartData, cartStatus } = useSelector(state => state.cart);

  useEffect(() => {
    if (userID) {
      dispatch(GetCart(userID));
    }
  }, [dispatch, userID]);

  if (cartStatus === 'loading') {
    
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>UserID: {item.userID}</Text>
      {item.item.map((product, index) => (
        <View key={index} style={styles.productDetails}>
          <Text style={styles.productID}>ProductID: {product.productID}</Text>
          <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        keyExtractor={(item, index) => item._id.$oid + index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  productDetails: {
    marginLeft: 16,
    marginTop: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productID: {
    fontSize: 16,
    color: '#666',
  },
  productQuantity: {
    fontSize: 16,
    color: '#666',
  },
});

export default CartScreen;
