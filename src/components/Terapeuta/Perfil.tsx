import React from 'react'

export default function PerfilTerapeuta() {
  return (
    <div className="user-profile">
        <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt='logo'/>
            <h2>Ana</h2>
            <p>Terapia familiar</p>
        </div>
    </div>
  )
}
