import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import CabinetSetForEnroll from "components/CabinetSetForEnroll";
import Loading from "components/Loading";
import CabinetChoiceForEnrollSuper from "components/CabinetChoiceForEnrollSuper";
import StartChoiceForEnrollCabinetSuper from "../StartChoiceForEnrollCabinetSuper";
import CabinetSetButtonForEnrollSuper from "components/CabinetSetButtonForEnrollSuper";
import CabinetListForEnrollCabinet from "components/CabinetListForEnrollCabinet";

const EnrollCabinetSuper = (props, context) => {
  const {
    sel_branch,
    loading,
    sel_cabinet_set,
    cabinets_to_enroll,
    cabinet_list_is_first
  } = props;
  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className={styles.selectCabinetContainer}>
        <div>
          <div className={styles.cabinetSelectTitle}>
            사물함 위치를 선택해주세요!
          </div>

          <div className={styles.cabinetSetContainer}>
            <img
              className={styles.loungeImg}
              src={sel_branch.lounge_img_cabinet}
              alt="사물함 위치도"
            />
            {sel_branch.cabinet_sets.map(cabinet_set => (
              <CabinetSetForEnroll
                cabinet_set={cabinet_set}
                key={cabinet_set.id}
                id={cabinet_set.id}
              />
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {sel_branch.cabinet_sets.map(cabinet_set => (
              <CabinetSetButtonForEnrollSuper
                cabinet_set={cabinet_set}
                key={cabinet_set.id}
              />
            ))}
          </div>

          {sel_cabinet_set ? (
            <Fragment>
              <CabinetChoiceForEnrollSuper />
            </Fragment>
          ) : cabinet_list_is_first ? (
            ""
          ) : (
            <div className={styles.loadingContainer}>
              <Loading />
            </div>
          )}
          {cabinets_to_enroll.length ? (
            <div className={styles.cabinetList}>
              <div className={styles.listTitle}>선택하신 사물함</div>
              <div className={styles.cabinetListContainer} />
              {cabinets_to_enroll.map(cabinet_to_enroll => (
                <CabinetListForEnrollCabinet
                  cabinet_to_enroll={cabinet_to_enroll}
                  key={cabinet_to_enroll.id}
                />
              ))}
            </div>
          ) : (
            ""
          )}
          {cabinets_to_enroll.length ? (
            <StartChoiceForEnrollCabinetSuper />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

EnrollCabinetSuper.propTypes = {};

EnrollCabinetSuper.contextTypes = {
  t: PropTypes.func.isRequired
};

export default EnrollCabinetSuper;
