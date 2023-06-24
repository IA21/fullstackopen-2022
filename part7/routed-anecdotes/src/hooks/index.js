import { useState } from "react"

export const useField = (type, valuep = '') => {
    const [value, setValue] = useState(valuep)
    const [required, setRequired] = useState(true)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = () => {
        setValue('')
    }

    return {
        onReset,
        type,
        value,
        required,
        onChange,
    }
}