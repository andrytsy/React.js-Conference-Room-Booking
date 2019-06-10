import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class CheckboxList extends Component {
    static propTypes = {
        range: PropTypes.number.isRequired,
        callback: PropTypes.func.isRequired
    }

    render() {
        const { range, callback } = this.props
        let elemens = []
        let active = 0

        for (let i = 0; i < range; i++) {
            let elem = (
                <input 
                    type="radio" 
                    name="radioList"
                    className = { active === i ? '__btn_active' : '__btn_default' }
                    onClick = { callback.bind(this, i) }
                    key = { i } />
            )
            elemens.push(elem)
        }

        return elemens
    }
}

export default CheckboxList