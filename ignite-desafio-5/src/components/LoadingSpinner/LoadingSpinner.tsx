import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <>
      <div className={classes.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
