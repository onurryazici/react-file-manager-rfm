import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

const test = () => {
    const myCounter = useSelector(state => state.counter)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>{myCounter}</h1>
            <Button
                value="Increase Counter"
                onClick={() => dispatch({ type: "INCREASE_COUNTER" })}
            />
            <Button
                value="Decrease Counter"
                onClick={() => dispatch({ type: "DECREASE_COUNTER" })}
            />
        </div>
    )
}
export default test;