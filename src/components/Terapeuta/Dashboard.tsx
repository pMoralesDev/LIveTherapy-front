import React from 'react'
import SidebarTerapeuta from './Sidebar'
import MainTerpeuta from './Main'
import RigthSection from './RigthSection'
import '../../styles/terapeutasPage.css'

export default function DashboardTerapeuta() {
  return (
    <div className="container">
        <SidebarTerapeuta/>
        <MainTerpeuta/>
        <RigthSection/>
    </div>
  )
}
