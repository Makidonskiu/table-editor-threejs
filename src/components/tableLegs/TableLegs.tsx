import { ColorPicker, InputNumber, Select } from 'antd'
import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { Texture } from 'three'

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
    counterLegs: typeCounterLegs,
    setCounterLegs: React.Dispatch<React.SetStateAction<typeCounterLegs>>,
    handleCounterLegsTextureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const TableLegs: React.FC<typePropsTable> = ({counterLegs, setCounterLegs, handleCounterLegsTextureUpload}) => {

    const handleCounterLegsChange = (key: keyof typeCounterLegs, value: number | null) => {
      if (value !== null) {
        setCounterLegs((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    };

    const handleChange = (value: string) => {
      if (value !== null) {
        setCounterLegs((prev) => ({
          ...prev,
          style: value,
        }));
      }
    };

    const debouncedSetCounterLegs = useCallback(
        debounce((color: string) => {
          setCounterLegs((prev) => ({
            ...prev,
            color,
          }));
        }, 10), 
        []
      );
    
      const rgbToHex = (r: number, g: number, b: number) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
      
      const handleColorChange = (value: any) => {        
        const { r, g, b } = value.metaColor;    
        const hexColor = rgbToHex(r, g, b);    
        debouncedSetCounterLegs(hexColor);
      };

  return (
    <>
      <h2>Table Legs</h2>
      <form className='control-panel__form'>
          <label>
              Legs style
              <Select
                defaultValue="square"
                style={{ width: 120 }}
                onChange={value => handleChange(value)}
                options={[
                  { value: 'round', label: 'Round' },
                  { value: 'square', label: 'Square' },
                ]}
              />
          </label>
          <label>
              Size
              <InputNumber style={{width: "100%"}} min={40} max={500} value={counterLegs.size} onChange={value => handleCounterLegsChange('size', value)} />
          </label>
          <label>
              Height
              <InputNumber style={{width: "100%"}} min={40} max={1000} value={counterLegs.height} onChange={value => handleCounterLegsChange('height', value)} />
          </label>
          <label className='control-panel__color-picker'>
              Color
              <ColorPicker value={counterLegs.color} onChange={(value) => handleColorChange(value)}/>
          </label>
          <div className='control-panel__input-groupe'>
            <label className='control-panel__texture'>
              Texture
              <input type="file" accept="image/*" onChange={handleCounterLegsTextureUpload} />
            </label>
            <label className='control-panel__repeat repeat-x'>
              repeatX
              <InputNumber style={{width: 50}} min={1} max={10} value={counterLegs.repeatX} onChange={value => handleCounterLegsChange('repeatX', value)} />
            </label>
            <label className='control-panel__repeat'>
              repeatY
              <InputNumber style={{width: 50}} min={1} max={10} value={counterLegs.repeatY} onChange={value => handleCounterLegsChange('repeatY', value)} />
            </label>
          </div>
      </form>
    </>
  )
}
