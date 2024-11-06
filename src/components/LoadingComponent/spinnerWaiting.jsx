import React from 'react'
import { DNA } from 'react-loader-spinner'

const SpinnerWaiting = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
            }}
        >
             <DNA
                height="100"
                width="100"
                radius="9"
                color="#649CFD"
                ariaLabel="loading"
            />
        </div>
    )
}

export default SpinnerWaiting