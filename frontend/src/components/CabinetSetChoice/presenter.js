import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import CabinetSet from "components/CabinetSet";
import { Element } from "react-scroll";

const CabinetSetChoice = (props, context) => {
  const {
    is_enroll_cabinet,
    cabinetYesClick,
    cabinetNoClick,
    sel_branch,
    sel_cost_type,
    is_first
  } = props;
  return (
    <Element name="CabinetSetChoice">
      {sel_cost_type.days <= 1 ? (
        ""
      ) : (
        <div className={styles.selectCabinetContainer}>
          <div className={styles.title}>사물함을 이용하시겠습니까?</div>
          <div className={styles.buttonContainer}>
            <div
              className={
                is_first
                  ? `${styles.button}`
                  : is_enroll_cabinet
                    ? `${styles.button} ${styles.selected}`
                    : `${styles.button}`
              }
              onClick={cabinetYesClick}
            >
              네
            </div>
            <div
              className={
                is_first
                  ? `${styles.button}`
                  : is_enroll_cabinet
                    ? `${styles.button}`
                    : `${styles.button} ${styles.selected}`
              }
              onClick={cabinetNoClick}
            >
              아니오
            </div>
          </div>
          {is_enroll_cabinet ? (
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
                  <CabinetSet
                    cabinet_set={cabinet_set}
                    key={cabinet_set.id}
                    id={cabinet_set.id}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </Element>
  );
};

CabinetSetChoice.propTypes = {
  cabinetNoClick: PropTypes.func.isRequired,
  cabinetYesClick: PropTypes.func.isRequired,
  sel_branch: PropTypes.object.isRequired,
  is_enroll_cabinet: PropTypes.bool.isRequired
};

CabinetSetChoice.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetSetChoice;
