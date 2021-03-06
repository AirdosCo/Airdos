/* eslint-disable no-console */
import _ from "lodash/fp"
import { ApolloError } from "apollo-client"
import React, { createContext, useContext, useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import { useSession } from "../hooks"
import type { User } from "../typings/api"

import { GET_USER_BY_TOKEN, GET_USER_BY_LOGIN } from "./CurrentUserQueries"

interface ICurrentUserState {
  loading: boolean
  error?: ApolloError
  called: boolean
  authError?: string
  currentUser?: User
  rememberCurrentUser: boolean
}

interface ICurrentUserEffects {
  getUserByToken: (queryProps: any) => void
  getUserByLogin: (queryProps: any) => void
  setCurrentUser: React.Dispatch<undefined>
  clearUser: () => void
  setRememberCurrentUser: React.Dispatch<boolean>
}

/* eslint-disable @typescript-eslint/no-unused-vars */

const initialState: [ICurrentUserState, ICurrentUserEffects] = [
  {
    loading: true,
    error: undefined,
    called: false,
    authError: undefined,
    currentUser: undefined,
    rememberCurrentUser: false,
  },
  {
    getUserByToken: (queryProps: any) => undefined,
    getUserByLogin: (queryProps: any) => undefined,
    setCurrentUser: () => undefined,
    clearUser: () => undefined,
    setRememberCurrentUser: () => undefined,
  },
]

/* eslint-enable @typescript-eslint/no-unused-vars */

export const CurrentUserContext = createContext(initialState)

CurrentUserContext.displayName = "CurrentUserContext"

export const useCurrentUserContext = () => useContext(CurrentUserContext)

// TODO: Have a cache do this. Or incognito. Use AWS-incognito!
// This awful. Should have this all in cache.
const CurrentUserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [rememberCurrentUser, setRememberCurrentUser] = useState(true)
  const [authError, setAuthError] = useState("")
  const [session, establishSession, removeSession] = useSession()

  const [
    getUserByToken,
    {
      loading: loadingTokenData,
      error: tokenError,
      called: tokenCalled,
      refetch: refetchToken,
    },
  ] = useLazyQuery(GET_USER_BY_TOKEN, {
    variables: {
      token: session,
    },
    onCompleted: (data) => {
      const user = _.get("getUserByToken", data)
      if (rememberCurrentUser) {
        establishSession(user.username)
      }

      setCurrentUser(user)
    },
  })
  const [
    getUserByLogin,
    {
      loading: loadingLoginData,
      error: loginError,
      called: loginCalled,
      refetch: refetchLogin,
    },
  ] = useLazyQuery(GET_USER_BY_LOGIN, {
    variables: {
      username: undefined,
      password: undefined,
    },
    onCompleted: (data) => {
      const user = _.get("getUserByLogin", data)
      if (rememberCurrentUser) {
        establishSession(user.username)
      }
      if (!user) {
        setAuthError("Your Password or username was incorrect")
      }
      setCurrentUser(user)
    },
  })

  const loading = loadingLoginData || loadingTokenData
  const error = tokenError || loginError
  const called = tokenCalled || loginCalled

  const contextData: [ICurrentUserState, ICurrentUserEffects] = [
    {
      currentUser,
      loading,
      error,
      called,
      authError,
      rememberCurrentUser,
    },
    {
      getUserByToken: tokenCalled ? refetchToken : getUserByToken,
      getUserByLogin: loginCalled ? refetchLogin : getUserByLogin,
      setCurrentUser,
      clearUser: () => {
        // todo: clear cache and stuff here in the future.
        removeSession()
        setCurrentUser(undefined)
      },
      setRememberCurrentUser,
    },
  ]

  // on mount get the user from the token
  useEffect(() => {
    if (!currentUser && session) {
      getUserByToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CurrentUserContext.Provider value={contextData}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export { CurrentUserProvider }
