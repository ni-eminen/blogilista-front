import React, { useState, useImperativeHandle } from 'react'


const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }


    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div className='hideWhenVisible' style={hideWhenVisible}>
                <button id='openToggleButton' className='openButton' onClick={toggleVisibility}>{props.openButtonLabel}</button>
            </div>
            <div className='showWhenVisible' style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.closeButtonLabel}</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable