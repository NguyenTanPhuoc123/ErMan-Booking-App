import NavigationActionService from '../../../navigation/navigation';

const useAddService = () => {
  const goBack = () => {
    NavigationActionService.pop();
  };

  return {goBack};
};

export default useAddService;
