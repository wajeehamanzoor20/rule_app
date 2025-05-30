import { useAppSelector } from "./redux";

const useUniqueRulesetName = (baseName = 'Untitled') => {
    const { rulesets } = useAppSelector(state => state.rules);

    const generate = () => {
        const existingNames = rulesets.map((r: { name: string; }) => r.name);

        if (!existingNames.includes(baseName)) return baseName;

        const pattern = new RegExp(`^${baseName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}( \\((\\d+)\\))?$`);
        const usedNumbers = existingNames
            .map((name: string) => {
                const match = name.match(pattern);
                return match && match[2] ? parseInt(match[2], 10) : null;
            })
            .filter((n: any): n is number => n !== null);

        const nextNumber = usedNumbers.length ? Math.max(...usedNumbers) + 1 : 1;
        return `${baseName} (${nextNumber})`;
    };

    return generate;
};

export default useUniqueRulesetName;