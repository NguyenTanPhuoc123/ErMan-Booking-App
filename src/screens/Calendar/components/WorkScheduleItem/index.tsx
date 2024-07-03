import { View, Text, } from 'react-native'
import React from 'react'
import styles from './style'
import globalStyle from '../../../../constants/styles'

const WorkScheduleItem = () => {
  return (
    <View>
    <View style={styles.container}>
        <View style={[styles.dayInWeek,globalStyle.bgTransparent]}>
            <Text style={styles.day}>Thứ 2 {'\n'} 10</Text>
        </View>
      <View style={styles.containerItem}>
      <View style={styles.line}></View>
       <View style={styles.containerContent}>
        <Text style={[globalStyle.fontText,styles.text]}>08:00 {'->'} 20:00 </Text>
        <Text style={[globalStyle.fontText,styles.text]}>Nguyễn Thanh Sang</Text>
       </View>
      </View>
     
    </View>
    
    </View>
  )
}

export default WorkScheduleItem