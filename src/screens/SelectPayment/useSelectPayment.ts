import NavigationActionService from '../../navigation/navigation';

const useSelectPayment = () => {
  const goBack = () => {
    NavigationActionService.pop();
  };
  return {goBack};
};

export default useSelectPayment;
