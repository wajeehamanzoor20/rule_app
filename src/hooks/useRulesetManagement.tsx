
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import {
    setRulesets,
    setMode,
    updateRulesetName,
    addRule,
    updateRule,
    deleteRule,
    copyRuleset,
    addNewRuleset,
    deleteRuleset as deleteRulesetAction,
    reorderRulesInRuleset
} from '../store/reducers/rules';
import type { Ruleset, Rule, Mode } from '../types';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';


interface UseRulesetManagementResult {
    initializeRulesets: (rulesets: Ruleset[]) => void;
    setEditingMode: (mode: Mode) => void;
    saveRulesetName: (rulesetId: string, name: string) => void;
    handleAddRule: (rulesetId: string, newRule: Rule) => void;
    saveRule: (rulesetId: string, rule: Rule) => void;
    toggleRuleEditStatus: (rulesetId: string, rule: Rule) => void;
    removeRule: (rulesetId: string, ruleId: string) => void;
    copySelectedRuleset: (id: string) => void;
    createNewRuleset: (name: string) => void;
    deleteRuleset: (id: string) => void;
    updateRulesOrder: (rulesetId: string, newOrderedRules: Rule[]) => void;
}

const useRulesetManagement = (): UseRulesetManagementResult => {
    const dispatch = useDispatch<AppDispatch>();

    const initializeRulesets = useCallback((rulesets: Ruleset[]) => {
        dispatch(setRulesets(rulesets));
    }, [dispatch]);

    const setEditingMode = useCallback((mode: Mode) => {
        dispatch(setMode(mode));
    }, [dispatch]);

    const saveRulesetName = useCallback((rulesetId: string, name: string) => {
        dispatch(updateRulesetName({ id: rulesetId, name }));
    }, [dispatch]);

    const handleAddRule = useCallback((rulesetId: string, rule: Rule) => {
        dispatch(addRule({ rulesetId, rule }));
    }, [dispatch]);

    const saveRule = useCallback((rulesetId: string, rule: Rule) => {
        dispatch(updateRule({ rulesetId, rule: { ...rule, status: 'saved' } }));
    }, [dispatch]);

    const toggleRuleEditStatus = useCallback((rulesetId: string, rule: Rule) => {
        dispatch(updateRule({ rulesetId, rule: { ...rule, status: 'editing' } }));
    }, [dispatch]);

    const removeRule = useCallback((rulesetId: string, ruleId: string) => {
        dispatch(deleteRule({ rulesetId, ruleId }));
    }, [dispatch]);

    const copySelectedRuleset = useCallback((id: string) => {
        dispatch(copyRuleset(id));
    }, [dispatch]);

    const createNewRuleset = useCallback((name: string) => {
        const newRuleset: Ruleset = {
            id: uuid(),
            name: name,
            rules: [],
        };
        dispatch(addNewRuleset(newRuleset));
    }, [dispatch]);

    const deleteRuleset = useCallback((id: string) => {
        dispatch(deleteRulesetAction(id));
    }, [dispatch]);

    const updateRulesOrder = useCallback((rulesetId: string, newOrderedRules: Rule[]) => {
        dispatch(reorderRulesInRuleset({ rulesetId, newOrderedRules }));
    }, [dispatch]);


    return {
        initializeRulesets,
        setEditingMode,
        saveRulesetName,
        handleAddRule,
        saveRule,
        toggleRuleEditStatus,
        removeRule,
        copySelectedRuleset,
        createNewRuleset,
        deleteRuleset,
        updateRulesOrder,
    };
};

export default useRulesetManagement;