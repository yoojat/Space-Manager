import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import SelectBranch from 'components/SelectBranch';
import Ionicon from 'react-ionicons';
import {Link} from 'react-router-dom';

const RegistMembership = props => {
  if (props.loading) {
    return <Loading />;
  } else {
    return <RenderRegistMembership user={props.user} />;
  }
};

const RenderRegistMembership = (props, context) => {
  const {user} = props;
  return (
    <main className={styles.container}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={require('images/logo.png')}
            className={styles.logo}
            alt={context.t('Logo')}
          />
        </Link>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.profile}>
          {user.profile_image ? (
            user.profile_image
          ) : (
            <Ionicon icon="md-person" fontSize="85px" />
          )}

          <div className={styles.name}>
            <span className={styles.username}>{user.username}</span> /{' '}
            <span className={styles.userid}>
              {user.name}
              {context.t('님')}
            </span>
          </div>
        </div>

        <SelectBranch />

        {/* <div>
          <span>{context.t('등록하실 지점을 선택해 주세요.')}</span>
          <br />
          <span>{context.t('등록한 지점 외 다른 지점도 이용가능합니다.')}</span>
          <br />
          <span>
            {context.t(
              '(단, 좌석에 여유가 없을 때는 지정하신 지점만 이용 가능합니다.)'
            )}
          </span>
        </div> */}
      </div>
    </main>
  );
};

export default RegistMembership;

RegistMembership.propTypes = {};
RenderRegistMembership.contextTypes = {
  t: PropTypes.func.isRequired,
};
