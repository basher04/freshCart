import React from 'react'
import errorLogo from "../../assets/images/error.svg"

export default function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={errorLogo} className='mt-5' alt="" />
    </div>
  )
}
