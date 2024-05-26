import React from 'react'

export default function UsuariosTerapeuta() {
  return (
    <div className="new-users">
        <h2>Pacientes</h2>
        <div className="user-list">
            <div className="user">
                <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt='logo'/>
                <h2>Megan</h2>
                <p>3.5 hours ago</p>
            </div>
            <div className="user">
                <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt='logo'/>
                <h2>Rick</h2>
                <p>1 day ago</p>
            </div>
            <div className="user">
                <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt='logo'/>
                <h2>Paul</h2>
                <p>5 days ago</p>
            </div>
            <div className="user">
                <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt='logo'/>
                <h2>New</h2>
                <p>Agregar pacietne</p>
            </div>
        </div>
    </div>
  )
}
