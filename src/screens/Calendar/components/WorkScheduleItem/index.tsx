import { View, Text, } from 'react-native'
import React from 'react'
import styles from './style'
import globalStyle from '../../../../constants/styles'
import { WorkSchedule } from '../../../../modules/workschedule/model'
import { Staff } from '../../../../modules/user/model'
import { changeDayInWeekToVI, formatStringDate } from '../../../../utils/date'
import moment from 'moment'

type WorkScheduleItemProps = {
  workSchedule:WorkSchedule,
  staff:Staff
}

const WorkScheduleItem = (props:WorkScheduleItemProps) => {
  const {workSchedule,staff} = props;
  const today = moment().format('YYYY-MM-DD');
  const dayInWeek = changeDayInWeekToVI(new Date(formatStringDate(workSchedule.dayWork)));
  const date = moment(formatStringDate(workSchedule.dayWork)).format('DD');
  const checkToday = ()=>{
    return today===formatStringDate(workSchedule.dayWork) ? true : false;
  }
  return (
    <View>
    <View style={styles.container}>
        <View style={[styles.dayInWeek,globalStyle.bgTransparent]}>
            <Text style={styles.day}>{dayInWeek +'\n'+date}</Text>
        </View>
      <View style={styles.containerItem}>
      <View style={checkToday() ? styles.line :styles.lineNotToday}></View>
       <View style={styles.containerContent}>
        <Text style={[globalStyle.fontText,styles.text]}>{workSchedule.timeStart + '->' + workSchedule.timeEnd}</Text>
        <Text style={[globalStyle.fontText,styles.text]}>{staff.firstname +' '+staff.lastname}</Text>
        <Text style={[globalStyle.fontText,styles.text]}>{staff.workPlace.branchName}</Text>
       </View>
      </View>
     
    </View>
    
    </View>
  )
}

export default WorkScheduleItem