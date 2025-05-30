import useDebouncedInput from "../../hooks/useDebouncedInput";
import { Input } from 'antd';

const EditableMeasurement = ({
    value,
    onChange,
    debounceDelay = 400,
}: {
    value: string;
    onChange: (val: string) => void;
    debounceDelay?: number;
}) => {

    const { value: measurement, handleChange } = useDebouncedInput(value, onChange, debounceDelay);

    return (
        <Input
            value={measurement}
            placeholder='Enter Measurement Name'
            onChange={handleChange}
        />
    );
};


export default EditableMeasurement;