
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";

import {
    setCurrentRuleset,
    setMode,
} from "../store/reducers/rules";

interface UseRulesetInteractionHandlersProps {
    currentRulesetId: string | null;
    closeDeleteRulesetModal: () => void;
    generateUniqueName: () => string;
    rulesetManagement: {
        setEditingMode: (mode: "view" | "edit") => void;
        deleteRuleset: (id: string) => void;
        copySelectedRuleset: (id: string) => void;
        createNewRuleset: (name: string) => void;
    };
}

const useRulesetInteractionHandlers = ({
    currentRulesetId,
    closeDeleteRulesetModal,
    generateUniqueName,
    rulesetManagement,
}: UseRulesetInteractionHandlersProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSelectRuleset = useCallback((value: string) => {
        if (value === 'add_new') {
            const newName = generateUniqueName();
            rulesetManagement.createNewRuleset(newName);
        } else {
            dispatch(setCurrentRuleset(value));
            rulesetManagement.setEditingMode("view");
        }
    }, [dispatch, generateUniqueName, rulesetManagement]);

    const handleConfirmDeleteRuleset = useCallback(() => {
        if (currentRulesetId) {
            rulesetManagement.deleteRuleset(currentRulesetId);
            closeDeleteRulesetModal();
            dispatch(setMode("view"));
        }
    }, [currentRulesetId, rulesetManagement, closeDeleteRulesetModal]);

    const handleCopyRuleset = useCallback(() => {
        if (currentRulesetId) {
            rulesetManagement.copySelectedRuleset(currentRulesetId);
        }
    }, [currentRulesetId, rulesetManagement]);


    return {
        handleConfirmDeleteRuleset,
        handleCopyRuleset,
        handleSelectRuleset,
    };
};

export default useRulesetInteractionHandlers;