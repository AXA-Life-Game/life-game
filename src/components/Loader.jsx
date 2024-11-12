import LogoSolid from '../assets/logo-solid.svg?react';
import LogoText from '../assets/logo-text.svg?react';
import Spinner from '../assets/Spinner.svg?react';
import {Box} from "@mui/system";
import {useSpring, animated} from "@react-spring/web";

const AnimatedSpinner = animated(Spinner);

const Loader = ({}) => {
    const style = useSpring({
        from: {
            transform: 'rotateZ(0deg)'
        },
        to: {
            transform: 'rotateZ(360deg)'
        },
        config: {
            duration: 1000,
        },
        loop: true
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: 64
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 4
            }}>
                <LogoSolid/>
                <LogoText/>
            </Box>
            <AnimatedSpinner style={style}/>
        </Box>
    )
}

export default Loader;