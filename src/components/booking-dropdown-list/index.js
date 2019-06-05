import React, { Component } from 'react'
import PropTypes from 'prop-types'
import allDays from '../../fixtures/days'
import { ButtonArrowDown } from '../ui-kit/buttons-icon'
import CheckboxList from '../ui-kit/checkbox-list'
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
                    <span className = { expand ? 'drop-down__header-text-active' : null }>
                        Регулярное бронирование
                    </span>
                    <ButtonArrowDown css = { expand ? 'drop-down__header-arrow-expand' : 'drop-down__header-arrow-collapse' } />
                </div>
                { expand ? this.getElements() : null }
            </div>
        )
    }

    getElements() {
        const { dateStart, dateEnd, dateCallback, days, daysCallback } = this.props

        return (
            <div>
                <div className="drop-down__date-pickers">
                    <span>
                        C
                        <input 
                            className="drop-down__date-picker"
                            defaultValue = { dateStart } 
                            onBlur = { dateCallback.bind(this, 'dateStart') }
                        />
                    </span>
                    <span>
                        По 
                        <input 
                            className="drop-down__date-picker"
                            defaultValue = { dateEnd } 
                            onBlur = { dateCallback.bind(this, 'dateEnd') } 
                        />
                    </span>
                </div>
                <div className="drop-down__list">
                    <div className="drop-down__list-header">
                        Переодичность
                    </div>
                    <div className="drop-down__list-items">
                        <CheckboxList 
                            list = { allDays } 
                            selected = { days } 
                            callback = { daysCallback }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingDropDown