import React from 'react'
import "./tableManager.css"
import { Texture } from 'three'

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
}

export const TableManager: React.FC<typePropsTable> = ({counterTop, counterLegs, setCounterTop, setCounterLegs}) => {

    const resetTable = () => {
        setCounterTop(prev => ({
            ...prev,
            width: 100,
            height: 100,
            depth: 100,
            color: "#A44141",
            texture: "",
            repeatX: 1, 
            repeatY: 1, 
        }))
        setCounterLegs(prev => ({
            ...prev,
            size: 40,
            height: 50,
            color: "#000000",
            texture: "",
            repeatX: 1, 
            repeatY: 1,
        }))
    }


    const saveJSON = () => {
        const data = {
          counterTop,
          counterLegs,
        };
      
        const jsonString = JSON.stringify(data, null, 2);
      
        const blob = new Blob([jsonString], { type: 'application/json' });
      
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.json'; 
        link.click(); 
      };

      const handleFileUpload  = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string; 
        try {
          const jsonData = JSON.parse(text); 
          console.log(jsonData);
          setCounterTop(jsonData.counterTop)
          setCounterLegs(jsonData.counterLegs)
        } catch (error) {
          console.error('Ошибка при чтении JSON:', error);
        }
      };

      reader.readAsText(file);
    }
      }
    

  return (
    <div>
        <input type="file" accept='application/json' onChange={handleFileUpload }/>
        <div className='table-manager__btns'>
            <button className='table-manager__btn' onClick={()=> {}}>Snapeshot</button>
            <button className='table-manager__btn' onClick={resetTable}>New table</button>
            <button  className='table-manager__btn save' onClick={saveJSON}>Save</button>
        </div>
    </div>
  )
}