import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';
import {Link} from 'react-router-dom';

const Membership = props => {
  if (props.loading) {
    return <Loading />;
  } else {
    return <RenderMembership {...props} />;
  }
};

const RenderMembership = (
  {user, setMembership, cabinet: {using_cabinets}},
  context
) => {
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
        <div className={styles.membershipContainer}>
          <div className={styles.membershipTitle}>
            {context.t('이용중인 멤버쉽')}
          </div>
          {user.memberships.map(membership => (
            <MembershipList
              branch={membership.branch}
              start_date={membership.start_date}
              end_date={membership.end_date}
              key={membership.id}
            />
          ))}
        </div>
        <div className={styles.membershipContainer}>
          <div className={styles.membershipTitle}>
            {context.t('이용중인 사물함')}
          </div>

          {using_cabinets.map(using_cabinet => (
            <CabinetList
              branch={using_cabinet.cabinet.cabinet_set.branch}
              cabinet_number={using_cabinet.cabinet.cabinet_number}
              start_date={using_cabinet.start_date}
              end_date={using_cabinet.end_date}
              key={using_cabinet.id}
            />
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/membership" className={styles.button}>
            멤버쉽<br />(재)등록하기
          </Link>
          <div className={styles.button}>
            사물함<br />(추가)등록하기
          </div>
          <Link to="/membership/changePassword" className={styles.button}>
            비밀번호<br />변경하기
          </Link>
        </div>
      </div>
    </main>
  );
};

const MembershipList = ({id, start_date, end_date, branch}) => (
  <div className={styles.listContainer}>
    <div className={styles.branch}>{branch.branch_name}</div>
    <div className={styles.period}>
      {start_date} - {end_date}
    </div>
  </div>
);

const CabinetList = ({branch, cabinet_number, start_date, end_date}) => (
  <div className={styles.listContainer}>
    <div className={styles.branch}>
      {branch.branch_name} {cabinet_number}번 사물함
    </div>
    <div className={styles.period}>
      {start_date} - {end_date}
    </div>
  </div>
);

export default Membership;

Membership.propTypes = {
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
  setMembership: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,

  cabinet: PropTypes.shape({
    using_cabinets: PropTypes.arrayOf(
      PropTypes.shape({
        cabinet: PropTypes.shape({
          cabinet_number: PropTypes.number.isRequired,
          cabinet_set: PropTypes.shape({
            branch: PropTypes.shape({
              branch_name: PropTypes.string.isRequired,
              branch_num: PropTypes.number.isRequired,
              id: PropTypes.number.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
        end_date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        is_clean: PropTypes.bool.isRequired,
        is_usable: PropTypes.bool.isRequired,
        payment: PropTypes.number,
        start_date: PropTypes.string.isRequired,
        user: PropTypes.number.isRequired,
      }).isRequired
    ),
  }),
};
RenderMembership.contextTypes = {
  t: PropTypes.func.isRequired,
};
