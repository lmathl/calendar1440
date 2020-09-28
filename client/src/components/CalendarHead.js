import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    settings: PropTypes.object.isRequired,
    toggleMonthSidebar: PropTypes.func.isRequired,
    editFocus: PropTypes.func.isRequired,
    onKeyUpYear: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired,
    daysArray: PropTypes.array.isRequired,
    currentMonth: PropTypes.object.isRequired,
    dateContext: PropTypes.object.isRequired
};

const CalendarHead = ({ settings, toggleMonthSidebar, editFocus, onKeyUpYear, setTime, daysArray, currentMonth, dateContext }) => {
    const monthFocus = (currentMonth && currentMonth.focus) || "null";
    return (
        <thead>
            <tr className="calendar-header">
                <td colSpan="7">
                    <span className="header">
                        { settings && settings.showMonth &&
                            <span className="month" onClick={ toggleMonthSidebar }>
                                { dateContext.format("MMMM") }{ " " }
                            </span> }
                        { settings && settings.showYear && <span><input
                            value={ dateContext.format("Y") }
                            onKeyUp={ (e) => onKeyUpYear(e) }
                            onChange={ (e) => setTime("year", e.target.value) }
                            type="number"
                            placeholder="year" />
                        </span> }
                        { settings && settings.showFocus && <span>Focus:{ " " }
                            <span
                                contentEditable
                                suppressContentEditableWarning
                                spellCheck="false"
                                onBlur={ (e) => {
                                    const newFocus = e.target.innerHTML;
                                    editFocus(newFocus, dateContext, daysArray, currentMonth)
                                } }
                                dangerouslySetInnerHTML={ {
                                    __html: monthFocus
                                } }
                            />
                        </span> }
                    </span>
                </td>
            </tr>
        </thead>
    );
}

CalendarHead.propTypes = propTypes;
export default CalendarHead;