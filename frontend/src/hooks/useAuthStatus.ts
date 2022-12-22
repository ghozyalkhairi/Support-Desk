import { useState, useEffect } from "react"
import { useAppSelector } from "../app/hook"
import { selectAuth } from "../features/auth/authSlice"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const { user } = useAppSelector(selectAuth)
  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    }
    if (!user) {
      setLoggedIn(false)
    }
    setCheckingStatus(false)
  }, [user])

  return {
    loggedIn,
    checkingStatus,
  }
}
