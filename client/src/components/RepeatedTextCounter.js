import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    sortedItems: PropTypes.array.isRequired,
    monthArray: PropTypes.array.isRequired,
    textCount: PropTypes.func.isRequired
};

const RepeatedTextCounter = ({ sortedItems, monthArray, textCount }) => {
    const allItemArray = sortedItems.map(item => item.days);
    var textArray = allItemArray.map(item => textCount(item));
    // sort by value
    var sortedTextArray = textArray.map(item => 
      Object.keys(item)
            .filter(e => e)
            .filter(key => item[key] !== 1)
            .sort((a, b) => item[b]-item[a])
            .reduce((sortedObj, key) => ({
              ...sortedObj,
              [key]: item[key]
            }), {})
    );
    var textKeys = sortedTextArray.map(item => Object.keys(item));
    var textValues = sortedTextArray.map(item => Object.values(item));
    var emptyCheck = textKeys.reduce((a,b)=>a.concat(b),[]);
    return (
        <div>
            <h5 className="title">Month History</h5>
            {emptyCheck.length === 0 && <div>No record. <div>This tab tracks the number of repeated texts or emojis.</div></div>}
            {monthArray.map((item,i) =>
                <div key={item}>{textKeys[i].length > 0 && item}
                {textKeys[i].map((_,j) =>
                    textKeys[i][j] && <div key={j} className="large">
                    {textKeys[i][j]} &times; {textValues[i][j]}</div>
                )}
                {textKeys[i].length > 0 && <br/>}
                </div>)}
        </div>
    );
}

RepeatedTextCounter.propTypes = propTypes;
export default RepeatedTextCounter;