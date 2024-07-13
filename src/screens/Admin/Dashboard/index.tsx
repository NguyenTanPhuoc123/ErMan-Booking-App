import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import globalStyle, {WITDH} from '../../../constants/styles';
import HomeScreen from '../../Home';
import useDasboard from './useDashboard';
import {User} from '../../../modules/user/model';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../../constants/icons';
const DashboardScreen = () => {
  const {listCustomer,listStaff,lineCharData} = useDasboard();

  const renderLineChar = () => {
    return (
      <View>
        <Text
          style={[globalStyle.fontText, globalStyle.textSize20, styles.text]}>
          Thống kê theo tuần
        </Text>
        <View style={styles.container}>
          <LineChart
            data={lineCharData}
            width={WITDH}
            height={300}
            yAxisSuffix=""
            yAxisInterval={1}
            verticalLabelRotation={30}
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
        <Text
          style={[
            globalStyle.fontText,
            globalStyle.textSize20,
            styles.textinfo,
          ]}>
          {value}
        </Text>
      </View>
    </View>
  );

  const renderButton = () => {
    return (
      <View>
        <View style={styles.containerView}>
          {renderItemButton('Tổng thu nhập',100)}
          {renderItemButton('Tổng nhân viên', listStaff.length)}
        </View>
        <View style={styles.containerView}>
          {renderItemButton('Tổng lịch đặt', 100)}
          {renderItemButton('Tổng khách hàng',listCustomer.length )}
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
            Top 5 nhân viên xuất sắc nhất:{' '}
          </Text>
        </View>
        <View>
          {listStaff.slice(0,5).map(item => (
            <View key={item.id} style={styles.container1}>
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
      <ScrollView>
        {renderLineChar()}
        {renderButton()}
        {renderTopStaff()}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
