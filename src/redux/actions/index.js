import { EDIT_TIME, SAVE_EDIT, CANCEL_EDIT_TIME, SET_TEXT, SET_TIME, SET_DAYS, SET_DAY } from '../constants'

export function editBookingItem(time) {
    return {
        type: EDIT_TIME,
        time
    }
}

export function saveBookingItem() {
    return {
        type: SAVE_EDIT
    }
}

export function cancelBookingItem() {
    return {
        type: CANCEL_EDIT_TIME
    }
}

export function setBookingText(key, text) {
    return {
        type: SET_TEXT,
        key,
        text
    }
}

export function setBookingTime(key, time, operator) {
    return {
        type: SET_TIME,
        key,
        time,
        operator
    }
}

export function setBookingDay(day) {
    return {
        type: SET_DAYS,
        day
    }
}

export function setDay(day) {
    return {
        type: SET_DAY,
        day
    }
}