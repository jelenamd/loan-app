import React, { useEffect, useState } from "react"
import products from "../../assets/products.json"

type State = {
    amount: number
    period: number
    result: number
    errorMessage: string
}
const Calculator = () => {
    const [state, setState] = useState({
        amount: 1000,
        period: 6,
        result: 500,
        maxAmount: 0,
        minAmount: 0,
        id: 1,
        errorMessage: "",
    })

    const getProduct = () => {
        return products[`${state.id}`]
    }

    const changeProduct = (id: number) => {
        state.id = id
        state.errorMessage = ""
        const product = getProduct()
        setState({
            ...state,
            maxAmount: product.max_amount,
            minAmount: product.min_amount,
            amount: product.min_amount,
        })
    }
    useEffect(() => {
        const product = products[`${state.id}`]

        state.maxAmount = product.max_amount
        state.minAmount = product.min_amount

        calc()
    }, [state.period, state.amount])
    const calc = () => {
        setState({
            ...state,
            result: Number((state.amount / state.period).toFixed(2)),
        })
    }

    const incrementMonth = () => {
        if (state.period >= products[`${state.id}`].max_tenure) return
        setState({
            ...state,
            period: state.period + 1,
        })
    }

    const decrementMonth = () => {
        if (state.period <= products[`${state.id}`].min_tenure) return
        setState({
            ...state,
            period: state.period - 1,
        })
    }
    const getStartDate = (): string => {
        const currentDate = new Date()
        const startDate = new Date()

        startDate.setMonth(currentDate.getMonth() + state.period)
        const formattedDate: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        }

        return startDate.toLocaleDateString(undefined, formattedDate)
    }

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(state.amount)

    const formattedResult = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(state.result)

    const formattedTotalAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(state.amount * (1 + products[`${state.id}`].interest))

    return (
        <div>
            <div className="w-65.5 h-21.5 flex flex-row justify-center m-auto mt-1">
                <button onMouseDown={() => changeProduct(1)}>
                    <div className="bg-car w-21.5 h-21.5  bg-no-repeat hover:scale-110"></div>
                </button>
                <button onMouseDown={() => changeProduct(2)}>
                    <div className="bg-house  w-21.5 h-18.5 bg-no-repeat hover:scale-110"></div>
                </button>
                <button onMouseDown={() => changeProduct(3)}>
                    <div className="bg-dollar w-17.5 h-17.5 bg-no-repeat hover:scale-110"></div>
                </button>
            </div>
            <div className="w-full flex flex-row px-8 gap-4.5 ml-1 mt-1">
                <div>
                    <form>
                        <label>Loan amount</label>
                        <div className="relative">
                            <span className="text-xl font-bold absolute left-1.375 top-1.563">
                                $
                            </span>
                            <input
                                className="border-2 text-2xl font-bold border-gray-100  mt-0.375 w-full pl-2.5 rounded-md py-1 outline-none"
                                type="text"
                                min={state.minAmount}
                                max={state.maxAmount}
                                placeholder="amount"
                                value={state.amount}
                                onChange={(e) => {
                                    let amount = parseFloat(e.target.value)

                                    if (isNaN(amount)) {
                                        amount = state.minAmount

                                        setState({
                                            ...state,
                                            amount: amount,
                                            errorMessage:
                                                "Amount must be greater than " + state.minAmount,
                                        })

                                        return
                                    }
                                    if (amount < state.minAmount) {
                                        setState({
                                            ...state,
                                            amount: amount,
                                            errorMessage:
                                                "Amount must be greater than " + state.minAmount,
                                        })
                                        return
                                    } else if (amount > state.maxAmount) {
                                        amount = state.maxAmount

                                        setState({
                                            ...state,
                                            amount: amount,
                                            errorMessage: "Max amount is " + state.maxAmount,
                                        })

                                        return
                                    }
                                    setState({
                                        ...state,
                                        amount: amount,
                                        errorMessage: " ",
                                    })

                                    setState({
                                        ...state,
                                        amount: amount,
                                        errorMessage: "",
                                    })
                                }}></input>
                            {state.errorMessage && (
                                <p className="text-red-500 text-xs">{state.errorMessage}</p>
                            )}
                        </div>
                    </form>
                </div>

                <div>
                    <form>
                        <label>Number of Months</label>
                        <div className="w-full relative">
                            <div
                                onClick={() => decrementMonth()}
                                className="absolute top-1.375 left-1 cursor-pointer text-xl bold text-gray-500">
                                {" "}
                                &#60;{" "}
                            </div>
                            <div
                                onClick={() => incrementMonth()}
                                className="absolute top-1.375 right-1 cursor-pointer text-xl bold text-gray-500">
                                {" "}
                                &#62;{" "}
                            </div>
                            <input
                                className="border-2 text-center border-gray-100  w-full  pl-1  mt-0.375 rounded-md py-1 outline-none"
                                type="text"
                                min={products[`${state.id}`].min_tenure}
                                max={products[`${state.id}`].max_tenure}
                                value={state.period}></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className=" flex-auto   border-gray-100 border-2 flex flex-col ">
                <div className="w-full py-1.563 flex flex-row justify-between p-1.563  items-center">
                    <p>Your monthly amount is </p>
                    <p className="font-bold text-4xl text-blue-600">{formattedResult}</p>
                </div>
                <div className="w-full  bg-gray-100 p-1.563">
                    <p>
                        You’re planning <b>{state.period}</b> monthly deposits to reach your{" "}
                        <b>{formattedAmount}</b> goal by <b>{getStartDate()}</b>. The total amount
                        loaned will be <b>{formattedTotalAmount}</b>
                    </p>
                </div>
            </div>
            <button className="w-95 rounded-xl text-xl bg-blue-800 font-bold mx-auto text-white  block py-1 mt-0.5">
                Apply now
            </button>
        </div>
    )
}

export default Calculator
