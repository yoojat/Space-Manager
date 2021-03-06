import React from "react";
// import PropTypes from 'prop-types';
import styles from "./styles.scss";
import { Element } from "react-scroll";
import Loading from "components/Loading";
import Faltu from "faltu";

function _valueCheck(cabinets, cabinet) {
  for (let i = 0, len = cabinets.length; i < len; i++) {
    if (cabinets[i].id === cabinet.id) {
      return true;
    }
  }
  return false;
}

const SelectCabinetEach = (props, context) => {
  const { sel_cabinet_set, loading, onCabinetClick, sel_cabinets } = props;

  return (
    <Element name="show_cabinet">
      {loading ? (
        <Loading />
      ) : (
        <ShowCabinets
          sel_cabinet_set={sel_cabinet_set}
          onCabinetClick={onCabinetClick}
          sel_cabinets={sel_cabinets}
        />
      )}
    </Element>
  );
};

const ShowCabinets = (props, context) => {
  const {
    sel_cabinet_set: { horizontal_num, vertical_num, cabinets },
    onCabinetClick,
    sel_cabinets
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

      let is_sel_cabinet = _valueCheck(sel_cabinets, cabinet);

      let classes = `
      ${cabinet.is_available ? styles.available : styles.noavailable} ${
        styles.tableCol
      } ${is_sel_cabinet ? styles.selected : ""}`;
      // console.log(newData);
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
    if (cabinet.is_available) {
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

SelectCabinetEach.propTypes = {};

export default SelectCabinetEach;
