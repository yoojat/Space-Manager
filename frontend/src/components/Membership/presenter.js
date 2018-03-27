import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';
import {Link} from 'react-router-dom';

const Membership = props => {
  console.log(props);
  if (props.loading) {
    return <Loading />;
  } else {
    return <RenderMembership {...props} />;
  }
};

const RenderMembership = ({user, setMembership}, context) => {
  return (
    <main>
      <div>
        <Link to="/">
          <img
            src={require('images/logo.png')}
            className={styles.logo}
            alt={context.t('Logo')}
          />
        </Link>
      </div>
      <div>
        <div>
          {user.profile_image ? (
            user.profile_image
          ) : (
            <Ionicon icon="md-person" fontSize="32px" />
          )}

          <div>
            <span>{user.username}</span>/<span>{user.name}님</span>
          </div>
        </div>
        <div>
          <div>이용중인 멤버쉽</div>
          {user.memberships.map(membership => (
            <MembershipList
              branch={membership.branch}
              start_date={membership.start_date}
              end_date={membership.end_date}
              key={membership.id}
            />
          ))}
          {/* <div>2018.06.10 21:23:33 - 2018.07.10 21:23:33</div>
          <div>2018.04.10 21:23:33 - 2018.05.10 21:23:33</div> */}
        </div>
        <div>
          <div>이용중인 사물함</div>
          <div>
            <div>화명역점 28번 사물함</div>
            <div>2018.06.10 21:23:33 - 2018.07.10 21:23:33</div>
          </div>
          <div>
            <div>화명역점 28번 사물함</div>
            <div>2018.06.10 21:23:33 - 2018.07.10 21:23:33</div>
          </div>
        </div>

        <div>
          <div>멤버쉽 (재)등록하기</div>
          <div>사물함 (추가)등록하기</div>
          <div>비밀번호 변경하기</div>
        </div>
      </div>
    </main>
  );
};

const MembershipList = ({id, start_date, end_date, branch}) => (
  <div>
    <div>{branch.name}</div>
    <div>
      {start_date} - {end_date}
    </div>
  </div>
);

export default Membership;

RenderMembership.contextTypes = {
  t: PropTypes.func.isRequired,
};
