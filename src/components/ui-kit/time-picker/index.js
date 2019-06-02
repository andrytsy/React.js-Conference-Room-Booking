import React, { Component } from 'react'
import { ButtonPlus, ButtonMinus } from '../buttons-icon'
import './styles.scss'

class TimePicker extends Component {
    render() {
        const { time, minusCallback, plusCallback } = this.props
        return (
            <div>
                { this.getTitle() }
                <div className="time-picker__group">
                    <ButtonMinus callback = { minusCallback.bind(this) } />
                    <span className="group__time">{ time }</span>
                    <ButtonPlus callback = { plusCallback.bind(this) } />
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