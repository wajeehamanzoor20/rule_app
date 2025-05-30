import { useEffect, useState, useMemo } from "react";

import debounce from "lodash/debounce";

const useDebouncedInput = (initialValue: string, onChange: (value: string) => void, debounceDelay = 400) => {
    const [value, setValue] = useState(initialValue);

    const debouncedOnChange = useMemo(
        () => debounce(onChange, debounceDelay),
        [onChange, debounceDelay]
    );

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        return () => debouncedOnChange.cancel();
    }, [debouncedOnChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setValue(newVal);
        debouncedOnChange(newVal);
    };

    return { value, handleChange };
};

export default useDebouncedInput;