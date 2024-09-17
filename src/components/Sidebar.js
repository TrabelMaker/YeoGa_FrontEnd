import React, { Children, useEffect, useRef, useState } from "react";
import styles from "../styles/sidebar.module.css"
import { within } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

const Sidebar = ({ width=280, Children}) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef();

    //버튼 클릭 토글
    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
        }else {
            setX(-width);
            setOpen(false);
        }
    };

    //다른곳 클릭시 닫힘
    const handleClose = async e => {
        let sideArea = side.current;
        let sideChildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideChildren))
        {
            await setX(-width);
            await setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClose);
        return() => {
            window.removeEventListener('click', handleClose);
        };
    })

    return (
        <div className={styles.container}>
            <div ref={side} className={styles.sidebar} style={{ width: '${width}px', height: '100%', transform: 'translatex(${-xPosition}px'}}>
                <button onClick={()=> toggleMenu()}
                className={styles.button}>
                { isOpen ?
                <span>X</span> : <img src = "images/avatar.png" alr="contact open button" className={styles.openBtn}></img>
                }
                </button>

                <div className={styles.content}>{Children}</div>
            </div>
        </div>
    )
}

export default Sidebar;