"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, useMotion } from "@react-three/drei"
import Model from "./Model"
import { useEffect } from "react"
import { useMotionValue, useSpring } from "framer-motion"


const FloatingShapes = () => {


    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const smoothMouse = {
        x: useSpring(mouse.x, { stiffness: 400, damping: 100, mass: 3 }),
        y: useSpring(mouse.y, { stiffness: 400, damping: 100, mass: 3 })
    }

    const manageMouseMove = (e: any) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const x = clientX / innerWidth
        const y = clientY / innerHeight
        mouse.x.set(x)
        mouse.y.set(y)
    }

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove)
        return () => {
            window.removeEventListener("mousemove", manageMouseMove)
        }
    }, [])


    return (
        <>
            <div className="absolute top-0 left-0 z-10">
                {/* non-3D stuff goes here */}

                <div className=" w-full  flex flex-col justify-center p-24">
                    <h1 className=" w-full  text-2xl md:text-4xl p-4 px-16 bg-slate-500/50 text-slate-300 rounded-sm">
                        f l o a t i n g
                    </h1>
                    {/* <p className="text-2xl px-16 text-slate-500 italic">Move your mouse around</p> */}
                </div>

            </div>
            <Canvas className="absolute top-0 left-0 w-[100dvw] h-[100dvh] bg-slate-800" orthographic camera={{ position: [0, 0, 200], zoom: 100 }}>
                {/* 3D stuff goes here */}

                <Model mouse={smoothMouse} />
                <Environment preset="studio" />
            </Canvas>
        </>
    )
}
export default FloatingShapes