import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import Ionicon from "react-ionicons";
import { Link } from "react-router-dom";

const MyInfo = ({
  loading,
  my_memberships,
  my_cabinets,
  profile_image,
  username,
  name
}) => {
  if (loading) {
    return <Loading />;
  } else {
    return (
      <RenderMembership
        my_memberships={my_memberships}
        my_cabinets={my_cabinets}
        profile_image={profile_image}
        username={username}
        name={name}
      />
    );
  }
};

MyInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  my_memberships: PropTypes.arrayOf(
    PropTypes.shape({
      branch: PropTypes.shape({
        branch_name: PropTypes.string.isRequired,
        branch_num: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
      }),
      end_date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      is_usaable: PropTypes.bool.isRequired,
      start_date: PropTypes.string.isRequired,
      user: PropTypes.number.isRequired
    })
  ),
  name: PropTypes.string.isRequired,
  profile_image: PropTypes.string,
  username: PropTypes.string.isRequired
};

const RenderMembership = (
  { my_memberships, my_cabinets, profile_image, username, name },
  context
) => {
  return (
    <main className={styles.container}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={require("images/logo.png")}
            className={styles.logo}
            alt={context.t("Logo")}
          />
        </Link>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.profile}>
          {profile_image ? (
            <img
              src={`${profile_image}`}
              className={styles.profileImg}
              alt={context.t("profile")}
            />
          ) : (
            <Ionicon icon="md-person" fontSize="85px" />
          )}

          <div className={styles.name}>
            <span className={styles.username}>{username}</span> /{" "}
            <span className={styles.userid}>
              {name}
              {context.t("님")}
            </span>
          </div>
        </div>
        <div className={styles.membershipContainer}>
          <div className={styles.membershipTitle}>
            {context.t("이용중인 멤버쉽")}
          </div>
          {my_memberships.length
            ? my_memberships.map(my_membership => (
                <MembershipList
                  branch={my_membership.branch}
                  start_date={my_membership.start_date}
                  end_date={my_membership.end_date}
                  key={my_membership.id}
                />
              ))
            : "현재 이용중인 맴버쉽이 없습니다"}
        </div>
        <div className={styles.membershipContainer}>
          <div className={styles.membershipTitle}>
            {context.t("이용중인 사물함")}
          </div>

          {my_cabinets.length
            ? my_cabinets.map(my_cabinet => (
                <CabinetList
                  branch={my_cabinet.cabinet.cabinet_set.branch}
                  cabinet_number={my_cabinet.cabinet.cabinet_number}
                  start_date={my_cabinet.start_date}
                  end_date={my_cabinet.end_date}
                  key={my_cabinet.id}
                />
              ))
            : "현재 이용중인 사물함이 없습니다"}
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/enroll" className={styles.button}>
            멤버쉽<br />(재)등록하기
          </Link>
          <Link to="/cabinet" className={styles.button}>
            사물함<br />(추가)등록하기
          </Link>
          <Link to="/membership/changePassword" className={styles.button}>
            비밀번호<br />변경하기
          </Link>
        </div>
      </div>
    </main>
  );
};

const MembershipList = ({ id, start_date, end_date, branch }) => (
  <div className={styles.listContainer}>
    <div className={styles.branch}>{branch.branch_name}</div>
    <div className={styles.period}>
      {start_date} - {end_date}
    </div>
  </div>
);

const CabinetList = ({ branch, cabinet_number, start_date, end_date }) => (
  <div className={styles.listContainer}>
    <div className={styles.branch}>
      {branch.branch_name} {cabinet_number}번 사물함
    </div>
    <div className={styles.period}>
      {start_date} - {end_date}
    </div>
  </div>
);

export default MyInfo;

RenderMembership.contextTypes = {
  t: PropTypes.func.isRequired
};
