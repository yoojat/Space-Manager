import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Menu = (props, context) => (
  <div
    className={styles.container}
    onClick={props.handleBackClick}
    data_back={1}
  >
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div className={styles.menuLogo}>
              <img
                src={require('images/4.png')}
                className={styles.logo}
                alt={context.t('Logo')}
              />
              <div>BlueDot Lounge</div>
            </div>
          </li>
          <li className={styles.listItem}>{context.t('배정/반납')}</li>
          <li className={styles.listItem}>{context.t('등록정보')}</li>
        </ul>
      </nav>
    </div>
  </div>
);

// Footer는 stateless component
// context는 어디서든 원하는 function ,property를 부러올 때 사용함

// 스타일 작업은 className부터 작성하구 scss로 작성
// webpack 설정에서 css-loader에서 camelCase: 'dashes' 라고 설정해줌으로써 javscript에서는 camelCase styles.scss파일에서는 dash로 작업이 가능

Menu.contextTypes = {
  t: PropTypes.func.isRequired,
};

Menu.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};
// contextTypes에서 t함수를 받아올것이라고 명시해야 t함수를 사용가능함
// t함수는 번역함수임

export default Menu;
