import React from 'react'
import NewsSendBox from '../NewsSendBox'

export default function Nopermission() {
  return (
    <NewsSendBox children={
    <div> 403 Nopermission</div>
    }>
    </NewsSendBox>
  )
}
