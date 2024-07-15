import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import globalStyle, {WITDH} from '../../../constants/styles';
import useDasboard from './useDashboard';
import {LineChart} from 'react-native-chart-kit';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../../constants/icons';
import {TextInput} from 'react-native-gesture-handler';

const DashboardScreen = () => {
  const {
    numberInput,
    currenYear,
    handlenChangeText,
    loading,
    listBooking,
    listStaff,
    lineCharData,
    users,
  } = useDasboard();

  const renderLoading = () => {
    return (
      <ActivityIndicator
        style={styles.loading}
        size={'large'}
        color={'#d4d3d6'}
      />
    );
  };

  const renderLineChar = () => {
    return (
      <View>
        <View style={styles.view}>
          <Text
            style={[globalStyle.fontText, globalStyle.textSize20, styles.text]}>
            Doanh thu theo quý trong năm
          </Text>

          <TextInput
            style={[
              styles.textinfo1,
              globalStyle.textSize20,
              globalStyle.fontText,
            ]}
            placeholder="...."
            keyboardType="numeric"
            value={currenYear.toString()}
            maxLength={4}
            onChangeText={handlenChangeText}
          />
          <Icon name="calendar-alt" size={24} style={styles.iconcalendar} />
        </View>

        <View style={styles.container}>
          <LineChart
            data={lineCharData}
            width={WITDH}
            height={300}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#08130D',
              backgroundGradientToOpacity: 0.5,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        </View>
      </View>
    );
  };

  const renderItemButton = (label: string, value: number) => (
    <View style={styles.containerButton}>
      <View style={styles.inner}>
        <Text
          style={[
            globalStyle.fontText,
            globalStyle.textSize20,
            styles.textinfo,
          ]}>
          {label}
        </Text>
        <Text style={[globalStyle.textSize20, styles.textvalue]}>{value}</Text>
      </View>
    </View>
  );

  const renderButton = () => {
    return (
      <View>
        <View style={styles.containerView}>
          {renderItemButton('Tổng thu nhập', 100)}
          {renderItemButton('Tổng nhân viên', listStaff.length)}
        </View>
        <View style={styles.containerView}>
          {renderItemButton('Tổng lịch đặt', listBooking.length)}
          {renderItemButton('Tổng khách hàng', users.length)}
        </View>
      </View>
    );
  };

  const renderTopStaff = () => {
    return (
      <View>
        <View style={styles.containerIcon}>
          <Icon
            name="star-half-alt"
            size={25}
            style={[globalStyle.fontText, styles.icon]}
            solid
          />
          <Text
            style={[globalStyle.textSize20, globalStyle.fontText, styles.info]}>
            Top 5 nhân viên được đặt nhiều nhất
          </Text>
        </View>
        <View>
          {listStaff.slice(0, 5).map(item => (
            <View key={item.id} style={styles.containerliststaff}>
              <>
                <FastImage
                  style={styles.avatar}
                  source={
                    !item.avatar ? AVARTAR_DEFAULT_CUSTOMER : {uri: item.avatar}
                  }
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.name}>
                    {item.firstname + ' ' + item.lastname}
                  </Text>
                  <Text style={styles.name}>Email: {item.email}</Text>
                </View>
              </>
            </View>
          ))}
        </View>
      </View>
    );
  };
  return (
    <View style={globalStyle.container}>
      {loading ? (
        renderLoading()
      ) : (
        <ScrollView>
          {renderLineChar()}
          {renderButton()}
          {renderTopStaff()}
        </ScrollView>
      )}
    </View>
  );
};

export default DashboardScreen;
