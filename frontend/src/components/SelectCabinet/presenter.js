import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const SelectCabinet = (props, context) => {
  return (
    <div className={styles.selectCabinetContainer}>
      <div clasName={styles.title}>사물함을 이용하시겠습니까?</div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>네</div>
        <div className={styles.button}>아니오</div>
      </div>

      {props.use_cabinet ? <RenderSelectCabinet /> : ''}
    </div>
  );
};

const RenderSelectCabinet = (props, context) => {
  return 'render cabinet';
};

export default SelectCabinet;
