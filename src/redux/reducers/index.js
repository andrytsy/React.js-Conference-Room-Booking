import { EDIT_TIME, SAVE_EDIT, CANCEL_EDIT_TIME,  SET_TEXT, SET_TIME, SET_DAYS, SET_DAY, SET_COLUMN } from '../constants'
import defaultData from '../fixtures'
import { mobileCheck } from '../../services/mobileService'


function getDefaultDate() {
    return new Date().toLocaleDateString()
}

function getDays(selectedDays, day) {
    if (~selectedDays.indexOf(day))
        return selectedDays.filter(_day => _day !== day)
    else
        selectedDays.push(day)

    return selectedDays
}

function calculateTime(operator, time) {
    let [ hours, minutes ] = time.split(':')
    minutes = minutes === '00' ? '30' : '00'

    if (minutes === '00' && operator === 'plus')
        hours = parseInt(hours) + 1
    
    if (minutes === '30' && operator === 'minus')
        hours = parseInt(hours) - 1

    if (hours < 8 || (hours >= 22 && minutes !== '00'))
        return time
    return hours + ':' + minutes
}

export default (state = defaultData, action) => {
    const { type, item, time, key, day, operator, text, validationMessage, column } = action

    switch (type) {
        case EDIT_TIME:
            let [ startTime, endTime ] = item.time.split('-')

            return {
                ...state,
                editableItem: {
                    userName: item.userName || '',
                    eventName: item.eventName || '',
                    startTime: startTime.trim(),
                    endTime: endTime.trim(),
                    dateStart: item.dateStart || getDefaultDate(),
                    dateEnd: item.dateEnd || getDefaultDate(),
                    days: item.days || ['Четверг']
                }
            }

        case SAVE_EDIT:
            if (validationMessage)
                state.editableItem.validationMessage = validationMessage
            else
                state.editableItem = null
            return { ...state }

        case CANCEL_EDIT_TIME:
            return {
                ...state,
                editableItem: null
            }

        case SET_TEXT:
                state.editableItem[key] = text
                return { ...state }

        case SET_TIME:
            state.editableItem[key] = calculateTime(operator, time)
            return { ...state }

        case SET_DAYS:
                let selectedDays = state.editableItem.days.slice()
                state.editableItem.days = getDays(selectedDays, day)
                return { ...state }

        case SET_DAY: 
            return { ...state, currentDay: day }

        case SET_COLUMN: 
            return { ...state, currentColumn: column }

        default: 
            return {
                columns: state,
                editableItem: null,
                currentDay: 0,
                isMobile: mobileCheck(),
                currentColumn: 0
            }
    }
}
