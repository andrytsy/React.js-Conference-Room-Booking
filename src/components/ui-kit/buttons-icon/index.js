import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as IconPlus } from './icons/plus.svg'
import { ReactComponent as IconMinus } from './icons/minus.svg'
import { ReactComponent as IconArrowDown } from './icons/arrow-down.svg'
import './styles.scss'

const propTypes = {
    callback: PropTypes.func,
    css: PropTypes.string
}

function getSvgElement(props, element) {
    const { callback, css } = props
    return (
        <div onClick = { callback } className = { css ? css : 'default-button-icon' }>
            { element }
        </div>
    )
}

export const ButtonPlus = (props) => {
    return getSvgElement(props, <IconPlus />)
}

export const ButtonMinus = (props) => {
    return getSvgElement(props, <IconMinus />)
}

export const ButtonArrowDown = (props) => {
    return getSvgElement(props, <IconArrowDown />)
}


ButtonPlus.propTypes = propTypes
ButtonMinus.propTypes = propTypes
ButtonArrowDown.propTypes = propTypes

