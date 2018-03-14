import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const LoungeFeed = (props, context) => {
  return (
    <div className={styles.loungeFeed}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>지금 계신 라운지는 ~입니다.</span>
      </header>
      <img src={require('images/test2.jpg')} alt={context.t('도면')} />
    </div>
  );
};

LoungeFeed.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default LoungeFeed;
