import React, { Component } from 'react'
import PropTypes from 'prop-types'
import allDays from '../../fixtures/days'
import './styles.scss'

class BookingDropDown extends Component {
    static propTypes = {
        dateStart: PropTypes.string.isRequired,
        dateEnd: PropTypes.string.isRequired,
        days: PropTypes.array.isRequired,
        dateCallback: PropTypes.func.isRequired,
        daysCallback: PropTypes.func.isRequired
    }

    state = {
        expand: false
    }

    toggleList() {
        this.setState({ expand: !this.state.expand })
    }

    render() {
        let expand = this.state.expand

        return (
            <div>
                <div className="drop-down__header" onClick = { this.toggleList.bind(this) }>
                    <span 
                        className = { 
                            expand 
                                ? 'drop-down__header-text-active' 
                                : 'drop-down__header-text-default' 
                        }
                    >
                        Регулярное бронирование
                    </span>
                    <span 
                        className = { 
                            expand 
                                ? 'drop-down__header-arrow-expand' 
                                : 'drop-down__header-arrow-collapse' 
                        }
                    ></span>
                </div>
                { expand ? this.getElements() : null }
            </div>
        )
    }

    getElements() {
        const { dateStart, dateEnd, dateCallback } = this.props

        return (
            <div>
                <div className="drop-down__date-pickers">
                    <span>
                        C
                        <input 
                            className="drop-down__date-picker"
                            value = { dateStart } 
                            onChange = { dateCallback.bind(this, 'dateStart') }
                        />
                    </span>
                    <span>
                        По 
                        <input 
                            className="drop-down__date-picker"
                            value = { dateEnd } 
                            onChange = { dateCallback.bind(this, 'dateEnd') } 
                        />
                    </span>
                </div>
                <div className="drop-down__list">
                    <div className="drop-down__list-header">
                        Переодичность
                    </div>
                    <div className="drop-down__list-items">
                        { this.getDaysList() }
                    </div>
                </div>
            </div>
        )
    }

    getDaysList() {
        const { days, daysCallback } = this.props

        return allDays.map(day => (
            <div className="drop-down__list-item" key = { day }>
                <input type="checkbox" 
                    name = { day }
                    className="drop-down__list-item-checkbox"
                    checked = { ~days.indexOf(day) }
                    onChange = { daysCallback.bind(this, day)}
                />
                <label 
                    htmlFor = { day } 
                    className="drop-down__list-item-label"
                    onClick = { daysCallback.bind(this, day)}
                >
                    { day }
                </label>
            </div>

        ))
    }
}

export default BookingDropDown