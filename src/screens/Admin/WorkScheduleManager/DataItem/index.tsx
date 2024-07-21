import { View, Text } from 'react-native'
import React from 'react'
import { Booking } from '../../../../modules/booking/model';
import styles from './style';

type DataItemProps = {
    time:string;
    content:string;
}

const DataItem = (props:DataItemProps) => {
    const {time,content} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.time} >{time}</Text>
      <View style={styles.bookingContainer}>
      <Text style={styles.textBooking} >{content}</Text>
      </View>
    </View>
  )
}

export default DataItem