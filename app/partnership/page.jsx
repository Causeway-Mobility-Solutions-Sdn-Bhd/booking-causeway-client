import React from 'react'
import SideBar from '../_components/SideBar'
import Nav from '@/components/custom/Nav'
import BottomBar from '../_components/BottomBar'

function page() {
  return (
     <div className="relative">
      <Nav isMain={false} value="Partnership" />
      <SideBar />
      {/* Partnership Should Come here */}
      <BottomBar page="Chat" />
    </div>
  )
}

export default page