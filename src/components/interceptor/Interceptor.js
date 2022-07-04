import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Interceptor=()=> {
    const [loginState,setloginState] = useState
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')===null) {
            setloginState(false)
        } else {
            setloginState(true)
        }
    }, [])
}
export default Interceptor