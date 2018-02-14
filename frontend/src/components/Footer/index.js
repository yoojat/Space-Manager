import React from 'react';
import styles from './styles.scss';

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>소개</li>
          <li className={styles.listItem}>고객지원</li>
          <li className={styles.listItem}>블로그</li>
          <li className={styles.listItem}> 약관</li>
          <li className={styles.listItem}>개인정보처리방침</li>
        </ul>
      </nav>
    </div>
    <div className={styles.column}>
      <span className={styles.copyright}>© 2018 creplay</span>
    </div>
  </footer>
);

export default Footer;
