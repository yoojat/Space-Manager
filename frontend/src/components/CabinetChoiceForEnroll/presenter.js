import React, { Fragment } from "react";
// import PropTypes from 'prop-types';
import styles from "./styles.scss";
import Loading from "components/Loading";
import Faltu from "faltu";

//선택한 사물함은 true를 반환
function _valueCheck(cabinets_to_enroll, cabinet) {
  for (let i = 0, len = cabinets_to_enroll.length; i < len; i++) {
    if (cabinets_to_enroll[i].id === cabinet.id) {
      return true;
    }
  }
  return false;
}

function isMyCabinet(my_cabinets, cabinet) {
  return my_cabinets.some(my_cabinet => {
    if (my_cabinet.id === cabinet.id) {
      return true;
    } else {
      return false;
    }
  });
}

const CabinetChoiceForEnroll = (props, context) => {
  const {
    sel_cabinet_set,
    loading,
    onCabinetClick,
    cabinets_to_enroll,
    my_cabinets
  } = props;

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <ShowCabinets
          sel_cabinet_set={sel_cabinet_set}
          onCabinetClick={onCabinetClick}
          cabinets_to_enroll={cabinets_to_enroll}
          my_cabinets={my_cabinets}
        />
      )}
    </Fragment>
  );
};

const ShowCabinets = (props, context) => {
  const {
    sel_cabinet_set: { horizontal_num, vertical_num, cabinets },
    onCabinetClick,
    cabinets_to_enroll,
    my_cabinets
  } = props;

  let rows = [];
  for (var i = 0; i < vertical_num; i++) {
    let rowID = `row${i}`;
    let cell = [];
    for (var idx = 0; idx < horizontal_num; idx++) {
      let cellID = `cell${i}-${idx}`;
      // console.log('idx, i : ', idx, i);
      let cabinet = Faltu(cabinets)
        .find({ xpos: idx + 1, ypos: i + 1 })
        .get()[0];
      // 사물함 중에 해당 xpos와 ypos에 해당하는 것을 찾음

      let is_sel_cabinet = _valueCheck(cabinets_to_enroll, cabinet);

      let classes = `
      ${
        cabinet.is_clean
          ? styles.available
          : isMyCabinet(my_cabinets, cabinet)
            ? styles.my
            : styles.noavailable
      } ${styles.tableCol} ${is_sel_cabinet ? styles.selected : ""}`;
      //사물함의 is_clean상태를 확인하고 is_clean이 true이면 available class, false면 noavailable class

      cell.push(
        <TableData
          cellID={cellID}
          classes={classes}
          cabinet={cabinet}
          onCabinetClick={onCabinetClick}
          key={cabinet.id}
        />
      );
    }
    rows.push(
      <tr key={i} id={rowID} className={styles.tableRow}>
        {cell}
      </tr>
    );
  }
  return (
    <div className={styles.tableContainer}>
      <div className={styles.dispalyContainer}>
        <div className={styles.displayCol}>
          <div
            className={styles.stateColor}
            style={{ backgroundColor: "#f7465b" }}
          />
          이용불가
        </div>
        <div className={styles.displayCol}>
          <div
            className={styles.stateColor}
            style={{ backgroundColor: "white" }}
          />
          이용가능
        </div>
        <div className={styles.displayCol}>
          <div
            className={styles.stateColor}
            style={{ backgroundColor: "#374bab" }}
          />
          내사물함
        </div>
        <div className={styles.displayCol}>
          <div
            className={styles.stateColor}
            style={{ backgroundColor: "#cdeefb" }}
          />
          선택한 사물함
        </div>
      </div>

      <table className={styles.cabinetSet}>
        <tbody className={styles.cabinetTbody}>{rows}</tbody>
      </table>
    </div>
  );
};

const TableData = (props, context) => {
  const { onCabinetClick, cabinet } = props;
  const cabinetClickHandler = e => {
    if (cabinet.is_clean) {
      onCabinetClick(cabinet);
    }
  };
  return (
    <td
      key={props.cellID}
      id={props.cellID}
      className={props.classes}
      onClick={cabinetClickHandler}
    >
      {props.cabinet.cabinet_number}
    </td>
  );
};

CabinetChoiceForEnroll.propTypes = {};

export default CabinetChoiceForEnroll;
