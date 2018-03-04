import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  const actionGood = {
    type: 'GOOD'
  }
  const actionOk = {
    type: 'OK'
  }
  const actionBad = {
    type: 'BAD'
  }
  const actionZero = {
    type: 'ZERO'
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  it('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  it('many increases', () => {

    const state = initialState

    deepFreeze(state)
    const newState1 = counterReducer(state, actionBad)
    const newState2 = counterReducer(newState1, actionGood)
    const newState3 = counterReducer(newState2, actionGood)
    const newState4 = counterReducer(newState3, actionOk)

    expect(newState4).toEqual({
      good: 2,
      ok: 1,
      bad: 1
    })

  })

  it('zero works', () => {
    const state = {
      good: 7,
      ok: 4,
      bad: 2
    }

    deepFreeze(state)
    const newState = counterReducer(state, actionZero)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })

  })





})
