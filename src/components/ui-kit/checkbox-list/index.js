import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class CheckboxList extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        selected: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired
    }

    render() {
        const { list, selected, callback } = this.props

        return list.map((item) => {
            return (
                <div className="checkbox-list-item" key = { item }>
                    <input type="checkbox" 
                        name = { item }
                        className="checkbox-list-item__checkbox"
                        checked = { ~selected.indexOf(item) }
                        onChange = { callback.bind(this, item) }
                    />
                    <label 
                        htmlFor = { item } 
                        className="checkbox-list-item__label"
                        onClick = { callback.bind(this, item) }
                    >
                        { item }
                    </label>
                </div>
            )
        })
    }
}

export default CheckboxList