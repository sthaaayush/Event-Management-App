import React from 'react'

export default function Alert({message, type}) {
    return (
        <div>
            {
                message &&
                <div class={`alert alert-${type}`} role="alert">
                    {message}
                </div>
            }
        </div>
    )
}
