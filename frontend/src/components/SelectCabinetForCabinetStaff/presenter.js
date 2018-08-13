import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import CabinetSetForCabinetStaff from "components/CabinetSetForCabinetStaff";
import Loading from "components/Loading";
import CabinetChoiceForStaffCabinet from "components/CabinetChoiceForStaffCabinet";
import CabinetSetButtonForCabinetStaff from "components/CabinetSetButtonForCabinetStaff";
import { Element } from "react-scroll";

const SelectCabinetForCabinetStaff = (props, context) => {
  const { sel_branch, loading, sel_cabinet_set, cabinet_list_is_first } = props;
  return loading ? (
    <Loading />
  ) : (
    <Element name="SelectCabinetForCabinetStaff">
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
              <CabinetSetForCabinetStaff
                cabinet_set={cabinet_set}
                key={cabinet_set.id}
                id={cabinet_set.id}
              />
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {sel_branch.cabinet_sets.map(cabinet_set => (
              <CabinetSetButtonForCabinetStaff
                cabinet_set={cabinet_set}
                key={cabinet_set.id}
              />
            ))}
          </div>

          {sel_cabinet_set ? (
            <Fragment>
              <CabinetChoiceForStaffCabinet />
            </Fragment>
          ) : cabinet_list_is_first ? (
            ""
          ) : (
            <div className={styles.loadingContainer}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </Element>
  );
};

SelectCabinetForCabinetStaff.propTypes = {};

SelectCabinetForCabinetStaff.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SelectCabinetForCabinetStaff;
