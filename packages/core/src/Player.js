import React from 'react'

export function Player({ config }) {
    return mapper(config)
}

function mapper(config) {
    if (!config) {
        return null
    }

    if (Array.isArray(config)) {
        return config.map(mapper)
    }

    if (Object.prototype.toString.call(config) === '[object Object]') {
        const { Component, key, props, children } = config

        return (
            <Component key={key} {...props}>
                {mapper(children)}
            </Component>
        )
    }

    if (Object.prototype.toString.call(config) === '[object String]') {
        return config
    }

    console.error(`Cant render node: ${JSON.stringify(config)}`)

    return null
}
