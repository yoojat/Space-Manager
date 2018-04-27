import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import {Element} from 'react-scroll';
import Loading from 'components/Loading';
import Faltu from 'faltu';

const SelectCabinetEach = (props, context) => {
  const {sel_cabinet_set, loading} = props;

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <ShowCabinets sel_cabinet_set={sel_cabinet_set} />
      )}
    </div>
  );
};

const ShowCabinets = (props, context) => {
  console.log(props);
  const {
    sel_cabinet_set: {horizontal_num, vertical_num, cabinets},
  } = props;

  // var data = [
  //   {
  //     name: 'John',
  //     age: 16,
  //   },
  //   {
  //     name: 'Doe',
  //     age: 18,
  //   },
  //   {
  //     name: 'Smith',
  //     age: 22,
  //   },
  // ];

  // var newData = Faltu(data)
  //   .find({age: 18})
  //   .get();
  // console.log(newData);

  let rows = [];
  for (var i = 0; i < vertical_num; i++) {
    let rowID = `row${i}`;
    let cell = [];
    for (var idx = 0; idx < horizontal_num; idx++) {
      let cellID = `cell${i}-${idx}`;
      // console.log('idx, i : ', idx, i);
      let cabinet = Faltu(cabinets)
        .find({xpos: idx + 1, ypos: i + 1})
        .get()[0];
      // console.log(newData);
      cell.push(
        <td key={cellID} id={cellID}>
          {cabinet.cabinet_number}
        </td>
      );
    }
    rows.push(
      <tr key={i} id={rowID}>
        {cell}
      </tr>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 board">
          <table id="simple-board">
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

SelectCabinetEach.propTypes = {};

export default SelectCabinetEach;
