import { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";
import { Input } from "antd";

const EditableFinding = ({
    value,
    onChange,
    debounceDelay = 400,
}: {
    value: string;
    onChange: (val: string) => void;
    debounceDelay?: number;
}) => {
    const [finding, setFinding] = useState(value);

    const debouncedUpdate = useMemo(
        () => debounce(onChange, debounceDelay),
        [onChange, debounceDelay]
    );

    useEffect(() => {
        return () => debouncedUpdate.cancel();
    }, [debouncedUpdate]);

    return (
        <Input
            value={finding}
            placeholder='Enter Finding Name'
            onChange={(e) => {
                const newVal = e.target.value;
                setFinding(newVal);
                debouncedUpdate(newVal);
            }}
        />
    );
};

export default EditableFinding;