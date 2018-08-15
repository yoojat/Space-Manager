import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import CabinetSetForShiftCabinet from "components/CabinetSetForShiftCabinet";
import Loading from "components/Loading";
import CabinetChoiceForCabinetShift from "components/CabinetChoiceForCabinetShift";
import CabinetSetButtonShiftCabinet from "components/CabinetSetButtonShiftCabinet";
import { Element } from "react-scroll";

const SelectCabinetForShiftCabinet = (props, context) => {
  const { sel_branch, loading, sel_cabinet_set, cabinet_list_is_first } = props;
  return loading ? (
    <Loading />
  ) : (
    <Element name="SelectCabinetForShiftCabinet">
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
              <CabinetSetForShiftCabinet
                cabinet_set={cabinet_set}
                key={cabinet_set.id}
                id={cabinet_set.id}
              />
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {sel_branch.cabinet_sets.map(cabinet_set => (
              <CabinetSetButtonShiftCabinet
                cabinet_set={cabinet_set}
                key={cabinet_set.id}
              />
            ))}
          </div>

          {sel_cabinet_set ? (
            <Fragment>
              <CabinetChoiceForCabinetShift />
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

SelectCabinetForShiftCabinet.propTypes = {};

SelectCabinetForShiftCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SelectCabinetForShiftCabinet;
