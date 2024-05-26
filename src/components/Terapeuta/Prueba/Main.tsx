import React from 'react'
import AnaliticasTerapeuta from './Analiticas'
import UsuariosTerapeuta from './Usuarios'
import TablaTerapeuta from './Tabla'


export default function MainTerpeuta() {
  return (
    <main>
            <h1>Citas</h1>
            <AnaliticasTerapeuta/>
            <UsuariosTerapeuta/>
            <TablaTerapeuta/>
        </main>
  )
}
