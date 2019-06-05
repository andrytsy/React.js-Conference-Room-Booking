import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setBookingText, setBookingTime, setBookingDay, cancelBookingItem, saveBookingItem } from '../../redux/actions'
import TimePicker from '../ui-kit/time-picker'
import BookingDropDown from '../booking-dropdown-list'
import './styles.scss'

class BookingModal extends Component {
    textHandler(key, event) {
        const { setBookingText } = this.props
        let value = event.target.value
        setBookingText(key, value)
    }

    changeTimeHandler(key, operator, time) {
        const { setBookingTime } = this.props
        setBookingTime(key, time, operator)
    }

    closeHandler() {
        const { cancelBookingItem } = this.props
        cancelBookingItem()
    }

    saveHandler() {
        const { saveBookingItem } = this.props
        saveBookingItem()
    }

    daysHandler(day) {
        const { setBookingDay } = this.props
        setBookingDay(day)
    }

    render() {
        const { editableItem } = this.props
        
        return editableItem 
            ? this.getElements() 
            : null 
    }

    getElements() {
        const { 
            startTime, 
            endTime, 
            dateStart, 
            dateEnd, 
            days, 
            validationMessage,
            userName,
            eventName
        } = this.props

        return (
            <div className="wrapper">
                <div className="booking-modal">
                    <div className="booking-modal__header">
                        Бронирование переговорной
                    </div>
                    <input 
                        className="booking-modal__input"
                        defaultValue = { userName } 
                        onBlur = { this.textHandler.bind(this, 'eventName') }
                        placeholder="Название" 
                    />
                    <input 
                        className="booking-modal__input" 
                        defaultValue = { eventName } 
                        onBlur = { this.textHandler.bind(this, 'userName') }
                        placeholder="Ваша фамилия" 
                    />
                    <div className="booking-modal__time-pickers" >
                        <span className="time-pickers__item">
                            <TimePicker 
                                title ='Начало' 
                                time = { startTime } 
                                callback = { this.changeTimeHandler.bind(this, 'startTime') }
                            />
                        </span>
                        <span className="time-pickers__item">
                            <TimePicker 
                                title ='Завершение' 
                                time = { endTime } 
                                callback = { this.changeTimeHandler.bind(this, 'endTime') }
                            />
                        </span>
                    </div>
                    <div className="booking-modal__drop-down">
                        <BookingDropDown 
                            dateStart = { dateStart } 
                            dateEnd = { dateEnd } 
                            days = { days } 
                            dateCallback = { this.textHandler.bind(this) }
                            daysCallback = { this.daysHandler.bind(this)}
                        />
                    </div>
                    
                    { validationMessage ? <p className="booking-modal__validation">{ validationMessage }</p> : null }

                    <div className="booking-modal__btn">
                        <input className="booking-modal__btn-close" type="button" value="Отмена" onClick = { this.closeHandler.bind(this) } />
                        <input className="booking-modal__btn-save" type="button" value="Сохранить" onClick = { this.saveHandler.bind(this) }/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state.editableItem) {
        return {
            editableItem: state.editableItem,
            userName: state.editableItem.userName,
            eventName: state.editableItem.eventName,
            startTime: state.editableItem.startTime,
            endTime: state.editableItem.endTime,
            dateStart: state.editableItem.dateStart,
            dateEnd: state.editableItem.dateEnd,
            days: state.editableItem.days,
            validationMessage: state.editableItem.validationMessage
        }
    } else { 
        return { editableItem: null }
    }
}

export default connect(mapStateToProps, {  
    setBookingText, 
    setBookingTime, 
    setBookingDay, 
    cancelBookingItem, 
    saveBookingItem
})(BookingModal)