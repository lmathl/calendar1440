import PropTypes from 'prop-types';
import React from "react";
import { connect } from 'react-redux';
import { newMonth, selectAll, selectDay, unselectAll, unselectDay, updateMonth } from '../actions/monthActions';

const propTypes = {
    newMonth: PropTypes.func.isRequired,
    updateMonth: PropTypes.func.isRequired,
    selectDay: PropTypes.func.isRequired,
    unselectDay: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired,
    unselectAll: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    selectedDays: PropTypes.array,
    dateContext: PropTypes.object.isRequired,
    daysArray: PropTypes.array.isRequired,
    currentMonth: PropTypes.object
};

class CalendarBody extends React.Component {

    componentDidMount() {
        // get id of current day div
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var todayId = `${ day }_${ month }`;
        // focus on current day div when the user presses Ctrl + Enter
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.keyCode === 13) {
                document.getElementById(todayId).focus();
            }
        });
    }

    range = (start, end) => {
        return new Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    dayOnClick(e, d) {
        const { selectedDays } = this.props;
        if (selectedDays.includes(d)) {
            this.props.unselectDay(d);
        } else {
            this.props.selectDay(d);
            if (e.shiftKey && selectedDays.length > 0) {
                const lastSelectedIndex = selectedDays.length - 1;
                const lowEnd = selectedDays[lastSelectedIndex] > d ? d : selectedDays[lastSelectedIndex];
                const highEnd = selectedDays[lastSelectedIndex] < d ? d : selectedDays[lastSelectedIndex];
                for (var i = lowEnd + 1; i <= highEnd - 1; i++) {
                    this.props.selectDay(i);
                }
            }
        }
    }

    divOnBlur = (newCell, d, monthString, daysArray, currentMonth) => {
        if (!currentMonth.id) {
            const newArray = [...daysArray.slice(0, d - 1).concat(newCell), ...daysArray.slice(d)]
            const data = {
                month: monthString,
                days: newArray
            }
            this.props.newMonth(data);
        } else if (currentMonth.id && daysArray[d] !== newCell) {
            const newArray = [...daysArray.slice(0, d - 1).concat(newCell), ...daysArray.slice(d)]
            const update = Object.assign({}, currentMonth, { days: newArray });
            this.props.updateMonth(update, currentMonth.id);
        }
    }

    render() {

        const { settings } = this.props;
        const { monFirst, showWeekday, weekdayShortForm } = settings;

        const { dateContext, selectedDays, daysArray, currentMonth } = this.props;
        const weekdaysSunFirst = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekdaysMonFirst = [...weekdaysSunFirst.slice(1, 8), "Sunday"];
        const weekdays = monFirst ? weekdaysMonFirst : weekdaysSunFirst;
        const blanksSunFirst = dateContext.startOf('month').format('d');
        const blanksMonFirst = blanksSunFirst === "0" ? blanksSunFirst + 6 : blanksSunFirst - 1;
        const blanksNumber = monFirst ? blanksMonFirst : blanksSunFirst;
        const numberOfDays = dateContext.daysInMonth();

        let week1blanks = [], weeks = [];

        // calculate arrays (number: #weeks, length: 7) for rendering the calendar
        for (var i = 1; i < 5; i++) {
            if (7 * (i + 1) - blanksNumber > numberOfDays && 7 * i + 1 - blanksNumber <= numberOfDays) {
                weeks[i] = this.range(7 * i + 1 - blanksNumber, numberOfDays)
            } else if (7 * i + 1 - blanksNumber >= numberOfDays) {
                break;
            } else {
                weeks[i] = this.range(7 * i + 1 - blanksNumber, 7 * (i + 1) - blanksNumber)
            }
        }
        for (var j = 0; j < blanksNumber; j++) {
            week1blanks.push("");
        }
        if (!weeks[weeks.length - 1].includes(numberOfDays) && numberOfDays > 29) {
            weeks[weeks.length] = this.range(7 * 5 + 1 - blanksNumber, numberOfDays)
        }
        weeks[0] = [...week1blanks, ...this.range(1, 7 - blanksNumber)];

        const monthString = `${ dateContext.format("MMMM") } ${ dateContext.format("Y") }`;
        const day = new Date();
        const today = day.getDate();
        const month = day.getMonth();
        return (
            <tbody>
                {showWeekday && <tr>{ weekdays.map(weekday => <td className="weekday" key={ weekday }>{ weekdayShortForm ? weekday.slice(0, 1) : weekday }</td>) }</tr> }
                {weeks.map(week =>
                    <tr key={ `week${ week }` }>
                        { week.map((d, i) => {
                            let dayClassName = d === today && Number(dateContext.format("M")) === month + 1 ? "day-text current" : "day-text";
                            let selectedDayClassName = selectedDays.includes(d) ? " select " : "";
                            return (
                                <td className="day-cell" key={ i * 40 }>
                                    <span
                                        className={ dayClassName + selectedDayClassName }
                                        onClick={ (e) => this.dayOnClick(e, d) }
                                    >
                                        { selectedDays.includes(d) ? "✔" : d }
                                    </span>
                                    {daysArray && d &&
                                        <div
                                            id={ d + "_" + dateContext.format("M") }
                                            contentEditable
                                            suppressContentEditableWarning
                                            spellCheck="false"
                                            onBlur={ (e) => {
                                                const newCell = e.target.innerHTML;
                                                this.divOnBlur(newCell, d, monthString, daysArray, currentMonth)
                                            } }
                                            dangerouslySetInnerHTML={ {
                                                __html: `${ daysArray[d - 1] }`
                                            } }
                                        /> }
                                </td>)
                        }) }
                    </tr>) }
            </tbody>
        );
    }
}

CalendarBody.propTypes = propTypes;
export default connect(null, { newMonth, updateMonth, selectDay, unselectDay, selectAll, unselectAll })(CalendarBody);