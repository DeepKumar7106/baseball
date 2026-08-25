import { createContext, useContext, useEffect, useState } from "react";

// create the context 
const AuthContext = createContext(null)

// create the provider
export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null)
    const [ token, setToken ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    // fetching the data from the localStorage on refresh or first load
    useEffect(() => {
        
        try {
            const savedToken = localStorage.getItem('token')
            const savedUser = localStorage.getItem('user')

            if (savedToken && savedUser) {
                setToken(savedToken)
                setUser(JSON.parse(savedUser))
            }
        } catch (error) {
            console.error("Error fetching through localstorage", error)
            // if any error during the fetch , remove the item 
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        } finally {
            setLoading(false)
        }
    }, [])
    
    // login handler 
    const login = (token, userData) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        
        setToken(token)
        setUser(userData)    
    }
    
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        setToken(null)
        setUser(null)    
    }

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <div>Loading session...</div> : children}
        </AuthContext.Provider>
    )
}

// custom hook to use context
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Invalid usage of useAuth')
    }

    return context
}