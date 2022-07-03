import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Interceptor({children}) {
    const navigate = useNavigate()
    return (
        localStorage.getItem('token')==='true'?children:navigate('/login')
    )
}
export default Interceptor