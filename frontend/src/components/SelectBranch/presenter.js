import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const SelectBranch = (props, context) => {
  if (props.loading) {
    return null;
  } else {
    return <RenderSelectBranch {...props} />;
  }
};

const RenderSelectBranch = (props, context) => {
  const selBranchId = Number(props.selBranchId);
  return (
    <div className={styles.buttonContainer}>
      {props.branches.map(branch => {
        const isSelected = selBranchId === branch.id ? true : false;
        return (
          <BranchSelectButton
            {...branch}
            key={branch.id}
            handleBranchClick={props.handleBranchClick}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

const BranchSelectButton = (props, context) => {
  const {isSelected} = props;
  const classes = `${styles.button} ${isSelected ? styles.selected : null}`;
  return (
    <div className={classes} id={props.id} onClick={props.handleBranchClick}>
      {props.branch_num}호점<br />
      {props.branch_name}
    </div>
  );
};

export default SelectBranch;

SelectBranch.propTypes = {};
SelectBranch.contextTypes = {
  t: PropTypes.func.isRequired,
};
