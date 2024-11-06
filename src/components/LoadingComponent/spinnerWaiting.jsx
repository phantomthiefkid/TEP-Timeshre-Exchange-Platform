import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const SpinnerWaiting = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <ThreeCircles
                height="80"
                width="80"
                radius="9"
                color="#4EB09B"
                ariaLabel="loading"
            />
        </div>
    )
}

export default SpinnerWaiting