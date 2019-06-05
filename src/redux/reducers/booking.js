import { EDIT_TIME, CANCEL_EDIT_TIME, SET_EDITABLE_TIME, SET_DAY } from '../constants'
import defaultData from '../fixtures' 

export default (state = {}, action) => {
    const { type, time, key, operator } = action

    switch (type) {
        case EDIT_TIME:
            let [ startTime, endTime ] = time.split('-')

            return {
                ...state,
                editableTime: {
                    startTime: startTime.trim(),
                    endTime: endTime.trim()
                }
            }

        case CANCEL_EDIT_TIME:
            return {
                ...state,
                editableTime: null
            }

        case SET_EDITABLE_TIME:
            state.editableTime[key] = calculateTime(operator, time)
            return {
                ...state
            }

        default: 
            return {
                columns: state,
                editableTime: null,
                currentDay: 0
            }
    }
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