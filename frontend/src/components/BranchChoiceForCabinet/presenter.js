import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const BranchChoiceForCabinet = props => {
  const { branches, sel_branch, onBranchClick } = props;
  return branches ? (
    <div>
      <div className={styles.message}>원하시는 지점을 선택해주세요</div>
      <div className={styles.buttonContainer}>
        {branches.map(branch => {
          const classes = `${styles.button} ${
            sel_branch
              ? Number(branch.id) === Number(sel_branch.id)
                ? styles.selected
                : ""
              : ""
          }`;

          // const isSelected = selBranchId === branch.id ? true : false;
          return (
            <div
              className={classes}
              id={branch.id}
              key={branch.id}
              onClick={onBranchClick}
            >
              {branch.branch_num}호점<br />
              {branch.branch_name}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    ""
  );
};

BranchChoiceForCabinet.propTypes = {
  onBranchClick: PropTypes.func.isRequired,
  sel_banch: PropTypes.string,
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      branch_name: PropTypes.string.isRequired,
      branch_num: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BranchChoiceForCabinet;
