import { EDIT_TIME, SET_DAY } from '../constants'

export function editBookingTime(time) {
    return { 
        type: EDIT_TIME, 
        time 
    }
}

export function setDay(day) {
    return { 
        type: SET_DAY, 
        day 
    }
}