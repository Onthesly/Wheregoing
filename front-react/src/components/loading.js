import { usePromiseTracker } from 'react-promise-tracker';

export const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && <h1>로딩중입니다. </h1>;
};
