import '@mywheels/vendors'
import React from 'react'
import ReactDOM from 'react-dom'

// import { Player } from './Player'
//
// const config = {
//     Component: 'div',
//     children: [
//         {
//             Component: 'h1',
//             key: 'header',
//             children: 'Hi all!',
//         }, {
//             Component: 'p',
//             key: 'text',
//             children: 'Core module was loaded normally!',
//         },
//     ],
// }
//
// ReactDOM.render(
//     <Player config={config} />,
//     document.getElementById('root'),
// )

const NamespacesContext = React.createContext([])

function App() {
    const [context, setContext] = React.useState([])

    return (
        <>
            <button onClick={() => { setContext([...context, 'zero'])}}>Update</button>

            <NamespacesContext.Provider value={context}>
                <Cached />
            </NamespacesContext.Provider>
        </>
    )
}

class Cached extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        console.log('Yo!')

        return <FirstEl />
    }
}

function FirstEl() {
    const namespace = React.useContext(NamespacesContext)

    return (
        <div>
            <h1>Namespace 1: {namespace.join('|')}</h1>

            <NamespacesContext.Provider value={[...namespace, 'one']}>
                <SecondEl />
            </NamespacesContext.Provider>
        </div>
    )
}

function SecondEl() {
    const namespace = React.useContext(NamespacesContext)

    return (
        <div>
            <h1>Namespace 2: {namespace.join('|')}</h1>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
)
