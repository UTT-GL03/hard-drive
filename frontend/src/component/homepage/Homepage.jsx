import { useState } from 'react'
import Headings from '../heading/Headings'
import SideBar from '../sidebar/Sidebar'
import './Homepage.scss'
import Table from '../table/Table'

export default function Homepage() {
  const [count, setCount] = useState(0)

  return (
    <div className="wrapper-homepage">
      <div className="headings">
        <Headings />
      </div>
      <div className="sidebar">
        <SideBar/>
      </div>
      <div className="main-content">
        <Table />
      </div>
    </div>
  )
}
