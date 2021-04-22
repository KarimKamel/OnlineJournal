import { usePromiseTracker } from "react-promise-tracker";
const LoadingComponent = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && <h1>Hey some async call in progress ! </h1>;
};
export default LoadingComponent;
