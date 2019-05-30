import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimePicker from '../time-picker'
import DropDownList from '../dropdown-list'
import './styles.scss'

class BookingModal extends Component {
    static propTypes = {
        save: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired
    }

    render() {
        const { save, close } = this.props
 
        return (
            <div className="wrapper">
                <div className="booking-modal">
                    <div className="booking-modal__header">
                        Бронирование переговорной
                    </div>
                    <input className="booking-modal__input" placeholder="Название" />
                    <input className="booking-modal__input" placeholder="Ваша фамилия" />
                    <div>
                        <TimePicker />
                        <TimePicker />
                    </div>
                    <div className="booking-modal__drop-down">
                        <DropDownList />
                    </div>
                    <div className="booking-modal__btn">
                        <input className="booking-modal__btn-close" type="button" value="Отмена" onClick = { close.bind(this) } />
                        <input className="booking-modal__btn-save" type="button" value="Сохранить" onClick = { save.bind(this) }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingModal