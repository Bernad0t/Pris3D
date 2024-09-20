import { CSSTransition } from "react-transition-group";
import"./MyDropList.css"

const duration = 300

export default function MyDropList({children, active}: {children: React.ReactNode, active: boolean}){
    return(
        <CSSTransition
            nodeRef={null}
            in={active}
            timeout={duration}
            classNames="my_drop_list-transition"
        >
            <div ref={null} className="my_drop_list-transition-exit-done">
                {children}
            </div>
        </CSSTransition>
    )
}