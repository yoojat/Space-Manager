import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import {Element} from 'react-scroll';
import SelectCabinetEach from 'components/SelectCabinetEach';

const SelectCabinet = (props, context) => {
  const {
    use_cabinet,
    is_first,
    sel_branch,
    cabinetSetClickHandler,
    sel_cabinet_set_id,
  } = props;
  let yesClasses;
  let noClasses;
  if (is_first) {
    yesClasses = styles.button;
    noClasses = styles.button;
  } else {
    yesClasses = `${styles.button} ${props.use_cabinet ? styles.selected : ''}`;
    noClasses = `${styles.button} ${!props.use_cabinet ? styles.selected : ''}`;
  }

  return (
    <Element name="select_cabinet">
      <div className={styles.selectCabinetContainer}>
        <div className={styles.title}>사물함을 이용하시겠습니까?</div>
        <div className={styles.buttonContainer}>
          <div className={yesClasses} onClick={props.yesClickHandler}>
            네
          </div>
          <div className={noClasses} onClick={props.noClickHandler}>
            아니오
          </div>
        </div>

        {use_cabinet
          ? <RenderSelectCabinet
              sel_branch={sel_branch}
              cabinetSetClickHandler={cabinetSetClickHandler}
              sel_cabinet_set_id={sel_cabinet_set_id}
            />
          : ''}

        {sel_cabinet_set_id
          ? <SelectCabinetEach sel_cabinet_set_id={sel_cabinet_set_id} />
          : ''}
      </div>
    </Element>
  );
};

const RenderSelectCabinet = (props, context) => {
  const {sel_branch, cabinetSetClickHandler, sel_cabinet_set_id} = props;
  // console.log(props);

  return (
    <Fragment>
      <div className={styles.cabinetSelectTitle}>
        사물함 위치를 선택해주세요
      </div>

      <div className={styles.cabinetSetContainer}>
        <img
          className={styles.loungeImg}
          src={sel_branch.lounge_img_cabinet}
          alt="사물함 위치도"
        />
        {sel_branch.cabinet_sets.map (cabinet_set => (
          <CabinetSet
            cabinet_set={cabinet_set}
            key={cabinet_set.id}
            cabinetSetClickHandler={cabinetSetClickHandler}
            sel_cabinet_set_id={sel_cabinet_set_id}
            id={cabinet_set.id}
          />
        ))}
        {}

        {/*
      캐비넷 세트 선택
      해당 케비넷 세트 정보(캐비넷, 가로세로) 불러오기
      가로, 세로 개수만큼 표 그리기
      캐비넷 배열 맵핑하여  해당돔에 캐비넷 정보 넣기
      */}
      </div>
    </Fragment>
  );
};

const CabinetSet = (props, context) => {
  const {cabinet_set, cabinetSetClickHandler, sel_cabinet_set_id, id} = props;
  const css = {
    width: `${cabinet_set.width}%`,
    height: `${cabinet_set.height}%`,
    left: `${cabinet_set.xpos}%`,
    top: `${cabinet_set.ypos}%`,
  };

  let classes;
  if (sel_cabinet_set_id) {
    classes = `${styles.cabinetSet} ${sel_cabinet_set_id === id ? styles.selected : ''}`;
  } else {
    classes = styles.cabinetSet;
  }

  const onClickHandler = e => {
    cabinetSetClickHandler (id);
  };

  return <div style={css} className={classes} onClick={onClickHandler} />;
};

SelectCabinet.propTypes = {
  is_first: PropTypes.bool.isRequired,
  noClickHandler: PropTypes.func.isRequired,
  sel_branch: PropTypes.shape ({
    lounge_img_cabinet: PropTypes.string.isRequired,
    cabinet_sets: PropTypes.arrayOf (
      PropTypes.shape ({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        xpos: PropTypes.number.isRequired,
        ypos: PropTypes.number.isRequired,
        order: PropTypes.number.isRequired,
        desc: PropTypes.string.isRequired,
        branch: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  use_cabinet: PropTypes.bool.isRequired,
  yesClickHandler: PropTypes.func.isRequired,
};

export default SelectCabinet;
