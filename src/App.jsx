import {createRef, useEffect, useState} from 'react'
import './App.css'
import init from "./test.js";


function App() {
    const [count, setCount] = useState(0);

    const canvasRef = createRef();
    const kaplayRef = createRef();

    useEffect(() => {
        if(canvasRef.current){
            kaplayRef.current = init({
                canvas: canvasRef.current
            });
        }
    }, []);

    return (
        <>
            Hello
            <canvas ref={canvasRef} width={500} height={500}/>
        </>
    )
}

export default App
