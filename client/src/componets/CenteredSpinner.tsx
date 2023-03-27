import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function CenteredSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner />
    </div>
  )
}
