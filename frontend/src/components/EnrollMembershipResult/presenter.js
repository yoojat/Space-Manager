import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Element } from "react-scroll";

const EnrollMembershipResult = (props, context) => {
  const { enrollMembership, enrollCabinet } = props;
  return (
    <Element name="EnrollMembershipResult">
      {enrollMembership.sel_cost_type ? (
        <MembershipResult
          user_id={enrollMembership.target_user.username}
          user_name={enrollMembership.target_user.name}
          branch_name={enrollMembership.sel_branch.branch_name}
          start_datetime={enrollMembership.start_datetime}
          end_datetime={enrollMembership.end_datetime}
          days={enrollMembership.sel_cost_type.days}
        />
      ) : (
        ""
      )}
      {enrollCabinet.sel_cabinet_cost_type ? (
        <EnrollCabinetResult
          branch_name={enrollCabinet.sel_branch.branch_name}
          start_datetime={enrollCabinet.sel_start_datetime}
          end_datetime={enrollCabinet.sel_start_datetime}
          days={enrollCabinet.sel_cabinet_cost_type.days}
          cabinets_to_enroll={enrollCabinet.cabinets_to_enroll}
        />
      ) : (
        ""
      )}
    </Element>
  );
};

const MembershipResult = (props, context) => {
  const {
    user_id,
    user_name,
    branch_name,
    start_datetime,
    end_datetime,
    days
  } = props;
  return (
    <div className={styles.membershipResultContainer}>
      <div className={styles.title}>블루닷라운지 멤버쉽</div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>회원 아이디</div>
        <div className={styles.columnContent}>{user_id}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>회원 이름</div>
        <div className={styles.columnContent}>{user_name}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>등록 지점</div>
        <div className={styles.columnContent}>{branch_name}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>이용 시작</div>
        <div className={styles.columnContent}>{start_datetime}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>이용 종료</div>
        <div className={styles.columnContent}>{end_datetime}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>총 이용일수</div>
        <div className={styles.columnContent}>
          {days === 0.5 ? "12시간" : `${days}일`}
        </div>
      </div>
      <div className={styles.notedItemContainer}>
        <ul className={styles.notedItemUl}>
          <li className={styles.notedItem}>
            등록 지점 외 다른 지점도 이용가능하십니다. 단 좌석의 여유가 없을
            때는 지정하신 지점만 이용가능하십니다.
          </li>
          <li className={styles.notedItem}>
            할인 : 90일 22만원, 180일 40만원에 이용가능하십니다
          </li>
          <li className={styles.notedItem}>
            하루 등록은 12시간 이용 가능합니다.
          </li>
        </ul>
      </div>
    </div>
  );
};

const EnrollCabinetResult = (props, context) => {
  const {
    branch_name,
    start_datetime,
    end_datetime,
    days,
    cabinets_to_enroll
  } = props;
  return (
    <div className={styles.membershipResultContainer}>
      <div className={styles.title}>블루닷라운지 사물함</div>

      <div className={styles.column}>
        <div className={styles.columnTitle}>등록 지점</div>
        <div className={styles.columnContent}>{branch_name}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>이용 시작</div>
        <div className={styles.columnContent}>{start_datetime}</div>
      </div>

      <div className={styles.column}>
        <div className={styles.columnTitle}>이용 종료</div>
        <div className={styles.columnContent}>{end_datetime}</div>
      </div>

      <div className={styles.column}>
        <div className={styles.columnTitle}>사물함 번호</div>
        <div className={styles.columnContent}>
          {cabinets_to_enroll.map(cabinet => (
            <span className={styles.cabinetNumber}>
              {cabinet.cabinet_number}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.columnTitle}>이용 종료</div>
        <div className={styles.columnContent}>{end_datetime}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle}>총 이용일수</div>
        <div className={styles.columnContent}>
          {days === 0.5 ? "12시간" : `${days}일`}
        </div>
      </div>
    </div>
  );
};

EnrollMembershipResult.propTypes = {};

EnrollMembershipResult.contextTypes = {
  t: PropTypes.func.isRequired
};

export default EnrollMembershipResult;
