import { SAVE_EDIT } from '../constants'

function getValidationMessage(startTime, endTime) {
    let date = new Date()
    let currentTime = date.getHours() + ':' + date.getMinutes()
    let notValidEndTime = (parseTime(endTime) - parseTime(startTime)) <= 0
    let notValidStartTime = (parseTime(startTime) - parseTime(currentTime)) <= 0

    if (notValidEndTime)
        return 'Время окончания должно быть больше вренеми начала!'

    if (notValidStartTime)
        return 'Время начала меньше текущего времени!'

    return ''
}

function parseTime(time) {
    let split = time.split(':')
    return parseInt(split[0]) * 60 + parseInt(split[1])
}

export default store => next => action => {
    const { type } = action
    
    if (type !== SAVE_EDIT) return next(action)

    let _store = store.getState()
    let item = _store.editableItem
    let validationMessage = getValidationMessage(item.startTime, item.endTime)
    
    if (validationMessage) {
        next({ 
            ...action, 
            validationMessage
        })
    } else {
        // http request
        next(action)
    }
}