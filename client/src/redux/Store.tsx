import React from 'react'
type AppState = {
  userInfo?: any
}

const initialState: AppState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
}

type Action = { type: 'USER_SIGNIN'; payload: any } | { type: 'USER_SIGNOUT' }

function userInfoReducer(state: any, action: Action) {
  switch (action.type) {
    case 'USER_SIGNIN':
      return action.payload
    case 'USER_SIGNOUT':
      return undefined
    default:
      return state
  }
}

function rootReducer(state: AppState, action: Action) {
  return {
    userInfo: userInfoReducer(state.userInfo, action),
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function useAppState() {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    rootReducer,
    initialState
  )
  return { state, dispatch }
}

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const store = useAppState()
  return <Store.Provider value={store} {...props} />
}

export { Store, StoreProvider }
