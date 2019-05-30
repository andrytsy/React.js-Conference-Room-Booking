import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimePicker from '../time-picker'
import DropDownList from '../dropdown-list'
import './styles.scss'

class BookingModal extends Component {
    static propTypes = {
        defaultTime: PropTypes.string.isRequired,
        save: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired
    }

    state = {
        userName: '',
        eventName: '',
        startTime: '',
        endTime: ''
    }

    componentDidMount() {
        const { defaultTime } = this.props
        let split = defaultTime.split('-')

        this.setState({ startTime: split[0] })
        this.setState({ endTime: split[1] })
    }

    inputHandler(field, event) {
        let value = event.target.value
        this.setState({ [field]: value })
    }

    changeTimeHandler(operator, field) {
        let time = this.state[field]
        let split = time.split(':')
        let newTime = this.calculateTime(operator, split)

        if (newTime)
            this.setState({ [field]: newTime })
    }

    calculateTime(operator, time) {
        let hours = time[0]
        let minutes = time[1] === '00' ? '30' : '00'

        if (minutes === '00' && operator === 'plus')
            hours = parseInt(hours) + 1
        
        if (minutes === '30' && operator === 'minus')
            hours = parseInt(hours) - 1

        if (hours < 8 || (hours >= 22 && minutes !== '00'))
            return null
        return hours + ':' + minutes
    }

    render() {
        const { save, close } = this.props
 
        return (
            <div className="wrapper">
                <div className="booking-modal">
                    <div className="booking-modal__header">
                        Бронирование переговорной
                    </div>
                    <input 
                        className="booking-modal__input" 
                        onChange = { this.inputHandler.bind(this, 'eventName') }
                        placeholder="Название" 
                    />
                    <input 
                        className="booking-modal__input" 
                        onChange = { this.inputHandler.bind(this, 'userName') }
                        placeholder="Ваша фамилия" 
                    />
                    <div className="booking-modal__time-pickers" >
                        <span className="time-pickers__item">
                            <TimePicker 
                                title ='Начало' 
                                time = { this.state.startTime } 
                                minusCallback = { this.changeTimeHandler.bind(this, 'minus', 'startTime') }
                                plusCallback = { this.changeTimeHandler.bind(this, 'plus', 'startTime') }
                            />
                        </span>
                        <span className="time-pickers__item">
                            <TimePicker 
                                title ='Завершение' 
                                time = { this.state.endTime } 
                                minusCallback = { this.changeTimeHandler.bind(this, 'minus', 'endTime') }
                                plusCallback = { this.changeTimeHandler.bind(this, 'plus', 'endTime') }
                            />
                        </span>
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