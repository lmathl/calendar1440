import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    toggleMonthSidebar: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired
};

const MonthSidebar = ({ toggleMonthSidebar, setTime }) => {
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return(
        <div id="month-sidebar" className="month-sidenav text-align-center">
            <span className="close" onClick={toggleMonthSidebar}>&times;</span>
            {monthArray.map((month,i) => <div className="month-nav" key={month} onClick={() => setTime("month", i)}>{month}</div>)}
        </div>
    );
}

MonthSidebar.propTypes = propTypes;
export default MonthSidebar;