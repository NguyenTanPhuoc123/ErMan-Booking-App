import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../../../navigation/navigation';
import {
  BRANCH_SCREEN,
  CREATE_BOOKING_SCREEN,
} from '../../../../constants/screen_key';
import {Branch} from '../../../../modules/branch/model';
import {Service} from '../../../../modules/service/model';

type SelectBranchProps = {
  branch?: Branch;
  listService?: Service[];
};
const SelectBranch = (props: SelectBranchProps) => {
  const {branch, listService} = props;
  const goToBranch = () => {
    NavigationActionService.navigate(BRANCH_SCREEN, {
      screen: CREATE_BOOKING_SCREEN,
      services: listService,
    });
  };

  const getBranch = () => {
    if (branch) {
      return branch.branchName;
    }
    return 'Xem tất cả chi nhánh';
  };

  return (
    <View style={{height: 240, marginVertical: 20}}>
      <Text style={styles.label}>2. Chọn chi nhánh</Text>
      <TouchableOpacity style={styles.container} onPress={goToBranch}>
        <Icon name="home" size={16} color="#d4d3d6" />
        <Text style={styles.text}>{getBranch()}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{branch?.address}</Text>
    </View>
  );
};

export default SelectBranch;
