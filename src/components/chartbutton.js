import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ChartButton({text,onclickhandler,btntype}) {
  const btnClasses = `outline-${btntype}`
  const customStyle = {
      padding:"2px",
      margin:"7px",
  }
  return (
    <Button variant={btnClasses} style ={customStyle} onClick={onclickhandler}>{text}</Button>
  )
}
