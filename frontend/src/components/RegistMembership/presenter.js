import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import SelectBranch from 'components/SelectBranch';
import SelectWhen from 'components/SelectWhen';
import SelectDays from 'components/SelectDays';
import Ionicon from 'react-ionicons';
// import SelectCabinet from 'components/SelectCabinet';
import {Link} from 'react-router-dom';

const RegistMembership = props => {
  if (props.loading) {
    return <Loading />;
  } else {
    return <RenderRegistMembership {...props} />;
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

        <SelectBranch branchSel={props.sel_branch} />
        {props.sel_branch ? <SelectWhen /> : ''}
        {props.start_date ? <SelectDays /> : ''}
        {props.cost_type ? '사물함 선택' : ''}
      </div>
    </main>
  );
};

export default RegistMembership;

RegistMembership.propTypes = {
  sel_branch: PropTypes.string,
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    is_staff: PropTypes.bool,
    is_superuser: PropTypes.bool,
    name: PropTypes.string,
    profile_image: PropTypes.string,
    username: PropTypes.string,
    memberships: PropTypes.arrayOf(
      PropTypes.shape({
        branch: PropTypes.shape({
          branch_name: PropTypes.string.isRequired,
          branch_num: PropTypes.number.isRequired,
          id: PropTypes.number.isRequired,
        }).isRequired,
        end_date: PropTypes.string.isRequired,
        is_usable: PropTypes.bool.isRequired,
        start_date: PropTypes.string.isRequired,
        user: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};
RenderRegistMembership.contextTypes = {
  t: PropTypes.func.isRequired,
};
