import React, { Suspense, useState } from "react"
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Table } from "./components/table/Table"; 
import { ControlPanel } from "./components/controlPanel/ControlPanel"; 

import './App.css'
import { RepeatWrapping, Texture, TextureLoader } from "three";
// import { ScreenTable } from "./componenets/screenTable/ScreenTable";

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

const App: React.FC = () => {
  const [counterTop, setCounterTop] = useState<typeCounterTop>({
    width: 100,
    height: 100,
    depth: 100,
    color: "#A44141",
    texture: "",
    repeatX: 1,
    repeatY: 1,
  })
  const [counterLegs, setCounterLegs] = useState<typeCounterLegs>({
    style: "square",
    size: 40,
    height: 50,
    color: "#000000",
    texture: "",
    repeatX: 1,
    repeatY: 1,
  })

  const handleCounterTopTextureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const loader = new TextureLoader();
      const url = URL.createObjectURL(file);
      loader.load(
        url,
        (loadedTexture) => {
          loadedTexture.wrapS = loadedTexture.wrapT = RepeatWrapping;
          loadedTexture.repeat.set(counterTop.repeatX, counterTop.repeatY);
          setCounterTop((prev) => ({
            ...prev,
            texture: loadedTexture, 
          }));
        },
        undefined,
        (error) => console.error("Ошибка загрузки текстуры:", error)
      );
    }
  };

  const handleCounterLegsTextureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const loader = new TextureLoader();
      const url = URL.createObjectURL(file);
      loader.load(
        url,
        (loadedTexture) => {
          loadedTexture.wrapS = loadedTexture.wrapT = RepeatWrapping;
          loadedTexture.repeat.set(counterTop.repeatX, counterTop.repeatY);
          setCounterLegs((prev) => ({
            ...prev,
            texture: loadedTexture,
          }));
        },
        undefined,
        (error) => console.error("Ошибка загрузки текстуры:", error)
      );
    }
  };

  return (
    <div className="wrapper">
      {/* <ScreenTable /> */}
      <Canvas camera={{ position: [0, 50, 50], fov: 75 }}>
        <ambientLight intensity={2.5} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Table counterTop={counterTop} counterLegs={counterLegs}/>
        </Suspense>
      </Canvas>
      <ControlPanel 
        handleCounterTopTextureUpload={handleCounterTopTextureUpload} 
        handleCounterLegsTextureUpload={handleCounterLegsTextureUpload} 
        counterTop={counterTop} 
        counterLegs={counterLegs} 
        setCounterTop={setCounterTop} 
        setCounterLegs={setCounterLegs}
      />
    </div>
  )
}

export default App
