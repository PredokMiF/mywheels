import '@mywheels/vendors'
import React from 'react'
import ReactDOM from 'react-dom'
import { Player } from '@mywheels/core/Player'

const config = {
    Component: 'div',
    children: [
        {
            Component: 'h1',
            key: 'header',
            children: 'Hi app1!',
        }, {
            Component: 'p',
            key: 'text',
            children: 'Now we go to party!!!',
        },
    ],
}

ReactDOM.render(
    <Player config={config} />,
    document.getElementById('root'),
)
