import React from 'react'
import { Button } from './ui/button'
import useLogout from '@/hooks/useLogout'

const LogoutButton = () => {

    const {logout} = useLogout();

  return (
    <Button onClick={logout}  >
        Cerrar Sesion
    </Button>
  )
}

export default LogoutButton
