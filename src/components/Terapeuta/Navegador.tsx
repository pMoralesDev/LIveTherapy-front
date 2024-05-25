import React from 'react'

export default function NavegadorTerapeuta() {
  return (
    <div className="nav">
        <button id="menu-btn">
            <span className="material-icons-sharp">menu</span>
        </button>
        <div className="dark-mode">
            <span className="material-icons-sharp active">light_mode</span>
            <span className="material-icons-sharp">dark_mode</span>
        </div>
        <div className="profile">
            <div className="info">
                <p>hola <b>Ana</b></p>
                <small className="text muted">Terapeuta</small>
            </div>
            <div className="profile-photo">
                <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt='logo'/>
            </div>
        </div>
    </div>
  )
}
