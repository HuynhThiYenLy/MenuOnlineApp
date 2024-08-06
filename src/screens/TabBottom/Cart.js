import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GetCart } from '../../redux/reducer/cartSlice';
import { useUser } from '../../redux/userContext';

const Cart = ({ route, navigation }) => {
  const { userID: routeUserID } = route.params || {};
  const { userID: contextUserID } = useUser(); // Lấy userID từ UserContext
  const userID = routeUserID || contextUserID; // Sử dụng userID từ route params hoặc context

  const dispatch = useDispatch();
  // Lấy dữ liệu từ Redux store
  const cartData = useSelector(state => state.cart.cartData);
  const cartStatus = useSelector(state => state.cart.cartStatus);

  useEffect(() => {
    if (userID) {
      dispatch(GetCart(userID));
    }
  }, [dispatch, userID]);

  console.log("ID", userID)

  if (cartStatus === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (cartStatus === 'failed') {
    return (
      <View style={styles.container}>
        <Text style={styles.txtError}>Không thể lấy giỏ hàng</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    Array.isArray(item.items) && item.items.length > 0 ? (
      item.items.map((product, index) => (
        <View key={index} style={styles.productDetails}>
          {/* Hiện img */}
          {product.productID?.img ? (
            <Image
              source={{ uri: product.productID.img }}
              style={styles.productImage}
            />
          ) : (
            <Text>No Image</Text>
          )}

          {/* Hiện name, giá, sl */}
          <View style={styles.pro_veti}>
            <Text style={styles.productName}>{product.productID?.name ? product.productID.name : 'N/A'}</Text>
            <Text style={styles.productPrice}>{product.productID?.price ? product.productID.price.toString() : '0'}</Text>
          </View>
          <Text style={styles.productQuantity}>x{product.quantity ? product.quantity.toString() : '0'}</Text>
        </View>
      ))
    ) : (
      <Text>Không có sản phẩm nào trong giỏ hàng.</Text>
    )
  );

  return (
    <View style={styles.container}>
      {/* Phần header */}
      <View style={styles.rowTitle}>
        <Image source={require('../../img/avatar.png')} style={styles.avatar} />
        <Text style={styles.txtTitle}>Giỏ hàng</Text>
        <Text style={styles.txtTitle}></Text>
      </View>

      <FlatList
        data={cartData}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />

      <Text style={styles.txtTongTien}>Tổng tiền: 0đ</Text>
      <TouchableOpacity
        style={styles.muaHang}>
        <Text style={styles.txtTotal}>Mua hàng</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  containerFlatList: {
    flex: 1,
  },
  txtTongTien: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 250,
    marginBottom: 16,
  },
  txtTotal: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  muaHang: {
    backgroundColor: '#00AA00',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 16,
  },
  tiepTuc: {
    backgroundColor: '#00AA00',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  thanhToan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  containerFlatList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  txtTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
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
  avatar: {
    width: 25,
    height: 25,
  },
  productDetails: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productQuantity: {
    fontSize: 16,
    color: '#666',
    marginTop: 80,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    marginRight: 15,
  },
  pro_veti: {
    marginBottom: 15,
    width: 225,
  }
});

export default Cart;
