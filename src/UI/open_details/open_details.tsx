import style from "./open_details.module.css"
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    transform: "rotate(315deg)",
};

const transitionStyles = {
    entering: { transform: "rotate(405deg)" },
    entered: { transform: "rotate(405deg)" },
    exiting: { transform: "rotate(315deg)" },
    exited: { transform: "rotate(315deg)" },
};

export default function OpenDetails({active}: {active: boolean}){
    return(
        <Transition
            in={active}
            timeout={duration}
        >
            {(state) => 
                (<div style={{...defaultStyle, ...transitionStyles[state],}}className={style.open}></div>)
            }
        </Transition>
    )
}