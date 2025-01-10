import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, Texture } from "three";

type typeCounterTop = {
  width: number;
  height: number;
  depth: number;
  color: string;
  texture: string | Texture;
  repeatX: number;
  repeatY: number;
};

type typeCounterLegs = {
  style: string;
  size: number;
  height: number;
  color: string;
  texture: string | Texture;
  repeatX: number;
  repeatY: number;
};

interface iPropsTable {
  counterTop: typeCounterTop;
  counterLegs: typeCounterLegs;
}

export const Table: React.FC<iPropsTable> = ({ counterTop, counterLegs }) => {
  const gltf = useGLTF(counterLegs.style === "square" ? "/table-editor-threejs/model/table_square.gltf" : "/table-editor-threejs/model/table_round.gltf");
  const { scene, materials } = gltf;
console.log(materials);

  
  
  useEffect(() => {
    if (!scene || !materials) return;

    const tableMaterial = materials["Table"] as MeshStandardMaterial;
    const legMaterial = materials["Legs"] as MeshStandardMaterial;

    if (tableMaterial) {
      if (counterTop.texture instanceof Texture) {
        tableMaterial.map = counterTop.texture;
        tableMaterial.map.wrapS = tableMaterial.map.wrapT = 1000;
        tableMaterial.map.repeat.set(counterTop.repeatX, counterTop.repeatY);
      } else {
        tableMaterial.map = null;
      }
      tableMaterial.color.set(counterTop.color);
      tableMaterial.needsUpdate = true;
    }

    if (legMaterial) {
      if (counterLegs.texture instanceof Texture) {
        legMaterial.map = counterLegs.texture;
        legMaterial.map.wrapS = legMaterial.map.wrapT = 1000;
        legMaterial.map.repeat.set(counterLegs.repeatX, counterLegs.repeatY);
      } else {
        legMaterial.map = null;
      }
      legMaterial.color.set(counterLegs.color);
      legMaterial.needsUpdate = true;
    }
  }, [scene, materials, counterTop, counterLegs]);

  if (!scene) {
    return null;
  }

  useEffect(() => {
    if (scene) {
      const node0 = scene.children.find((child) => child.name === "Node0");
      if (node0) {
        const tabletop = node0.children[0]; 
        const legs = [node0.children[1], node0.children[2], node0.children[3], node0.children[4]]; 
  
        console.log("Legs:", legs);
        console.log("Tabletop:", tabletop);
        node0.scale.set(counterTop.width / 100, counterTop.height / 100, counterTop.depth / 100)
        // legs[0].scale.set(counterLegs.size / 100, counterLegs.height / 100, counterLegs.size / 100)
      }
    }
  }, [scene, counterLegs]);

  return (
    <primitive
      object={scene}
      scale={[counterTop.width / 10, counterTop.height / 10, counterTop.depth / 10]}
    />
  );
};


