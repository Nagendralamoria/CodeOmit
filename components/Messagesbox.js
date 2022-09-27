import React from 'react'
import dashnav from '../styles/DashboardNavbar.module.css';
function Messagesbox(props) {
  return (
    <div className={dashnav.messagebody}>
      <h3>{props.email}</h3>
      <p>{props.msg}</p>
    </div>
  )
}

export default Messagesbox