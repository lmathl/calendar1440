import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    items: PropTypes.array.isRequired,
    monthArray: PropTypes.array.isRequired,
    sortedItems: PropTypes.array.isRequired
};

const MonthFocus = ({ items, monthArray, sortedItems }) => {
    // check if there is no record
    const focusCombined = items.map(item => item.focus).filter(item => item);
    return (
    <div>
        <h5 className="title">Month Focus</h5>
        {focusCombined.length === 0 && <div>No record. <div>This tab tracks your month focus history.</div></div>}
        {monthArray.map((item,i) =>
            <div className="options" key={item}>
            {sortedItems[i].focus && item}
            <span className="float-right">{sortedItems[i].focus}</span>
            </div>)}
    </div>
  );
}

MonthFocus.propTypes = propTypes;
export default MonthFocus;