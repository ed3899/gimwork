import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = () => {
    // Perform login logic here
    console.log('Login button clicked');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleSignUp = () => {
    // Perform login logic here
    console.log('Login button clicked');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <Button title="SignUp" onPress={handleSignUp} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
