import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GetUserByID } from '../../redux/reducer/userSlice';
import { useUser } from '../../redux/userContext';

const User = ({ route }) => {
  const { userID: routeUserID } = route.params || {};
  const { userID: contextUserID } = useUser(); // Lấy userID từ UserContext
  const userID = routeUserID || contextUserID; // Sử dụng userID từ route params hoặc context

  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const chiTietUserData = useSelector(state => state.chiTietUser.chiTietUserData);
  const chiTietUserStatus = useSelector(state => state.chiTietUser.chiTietUserStatus);

  useEffect(() => {
    if (userID) {
      dispatch(GetUserByID(userID));
    }
  }, [dispatch, userID]);

  if (chiTietUserStatus === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (chiTietUserStatus === 'failed') {
    return (
      <View style={styles.container}>
        <Text style={styles.txtError}>Không thể lấy thông tin người dùng</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{chiTietUserData.fullName}</Text>
      <Text style={styles.txtInfo}>Số điện thoại: {chiTietUserData.phone}</Text>

      <View>
        <TouchableOpacity>
          <Text style={styles.txtProfile}>Thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  txtInfo: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  txtProfile: {
    fontSize: 18,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
  },
  txtError: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
