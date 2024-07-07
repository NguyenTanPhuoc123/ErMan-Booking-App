import {View, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import { User } from '../../../../../modules/user/model';
import UserItem from '../UserItem';
import ListItemEmpty from '../../../../../component/ListItemEmpty';
import { LIST_USER_EMPTY } from '../../../../../constants/icons';

type TabsProps = {
  id:string,
  name:"Customer" | "Staff" | "Admin"
  data:User[]
  pullRefresh:()=>void,
  refreshing:boolean
};

const Tabs = (props: TabsProps) => {
  const {name,data, pullRefresh, refreshing} = props;
  return (
      <FlatList
        data={data.filter(user=>user.typeAccount===name)}
        keyExtractor={item=>item.id.toString()}
        renderItem={({item})=> <UserItem key={item.id} {...item}/>}
        ListEmptyComponent={<ListItemEmpty content='Không có người dùng' image={LIST_USER_EMPTY} />}
        refreshControl={<RefreshControl onRefresh={pullRefresh} refreshing={refreshing} />}
      />
  );
};

export default Tabs;
