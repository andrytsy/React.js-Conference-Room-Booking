import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonPlus, ButtonMinus } from '../buttons-icon'
import './styles.scss'

class TimePicker extends Component {
    static propTypes = {
        time: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired
    }

    render() {
        const { time, callback } = this.props
        return (
            <div>
                { this.getTitle() }
                <div className="time-picker__group">
                    <ButtonMinus callback = { callback.bind(this, 'minus', time) } />
                    <span className="group__time">{ time }</span>
                    <ButtonPlus callback = { callback.bind(this, 'plus', time) } />
                </div>
            </div>
        )
    }

    getTitle() {
        const { title } = this.props

        if (title)
            return <div className="time-picker__header">{ title }</div>
        return null
    }
}

export default TimePicker