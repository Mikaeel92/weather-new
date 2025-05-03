import { useState } from "react"

function useLocalStorage (key, initialValue) {
    const saved = localStorage.getItem(key)
    const firsValue = saved ? JSON.parse(saved) : initialValue

    const [value, setValue] = useState(firsValue)

    const save = (newValue) => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [value, save]
}

export default useLocalStorage

