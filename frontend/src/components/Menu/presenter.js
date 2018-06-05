import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Menu = (props, context) => {
  const {
    handleBackClick,
    is_staff,
    is_superuser,
    onLogoutClick,
    first,
    show,
    closeMenu
  } = props;

  const containerClass = classNames({
    [styles.container]: true,
    [styles.containerShow]: show,
    [styles.containerNoshow]: !show,
    [styles.containerFirst]: first
  });

  const columnClass = classNames({
    [styles.column]: true,
    [styles.columnShow]: show,
    [styles.columnNoshow]: !show
  });

  return (
    <div className={containerClass} onClick={handleBackClick} data_back={1}>
      <div className={columnClass}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.menuLogo}>
                <Link to="/" onClick={closeMenu}>
                  <img
                    src={require("images/4.png")}
                    className={styles.logo}
                    alt={context.t("Logo")}
                  />
                  <div>BlueDot Lounge</div>
                </Link>
              </div>
            </li>

            <li className={styles.listItem}>
              <Link to="/allocation" onClick={closeMenu}>
                {context.t("배정/반납")}
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link to={`/myinfo`} onClick={closeMenu}>
                {context.t("나의 정보")}
              </Link>
            </li>
            <li className={styles.listItem}>
              <div className={styles.listContent} onClick={onLogoutClick}>
                {context.t("로그아웃")}
              </div>
            </li>
            {is_staff ? (
              <li className={styles.listItem}>
                <div className={styles.adminMenu}>스탭 메뉴</div>
              </li>
            ) : (
              ""
            )}
            {is_superuser ? (
              <li className={styles.listItem}>
                <div className={styles.adminMenu}>슈퍼유저 메뉴</div>
              </li>
            ) : (
              ""
            )}
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
  t: PropTypes.func.isRequired
};

Menu.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
  is_staff: PropTypes.bool.isRequired,
  is_superuser: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  first: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired
};
// contextTypes에서 t함수를 받아올것이라고 명시해야 t함수를 사용가능함
// t함수는 번역함수임

export default Menu;
