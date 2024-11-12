import {useEffect, useState} from "react";
import Loader from "../components/Loader.jsx";
import {Stack} from "@mui/system";
import Button from "../components/Button.jsx";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, []);

    return (
        <Stack sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        }}>
            {isLoading && <Loader/>}

            <Button>Start</Button>
        </Stack>
    )
}

export default Home;