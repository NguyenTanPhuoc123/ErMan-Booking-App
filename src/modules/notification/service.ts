import messaging from '@react-native-firebase/messaging';
import * as NotificationApi from '../../api/notification/queries';
import client from '../../api';
import {Notification} from './model';

export const getListNotifications = async (
  receiverId: number,
  limit: number,
  after?: string,
) => {
  try {
    let res;
    if (after)
      res = await client.query({
        query: NotificationApi.GetListNotifications,
        variables: {
          receiverId: receiverId,
          limit: limit,
          after: after,
        },
      });
    else {
      res = await client.query({
        query: NotificationApi.GetListNotifications,
        variables: {
          receiverId: receiverId,
          limit: limit,
        },
      });
    }

    const endCursor = res.data.Notification_connection.pageInfo.endCursor;
    const hasNextPage = res.data.Notification_connection.pageInfo.hasNextPage;
    const listData = res.data.Notification_connection.edges;
    const listNotification: Array<Notification> = listData.map((data: any) => {
      const {id, User, ...notificationInfo} = data.node;
      const notificationId = JSON.parse(atob(id))[3];
      const {id: idUser, ...newUser} = User;
      const userId = JSON.parse(atob(idUser))[3];
      return {
        id: notificationId,
        receiver: {id: userId, ...newUser},
        ...notificationInfo,
      };
    }) as Array<Notification>;
    return {
      result: {
        notifications: listNotification,
        endCursor: endCursor,
        hasNextPage: hasNextPage,
      },
    };
  } catch (error) {
    console.log('Error get list notifications: ', error);
    return {error};
  }
};

export const updateStatusRead = async (id: number) => {
  try {
    const res = await client.mutate({
      mutation: NotificationApi.UpdateStatusRead,
      variables: {id: id},
    });
    return {result:res};
  } catch (error) {
    console.log('Error update status read:  ', error);
  }
};

export const createNotification = async (
  title: string,
  message: string,
  receiverId: number,
) => {
  try {
    const res = await client.mutate({
      mutation: NotificationApi.CreateNotification,
      variables: {
        title: title,
        message: message,
        receiver: receiverId,
      },
    });
    return {result: res};
  } catch (error) {
    console.log('Error create notification: ', error);
    return {error};
  }
};
