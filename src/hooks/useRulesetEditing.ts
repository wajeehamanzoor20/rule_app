
import type { Rule, Ruleset, Mode } from '../types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuid } from 'uuid'; 

interface UseRulesetEditingResult {
    editedRules: Rule[];
    handleEditField: (ruleId: string, field: keyof Rule, value: any) => void;
    handleAddRule: () => Rule; 
    reorderRules: (newOrderedRules: Rule[]) => void;
    resetEditedRules: () => void;
    tableRef: React.RefObject<HTMLDivElement | null>;
}

const useRulesetEditing = (selectedRuleset: Ruleset | undefined, mode: Mode): UseRulesetEditingResult => {
    const [editedRules, setEditedRules] = useState<Rule[]>([]);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedRuleset && mode === 'edit') {
            setEditedRules(JSON.parse(JSON.stringify(selectedRuleset.rules)));
        } else if (mode === 'view') {
            setEditedRules([]);
        }
    }, [selectedRuleset, mode]);

    const resetEditedRules = useCallback(() => {
        if (selectedRuleset) {
            setEditedRules(JSON.parse(JSON.stringify(selectedRuleset.rules)));
        } else {
            setEditedRules([]);
        }
    }, [selectedRuleset]);

    const handleEditField = useCallback((ruleId: string, field: keyof Rule, value: any) => {
        setEditedRules(prevRules => {
            return prevRules.map(rule =>
                rule.id === ruleId ? { ...rule, [field]: value, status: 'editing' } : rule
            );
        });
    }, []);

    const handleAddRule: () => Rule = useCallback(() => {
        const newRule: Rule = {
            id: uuid(), 
            measurement: '',
            comparator: 'is',
            comparedValue: 'Not Present',
            unitName: '',
            findingName: '',
            action: 'Normal',
            status: 'new',
        };

        setEditedRules(prevRules => {
            const updatedRules = [...prevRules, newRule];
            if (tableRef.current) {
                setTimeout(() => {
                    tableRef.current?.scrollTo({ top: tableRef.current.scrollHeight, behavior: 'smooth' });
                }, 100);
            }
            return updatedRules;
        });

        return newRule; 
    }, []);

    const reorderRules = useCallback((newOrderedRules: Rule[]) => {
        setEditedRules(newOrderedRules);
    }, []);

    return {
        editedRules,
        handleEditField,
        handleAddRule,
        reorderRules,
        resetEditedRules,
        tableRef,
    };
};

export default useRulesetEditing;