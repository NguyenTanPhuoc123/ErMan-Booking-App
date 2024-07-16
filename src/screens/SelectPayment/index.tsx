import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import Demo from './components';


export default class SelectPaymentScreen extends Component {

  handleSuccess = (token: string) => {
    // Send a token to your payment gateway
    Alert.alert('Success', `token: ${token}`);
  };

  handleError = (error: any) =>
    Alert.alert('Error', `${error.code}\n${error.message}`);

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to react-native-google-pay!</Text>
      //   <TouchableOpacity
      //     style={styles.button}
      //     onPress={() => this.payWithGooglePay(gatewayRequestData)}>
      //     <Text style={styles.buttonText}>PAYMENT_GATEWAY</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={[styles.button, styles.direct]}
      //     onPress={() => this.payWithGooglePay(directRequestData)}>
      //     <Text style={styles.buttonText}>DIRECT</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={[styles.button, styles.stripe]}
      //     onPress={() => this.payWithGooglePay(stripeRequestData)}>
      //     <Text style={styles.buttonText}>Stripe</Text>
      //   </TouchableOpacity>
      // </View>
      <Demo/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginVertical: 8,
  },
  direct: {
    backgroundColor: '#db7d35',
  },
  stripe: {
    backgroundColor: '#556cd6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
