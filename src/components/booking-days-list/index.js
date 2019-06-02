import React, { Component } from 'react'
import PropTypes from 'prop-types'
import days from '../../fixtures/days'
import './styles.scss'

class BookingDaysList extends Component {
    static propTypes = {
        range: PropTypes.number.isRequired,
        active: PropTypes.number.isRequired,
        callback: PropTypes.func.isRequired
    }

    clickHandler(day) {

    }

    render() {
        return (
            <div className="day-picker">
                { this.getButtons() }
            </div>
        )
    }

    getButtons() {
        const { range, active, callback } = this.props
        let elemens = []

        for (let i = 0; i < range; i++) {
            let elem = (
                <input 
                    type="button" 
                    className = { active === i ? 'day-picker__btn_active' : 'day-picker__btn_default'} 
                    value = { this.getButtonsText(i) } 
                    onClick = { callback.bind(this, i) }
                    key = { i } />
            )
            elemens.push(elem)
        }

        return elemens
    }

    getButtonsText(value) {
        let date = new Date()
        let monthDay = date.getDate()
        let weekDay = null
        
        date.setDate(monthDay + value)

        monthDay = date.getDate()
        weekDay = date.getDay()

        return monthDay + ' ' + days[weekDay]
    }
}

export default BookingDaysList