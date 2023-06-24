import { useState } from "react"

export const useField = (type, valuep = '') => {
    const [value, setValue] = useState(valuep)
    const [required, setRequired] = useState(true)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        required,
        onChange,
        reset,
    }
}