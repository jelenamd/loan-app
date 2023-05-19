import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Calculator from "@components/loanCalc"

const App = () => (
    <div className="w-full h-full flex justify-center items-center bg-gray-200">
        <div className="text-md text-blue-800 mt-1 flex-col absolute top-1">
            Let's plan your <b>loan</b>!
        </div>
        <div className="w-140 h-127.75 flex justify-center bg-white border-gray-100 rounded-md">
            <Calculator />
        </div>
    </div>
)
ReactDOM.render(<App />, document.getElementById("root"))
