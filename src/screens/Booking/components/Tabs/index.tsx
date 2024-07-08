import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import BookingItem from '../BookingItem';
import {Booking} from '../../../../modules/booking/model';
import ListItemEmpty from '../../../../component/ListItemEmpty';
import {LIST_CALENDAR_EMPTY} from '../../../../constants/icons';
import globalStyle from '../../../../constants/styles';

type TabsProps = {
  data: Booking[];
  name: string;
  refresh: boolean;
  pullRefresh: () => void;
};

const Tabs = (props: TabsProps) => {
  const {data, name, refresh, pullRefresh} = props;

  const ref = createRef<FlatList>();
  return (
    <View style={globalStyle.bgTransparent}>
      <FlatList<Booking>
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
        }
        data={data.filter(item => item.status === name)}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <BookingItem key={item.id} booking={item} />}
        ListEmptyComponent={
          <ListItemEmpty
            image={LIST_CALENDAR_EMPTY}
            content="Không có lịch đặt"
          />
        }
      />
    </View>
  );
};

export default Tabs;
