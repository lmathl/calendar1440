import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    prevMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired
};

const MonthNavigation = ({ prevMonth, nextMonth }) => (
    <span>
        <i className="glyphicon glyphicon-chevron-left left white"
            onClick={() => prevMonth()}>
        </i>
        <i className="glyphicon glyphicon-chevron-right right white"
            onClick={() => nextMonth()}>
        </i>
    </span>
);

MonthNavigation.propTypes = propTypes;
export default MonthNavigation;
