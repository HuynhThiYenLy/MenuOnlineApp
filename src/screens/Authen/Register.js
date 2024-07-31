import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DangKyTaiKhoan } from '../../redux/reducer/registerSlice';

const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('1');
    const [phone, setPhone] = useState('1');
    const [password, setPassword] = useState('1');
    const [rePassword, setRePassword] = useState('1');

    const btnLogin = () => {
        navigation.navigate('Login');
    }

    const handleRegister = () => {
        // Kiểm tra các trường dữ liệu
        if (!fullName || !phone || !password || !rePassword) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Kiểm tra mật khẩu và nhập lại mật khẩu có trùng khớp không
        if (password !== rePassword) {
            Alert.alert('Thông báo', 'Mật khẩu nhập lại không khớp');
            return;
        }

        dispatch(DangKyTaiKhoan({ fullName, phone, password }))
            .then(response => {
                console.log('Đăng ký thành công:', response.payload);
                Alert.alert('Thông báo', 'Đăng ký tài khoản thành công');
                navigation.navigate('Login')
            })
            .catch(error => {
                console.error('Đăng ký tài khoản lỗi:', error.message);
                Alert.alert('Thông báo', 'Đăng ký tài khoản thất bại');
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
                    <Text style={styles.title}>Register</Text>

                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setFullName(text)}
                        placeholder="Full Name"
                        placeholderTextColor={'gray'}
                        value={fullName}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setPhone(text)}
                        placeholder="Phone Number"
                        placeholderTextColor={'gray'}
                        value={phone}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        value={password}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setRePassword(text)}
                        placeholder="Re-Password"
                        placeholderTextColor={'gray'}
                        value={rePassword}
                        secureTextEntry={true}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
                            <Text style={styles.txtRegister}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancel} onPress={btnLogin}>
                            <Text style={styles.txtCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.haveAccountContainer}>
                        <Text style={styles.txtHaveAccount}>Do you have an account? </Text>
                        <TouchableOpacity style={styles.btnLogin} onPress={btnLogin}>
                            <Text style={styles.txtLogin}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Register;

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
        resizeMode: 'cover',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnRegister: {
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
    txtRegister: {
        color: 'white',
        fontWeight: 'bold',
    },
    txtCancel: {
        color: 'white',
        fontWeight: 'bold',
    },
    haveAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    txtHaveAccount: {
        color: 'black',
    },
    btnLogin: {
        marginLeft: 5,
    },
    txtLogin: {
        color: '#1E90FF',
        fontWeight: 'bold',
    }
});
