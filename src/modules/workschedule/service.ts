import client from '../../api';
import {GetListWorkSchedule} from '../../api/workschedule/queries';
import {WorkSchedule} from './model';

export const getListWorkSchedule = async (idStaff: number) => {
  try {
    const res = await client.query({
      query: GetListWorkSchedule,
      variables: {idStaff},
    });
    const listData = res.data.WorkSchedule_connection.edges;
    
    const listWorkSchedule: WorkSchedule[] = listData.map((item: any) => {
      const workScheduleId = JSON.parse(atob(item.node.id))[3];
      const {id, ...newWorkSchedult} = item.node;
      
      return {id: workScheduleId, ...newWorkSchedult};
    }) as WorkSchedule[];
    return {result: listWorkSchedule};
  } catch (error) {
    console.log('Error get list work schedule: ', error);
  }
};
