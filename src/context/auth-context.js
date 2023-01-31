/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import * as React from "react"
import * as auth from "../utils/auth-provider"
import {useAsync} from "../utils/hooks";
import {apiClient} from "../utils/api-client";
import {FullPageErrorFallback, FullPageSpinner} from "../components/lib";

const AuthContext = React.createContext(null)
AuthContext.displayName = "AuthContext"

function AuthProvider(props) {
    const {data, status, error, isLoading, isError, isSuccess, isIdle, run, setData} = useAsync()
    console.log({
        data,
        isIdle,
        isLoading,
        isSuccess,
        status
    })

    // React.useEffect(() => {
    //     console.log("loop?")
    //     run(new Promise((res, rsj) => res("")))
    // }, [run])


    const login = (form) => auth.login(form).then((res) => setData(res.data))
    const register = (form) => auth.register(form).then((res) => setData(res.data))
    const logout = () => console.log("logged out")



    const value = {
        data,
        login,
        register,
        logout
    }


    if (isLoading) {
        return <FullPageSpinner/>
    }

    if (isError) {
        return <FullPageErrorFallback error={error}/>
    }

    // if (isSuccess) {
    return <AuthContext.Provider value={value} {...props}/>
    // }

    // throw new Error(`Unhandled status: ${status}`)
}

function useAuthContext() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

function useApiClient() {
    const {data: {data}} = useAuthContext()
    const token = data?.access
    return (endpoint, config) => apiClient(endpoint, {...config, token})
}


export {AuthProvider, useAuthContext, useApiClient}