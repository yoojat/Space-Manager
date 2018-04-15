import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import {Element} from 'react-scroll';

const SelectWhen = (props, context) => {
  moment.updateLocale('kr', {
    months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split(
      '_'
    ),
    monthsParseExact: true,
    weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
    weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
    weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm',
    },
    calendar: {
      lastDay: '[Yesterday at] LT',
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      lastWeek: '[last] dddd [at] LT',
      nextWeek: 'dddd [at] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function(number) {
      return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse: /PD|MD/,
    isPM: function(input) {
      return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function(hours, minutes, isLower) {
      return hours < 12 ? 'AM' : 'PM';
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
  });
  return (
    <Fragment>
      <div className={styles.selWhenTitle}>
        {context.t('이용시작 일시를 선택해 주세요')}
      </div>
      <Element name="select_when" />
      <Datetime
        dateFormat="YYYY년 MM월 DD일"
        timeFormat={false}
        onChange={props.onChangeDateHandler}
        className={styles.datetime}
        defaultValue={new Date()}
        closeOnTab={true}
        closeOnSelect={true}
      />

      <Datetime
        dateFormat={false}
        timeFormat="hh:mm a"
        onChange={props.onChangeTimeHandler}
        className={styles.datetime}
        defaultValue={new Date()}
        closeOnTab={true}
        closeOnSelect={true}
      />
    </Fragment>
  );
};

SelectWhen.propTypes = {
  onChangeDateHandler: PropTypes.func.isRequired,
  onChangeTimeHandler: PropTypes.func.isRequired,
};
SelectWhen.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default SelectWhen;
