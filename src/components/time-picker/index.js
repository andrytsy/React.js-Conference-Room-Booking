import React, { Component } from 'react'
import './styles.scss'

class timePicker extends Component {
    plusTimeHandler() {

    }

    minusTimeHandler() {

    }

    render() {
        const { title, time, minusCallback, plusCallback } = this.props
        return (
            <div>
                <div className="time-picker__header">{ title }</div>
                <div className="time-picker__group">
                    <span className="group__minus" onClick = { minusCallback.bind(this) }></span>
                    <span className="group__time">{ time }</span>
                    <span className="group__plus" onClick = { plusCallback.bind(this) }></span>
                </div>
            </div>
        )
    }
}

export default timePicker