import React, { memo } from 'react'

const Header = () => {
    return (
        <div className='header'>
            <h1>Welcome to my Todo App</h1>
        </div>
    )
}

export default memo(Header)