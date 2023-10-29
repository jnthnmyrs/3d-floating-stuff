import { useGLTF, Float } from "@react-three/drei";
import {  useTransform } from "framer-motion";
import { motion } from "framer-motion-3d"


const Model = ({mouse}: {mouse: any}) => {

    // @ts-expect-error
    const { nodes } = useGLTF("/float_stuff.glb");

    return (
        <>
        <Float >
            <group>

            <Mesh node={nodes.Cube} mouse={mouse} multiplier={.7}/>
            <Mesh node={nodes.Cube001} mouse={mouse} multiplier={.5}/>
            <Mesh node={nodes.Cube002} mouse={mouse} multiplier={1} />
            <Mesh node={nodes.Cube003} mouse={mouse} multiplier={.8} />
            <Mesh node={nodes.Torus} mouse={mouse} multiplier={.3} />
            <Mesh node={nodes.Torus001} mouse={mouse} multiplier={1} />
            <Mesh node={nodes.Cone} mouse={mouse} multiplier={.2} />
            <Mesh node={nodes.Cylinder} mouse={mouse} multiplier={1} />
            <Mesh node={nodes.Cylinder001} mouse={mouse} multiplier={2} />
            </group>
        </Float>


        </>
    )
}

// @ts-expect-error
function Mesh({ node, mouse, multiplier }) {
    const {castShadow, receiveShadow, geometry, material, position, rotation, scale} = node

    const rotationX = useTransform(mouse.x, [0,1], [rotation.y - multiplier, rotation.y + multiplier])
    const rotationY = useTransform(mouse.y, [0,1], [rotation.y - multiplier, rotation.y + multiplier])

    const positionY = useTransform(mouse.y, [0,1], [position.y + multiplier, position.y - multiplier])
    const positionx = useTransform(mouse.x, [0,1], [position.x + multiplier, position.x - multiplier])

    return (
        <motion.mesh
        castShadow = {castShadow}
        receiveShadow = {receiveShadow}
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
        scale={scale}
        rotation-x={rotationY}
        rotation-y={rotationX}
        position-x={positionx}
        position-y={positionY}
      /> 
    )
}

export default Model

useGLTF.preload("/float_stuff.glb");