import React, {useState, useRef, useEffect} from "react"
import PropTypes from "prop-types"
import { useSpring, animated } from "@react-spring/web" 
import { useMediaQuery } from "react-responsive"
import Aside from "../components/aside"


const Shell = ({children, title, className, onScroll}) => {

    let [showMenu, setShowMenu] = useState(false)

    const isMobile = useMediaQuery({
        query: "(max-width: 640px)"
    })

    const props = useSpring({
        blur: showMenu && isMobile ? 6 : 0
    })

    const toggleMenu = (e, state) => {
        e.stopPropagation()
        setShowMenu(state)
    }

    return (
        <>
            <Aside showMenu={showMenu} setShowMenu={setShowMenu}/>
            <animated.div
                style={props}>
                <main onClick={e => toggleMenu(e, false)} className={`absolute z-0 top-0 left-0 md:left-96 right-0 bottom-0 flex flex-col overflow-y-scroll ${className}`}>
                    <header className="sticky px-3 bg-gray-50 py-1 md:py-2 top-0 right-0 grid grid-cols-3 w-full border-b bg-opacity-60 backdrop-filter backdrop-blur-lg">
                        <div className="flex flex-col justify-center items-center">
                            <button onClick={e => toggleMenu(e, !showMenu)} className="text-blue-500 md:invisible self-start flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Übersicht</span>
                            </button>
                        </div>
                        <div className="text-center p-1">
                            <h3 className="text-lg md:text-lg font-semibold self-center">
                                {title}
                            </h3>
                        </div>
                        <div>
                        </div>
                        {/* <button className="text-blue-500 md:invisible self-center flex flex-row">
                            <span>Übersicht</span>
                        </button> */}
                    </header>
                    {children}
                </main>
            </animated.div>
        </>
    )
}

Shell.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    className: PropTypes.string,
    onScroll: PropTypes.func,
    toggleMenu: PropTypes.func,
    showMenu: PropTypes.bool
}

export default Shell