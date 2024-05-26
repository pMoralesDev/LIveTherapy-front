import React from 'react'

export default function SidebarTerapeuta() {
  return (
    <aside>
            <div className="toggle">
                <div className="logo">
                    <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt='logo'/>
                    <h2>Morales<span className="danger">Dev</span></h2>
                </div>
                <div className="close" id="close-btn">
                    <span className="material-icons-sharp">close</span>
                </div>
            </div>
            <div className="slidebar">
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">dashboard</span>
                    <h3>Inicio</h3>
                </a>
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">person</span>
                    <h3>Pacientes</h3>
                </a>
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">receipt</span>
                    <h3>Informes</h3>
                </a>
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">mail</span>
                    <h3>Mensjes</h3>
                    <span className="message-count">4</span>
                </a>
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">inventory</span>
                    <h3>Citas</h3>
                </a>
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">report</span>
                    <h3>Reportes</h3>
                </a>
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">settings</span>
                    <h3>Ajustes</h3>
                </a>
                <a href="https://github.com/pMoralesDev">
                    <span className="material-icons-sharp">logout</span>
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>
  )
}
