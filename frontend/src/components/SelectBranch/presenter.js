import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const SelectBranch = (props, context) => {
  console.log(props);
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

SelectBranch.propTypes = {
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      branch_name: PropTypes.string.isRequired,
      branch_num: PropTypes.number.isRequired,
      detail_address: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      lounge_img: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleBranchClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selBranchId: PropTypes.string.isRequired,
};
SelectBranch.contextTypes = {
  t: PropTypes.func.isRequired,
};
