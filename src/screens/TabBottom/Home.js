import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategoryChill } from '../../redux/reducer/categoryChillSlice';
import { GetProductAll } from '../../redux/reducer/productSlice';
import { GetProductByCate } from '../../redux/reducer/productByCateSlice';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categoryChillData, categoryChillStatus } = useSelector(state => state.categoryChill);
  const { productData, productStatus } = useSelector(state => state.product);
  const { productByCateData, productByCateStatus } = useSelector(state => state.productByCate);
  const [selectedCategory, setSelectedCategory] = useState(null); // Khởi tạo là null thay vì 'all'

  // Lấy danh mục 'chill' và tất cả sản phẩm khi màn hình Home được render
  useEffect(() => {
    dispatch(GetCategoryChill());
    dispatch(GetProductAll());
  }, [dispatch]);

  // Chuyển hướng đến màn hình Tìm kiếm
  const btnSearch = () => {
    navigation.navigate('Search');
  };

  // Xử lý khi người dùng chọn một danh mục
  const handleCategoryPress = (categoryId) => {
    if (categoryId === selectedCategory) {
      return; // Nếu đã chọn danh mục đang được chọn thì không làm gì
    }

    setSelectedCategory(categoryId);
    if (categoryId === null) {
      dispatch(GetProductAll()); // Nếu chọn null (không có danh mục) thì lấy tất cả sản phẩm
    } else {
      dispatch(GetProductByCate(categoryId)); // Lấy sản phẩm theo danh mục khi chọn một danh mục khác
    }
  };

  // Render từng mục danh mục 'chill'
  const renderCategoryChillItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.categoryChillItem, selectedCategory === item._id ? styles.selectedCategory : null]}
      onPress={() => handleCategoryPress(item._id)}
    >
      <Text style={styles.nameCate}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render từng sản phẩm
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.row}>
        <Image source={{ uri: item.img }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.btnAddCart}>
          <Image
            source={require('../../img/add.webp')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Phần header */}
      <View style={styles.rowTitle}>
        <Image source={require('../../img/avatar.png')} style={styles.avatar} />
        <Text style={styles.txtTitle}>Home</Text>
        <TouchableOpacity onPress={btnSearch}>
          <Image source={require('../../img/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Danh sách danh mục 'chill' */}
      <View style={styles.listCategoryChill}>
        {categoryChillStatus === 'loading' ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : categoryChillStatus === 'failed' ? (
          <Text>Đã xảy ra lỗi khi tải danh mục.</Text>
        ) : (
          <FlatList
            horizontal
            data={categoryChillData}
            renderItem={renderCategoryChillItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.productList}>
        {productStatus === 'loading' || productByCateStatus === 'loading' ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : productStatus === 'failed' || productByCateStatus === 'failed' ? (
          <Text>Đã xảy ra lỗi khi tải danh sách sản phẩm.</Text>
        ) : (
          <FlatList
            data={selectedCategory === null ? productData : productByCateData}
            renderItem={renderProductItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  productInfo: {
    flexDirection: "column",
  },
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingHorizontal: 16,
    paddingTop: 16,
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
  listCategoryChill: {
    height: 45,
  },
  categoryChillItem: {
    flexDirection: 'row',
    height: 45,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedCategory: {
    backgroundColor: '#ff7043',
  },
  nameCate: {
    fontSize: 15,
    color: '#555',
  },
  productList: {
    flex: 1,
    marginTop: 20,
  },
  productItem: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
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
  btnAddCart: {
    backgroundColor: '#ff7043',
    padding: 8,
    borderRadius: 5,
  },
  btnAddImage: {
    width: 25,
    height: 25,
  },
});
