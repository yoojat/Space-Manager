import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const Menu = (props, context) => {
  const containerClass = classNames({
    [styles.container]: true,
    [styles.containerShow]: props.show,
    [styles.containerNoshow]: !props.show,
    [styles.containerFirst]: props.first,
  });

  const columnClass = classNames({
    [styles.column]: true,
    [styles.columnShow]: props.show,
    [styles.columnNoshow]: !props.show,
  });

  return (
    <div
      className={containerClass}
      onClick={props.handleBackClick}
      data_back={1}
    >
      <div className={columnClass}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.menuLogo}>
                <Link to="/" onClick={props.closeMenu}>
                  <img
                    src={require('images/4.png')}
                    className={styles.logo}
                    alt={context.t('Logo')}
                  />
                  <div>BlueDot Lounge</div>
                </Link>
              </div>
            </li>
            <li className={styles.listItem}>
              <Link to="/allocation" onClick={props.closeMenu}>
                {context.t('배정/반납')}
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link to="/membership" onClick={props.closeMenu}>
                {context.t('멤버쉽')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

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
