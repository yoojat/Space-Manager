import React from "react";
// import PropTypes from 'prop-types';
import styles from "./styles.scss";
import Loading from "components/Loading";
import Faltu from "faltu";
import { Element } from "react-scroll";
import moment from "moment";

//선택한 사물함은 true를 반환

const CabinetChoiceForStaffCabinet = (props, context) => {
  const { sel_cabinet_set, loading, onCabinetClick, sel_cabinet } = props;

  return (
    <Element name="CabinetChoiceForStaffCabinet">
      {loading ? (
        <Loading />
      ) : (
        <ShowCabinets
          sel_cabinet_set={sel_cabinet_set}
          onCabinetClick={onCabinetClick}
          sel_cabinet={sel_cabinet}
        />
      )}
    </Element>
  );
};

const ShowCabinets = (props, context) => {
  const {
    sel_cabinet_set: { horizontal_num, vertical_num, cabinets },
    onCabinetClick,
    sel_cabinet
    // cabinets_to_enroll
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

      let is_sel_cabinet = sel_cabinet ? cabinet.id === sel_cabinet.id : false;

      let classes = `
      ${
        cabinet.is_clean
          ? styles.available
          : moment(cabinet.end_date).valueOf() > moment().valueOf()
            ? styles.nowuse
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
            style={{ backgroundColor: "#374bab" }}
          />
          현재 이용중
        </div>
        <div className={styles.displayCol}>
          <div
            className={styles.stateColor}
            style={{ backgroundColor: "#f7465b" }}
          />
          만료
        </div>
        <div className={styles.displayCol}>
          <div
            className={styles.stateColor}
            style={{ backgroundColor: "white" }}
          />
          미사용
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
    onCabinetClick(cabinet);
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

CabinetChoiceForStaffCabinet.propTypes = {};

export default CabinetChoiceForStaffCabinet;
