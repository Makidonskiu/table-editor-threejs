import React, { useCallback } from 'react'
import { ColorPicker, InputNumber } from 'antd';
import { Texture } from 'three';
import { debounce } from 'lodash';

type typeCounterTop = {
    width: number,
    height: number,
    depth: number,
    color: string,
    texture: string | Texture,
    repeatX: number, 
    repeatY: number, 
  }

type typePropsTable = {
    counterTop : typeCounterTop,
    handleCounterTopTextureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setCounterTop: React.Dispatch<React.SetStateAction<typeCounterTop>>,
}

export const TableTop: React.FC<typePropsTable> = ({counterTop, handleCounterTopTextureUpload, setCounterTop}) => {

  const debouncedSetCounterTop = useCallback(
    debounce((color: string) => {
      setCounterTop((prev) => ({
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
    debouncedSetCounterTop(hexColor);
  };

    const handleCounterTopChange = (key: keyof typeCounterTop, value: number | null) => {
      if (value !== null) {
        setCounterTop((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    };

  return (
    <>
    <h2>Table Top</h2>
      <form className='control-panel__form'>
          <label>
              Width
              <InputNumber style={{width: "100%"}} min={100} max={2000} value={counterTop.width} onChange={value => handleCounterTopChange('width', value)} />
          </label>
          <label>
              Height
              <InputNumber style={{width: "100%"}} min={100} max={2000} value={counterTop.height} onChange={value => handleCounterTopChange('height', value)} />
          </label>
          <label>
              Depth
              <InputNumber style={{width: "100%"}} min={40} max={2000} value={counterTop.depth} onChange={value => handleCounterTopChange('depth', value)} />
          </label>
          <label className='control-panel__color-picker'>
              Color
              <ColorPicker value={counterTop.color} onChange={(value) => handleColorChange(value)}/>
          </label>
            <div className='control-panel__input-groupe'>
              <label className='control-panel__texture'>
                Texture
                <input type="file" accept="image/*" onChange={handleCounterTopTextureUpload} />
              </label>
              <label className='control-panel__repeat repeat-x'>
                repeatX
                <InputNumber style={{width: 50}} min={1} max={10} value={counterTop.repeatX} onChange={value => handleCounterTopChange('repeatX', value)} />
              </label>
              <label className='control-panel__repeat'>
                repeatY
                <InputNumber style={{width: 50}} min={1} max={10} value={counterTop.repeatY} onChange={value => handleCounterTopChange('repeatY', value)} />
              </label>
            </div>
      </form></>
  )
}
