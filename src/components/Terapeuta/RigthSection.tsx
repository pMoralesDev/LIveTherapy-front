import React from 'react'
import NavegadorTerapeuta from './Navegador'
import PerfilTerapeuta from './Perfil'
import ProximasCitasTerapeuta from './ProximasCitas'

export default function RigthSection() {
  return (
    <div className="right-section">
            <NavegadorTerapeuta/>
            <PerfilTerapeuta/>
            <ProximasCitasTerapeuta/>
    </div>
  )
}
