import {createRef, useEffect, useState} from 'react'
import './App.css'
import init from "./test.js";
import {Box} from "@mui/system";


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
        <Box>
            Hello
            <canvas ref={canvasRef} width={1000} height={500}/>
        </Box>
    )
}

export default App
