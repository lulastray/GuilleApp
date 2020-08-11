import React from "react"


<Button color="primary"><p>Hola</p></Button>

const Button = props => {


    const getClassName = props => {
        let className = "mt-big "
        const {color, margin} = props
        switch(color) {
            case "primary":
                className += "c-primary "
                return
            case "secondary":
                className += "c-secondary "
                return
        }
        switch(margin) {
            case "large":
                className += "mc-large "
                return
            case "small":
                className += "mc-small "
                return
        }
        console.log(className)
        return className
    }

    return(
    <button className={getClassName(props) }>{props.children}</button>
    )
}