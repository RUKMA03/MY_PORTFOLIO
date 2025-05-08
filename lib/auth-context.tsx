"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  email: string
  name?: string
  isAuthorized: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, otp: string) => Promise<boolean>
  logout: () => void
  sendOtp: (email: string) => Promise<boolean>
  isLoading: boolean
  isAuthorized: boolean
}

const AUTHORIZED_EMAIL = "petsoksy@gmail.com"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("portfolio_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({
          ...parsedUser,
          isAuthorized: parsedUser.email === AUTHORIZED_EMAIL,
        })
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("portfolio_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, otp: string): Promise<boolean> => {
    // In a real application, you would verify the OTP with your backend
    // For this demo, we'll simulate a successful login if the email is correct
    if (email === AUTHORIZED_EMAIL && otp === "123456") {
      const newUser = {
        email,
        isAuthorized: true,
      }
      setUser(newUser)
      localStorage.setItem("portfolio_user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("portfolio_user")
  }

  const sendOtp = async (email: string): Promise<boolean> => {
    // In a real application, you would send an OTP to the user's email
    // For this demo, we'll simulate a successful OTP send
    return email === AUTHORIZED_EMAIL
  }

  const isAuthorized = user?.isAuthorized || false

  return (
    <AuthContext.Provider value={{ user, login, logout, sendOtp, isLoading, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
