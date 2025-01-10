import React from 'react'
import "./controlPanel.css"
import { Texture } from 'three'
import { TableTop } from '../tableTop/TableTop'
import { TableLegs } from '../tableLegs/TableLegs'
import { TableManager } from '../tableManager/TableManager'

type typeCounterTop = {
    width: number,
    height: number,
    depth: number,
    color: string,
    texture: string | Texture,
    repeatX: number, 
    repeatY: number, 
  }
  
  type typeCounterLegs = {
    style: string,
    size: number,
    height: number,
    color: string,
    texture: string | Texture,
    repeatX: number, 
    repeatY: number, 
  }

  type typePropsTable = {
    counterTop:typeCounterTop,
    counterLegs: typeCounterLegs,
    setCounterTop: React.Dispatch<React.SetStateAction<typeCounterTop>>,
    setCounterLegs:React.Dispatch<React.SetStateAction<typeCounterLegs>>,
    handleCounterTopTextureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleCounterLegsTextureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void,
  }

export const ControlPanel: React.FC<typePropsTable> = ({handleCounterTopTextureUpload, handleCounterLegsTextureUpload, counterTop, counterLegs, setCounterLegs, setCounterTop}) => {
  return (
    <div className='control-panel'>
      <div className='control-panel__groupe'>
        <TableTop handleCounterTopTextureUpload={handleCounterTopTextureUpload} counterTop={counterTop} setCounterTop={setCounterTop}/>
        <TableLegs counterLegs={counterLegs} setCounterLegs={setCounterLegs} handleCounterLegsTextureUpload={handleCounterLegsTextureUpload}/>
      </div>
      <TableManager counterTop={counterTop} counterLegs={counterLegs} setCounterTop={setCounterTop} setCounterLegs={setCounterLegs}/>
    </div>
  )
}
