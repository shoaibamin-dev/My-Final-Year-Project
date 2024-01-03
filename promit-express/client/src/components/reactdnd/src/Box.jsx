import React from 'react'
const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}
export const Box = ({ title, yellow }) => {
  const backgroundColor = yellow ? '#e3f2fc' : 'white'
  return <div style={{ ...styles, backgroundColor }}>{title}</div>
}
