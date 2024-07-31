import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { DangNhapTaiKhoan } from '../../redux/reducer/loginSlice';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('0354757122');
    const [password, setPassword] = useState('Lyllie1410');

    const btnRegister = () => {
        navigation.navigate('Register');
    }

    const handleLogin = () => {
        if (!phone || !password) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        dispatch(DangNhapTaiKhoan({ phone, password }))
            .then(response => {
                console.log('Đăng nhập thành công:', response.payload);
                Alert.alert('Thông báo', 'Đăng nhập tài khoản thành công');
                // Lưu userID vào AsyncStorage hoặc Redux state
                const userID = response.payload.user._id;
                // Gửi userID đến màn hình chính (BottomTab)
                navigation.navigate('BottomTab', { screen: 'Cart', params: { userID } });
                console.log("truyền đi: ", userID)
            })
            .catch(error => {
                console.error('Đăng nhập tài khoản lỗi:', error.message);
                Alert.alert('Thông báo', 'Đăng nhập tài khoản thất bại');
            });
    }

    return (
        <ImageBackground
            source={require('../../img/background.jpg')}
            style={styles.backgroundImage}
            blurRadius={5}
        >
            <View style={styles.container}>
                <View style={styles.background}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(phoneInput) => setPhone(phoneInput)}
                        placeholder="Phone Number"
                        placeholderTextColor={'gray'}
                        value={phone}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(passwordInput) => setPassword(passwordInput)}
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        value={password}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                            <Text style={styles.txtLogin}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancel}>
                            <Text style={styles.txtCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dontHaveAccountContainer}>
                        <Text style={styles.txtDontHaveAccount}>Don't you have an account? </Text>
                        <TouchableOpacity style={styles.btnRegister} onPress={btnRegister}>
                            <Text style={styles.txtRegister}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Login;

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        color: 'black',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    background: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Hoặc 'stretch' nếu bạn muốn hình nền căng đầy màn hình
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnLogin: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center'
    },
    btnCancel: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center'
    },
    txtLogin: {
        color: 'white',
        fontWeight: 'bold',
    },
    txtCancel: {
        color: 'white',
        fontWeight: 'bold',
    },
    dontHaveAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    txtDontHaveAccount: {
        color: 'black',
    },
    btnRegister: {
        marginLeft: 5,
    },
    txtRegister: {
        color: '#1E90FF',
        fontWeight: 'bold',
    }
});
