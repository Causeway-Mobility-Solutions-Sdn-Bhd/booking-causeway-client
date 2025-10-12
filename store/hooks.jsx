import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useLoggedUser = () => {
  return useSelector((state) => state.auth.loggedUser);
};
