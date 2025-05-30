// Runtime imports
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
// Type-only imports
import type { Ruleset, Rule, Mode } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';

interface RulesetsState {
    rulesets: Ruleset[];
    currentRulesetId: string | null;
    mode: Mode;
}

const initialState: RulesetsState = {
    rulesets: [],
    currentRulesetId: "",
    mode: 'view'
};

const rulesSlice = createSlice({
    name: 'rules',
    initialState,
    reducers: {
        setRulesets (state, action: PayloadAction<Ruleset[]>) {
            state.rulesets = action.payload;
            state.currentRulesetId = action.payload[0].id
        },
        setCurrentRuleset: (state, action: PayloadAction<string>) => {
            state.currentRulesetId = action.payload;
        },
        setMode: (state, action: PayloadAction<Mode>) => {
            state.mode = action.payload;
        },
        updateRulesetName: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const ruleset = state.rulesets.find(r => r.id === action.payload.id);
            if (ruleset) {
                ruleset.name = action.payload.name;
            }
        },
        addRule: (state, action: PayloadAction<{ rulesetId: string, rule: Rule }>) => {
            const ruleset = state.rulesets.find(r => r.id === action.payload.rulesetId);
            if (ruleset) {
                ruleset.rules.push(action.payload.rule);
            }
        },
        updateRule: (state, action: PayloadAction<{ rulesetId: string; rule: Rule }>) => {
            const ruleset = state.rulesets.find(r => r.id === action.payload.rulesetId);
            if (ruleset) {
                const ruleIndex = ruleset.rules.findIndex(r => r.id === action.payload.rule.id);
                if (ruleIndex !== -1) {
                    ruleset.rules[ruleIndex] = action.payload.rule;
                }
            }
        },
        deleteRule: (state, action: PayloadAction<{ rulesetId: string; ruleId: string }>) => {
            const ruleset = state.rulesets.find(r => r.id === action.payload.rulesetId);
            if (ruleset) {
                ruleset.rules = ruleset.rules.filter(r => r.id !== action.payload.ruleId);
            }
        },
        copyRuleset: (state, action: PayloadAction<string>) => {
            const original = state.rulesets.find(r => r.id === action.payload);
            if (original) {
                const baseName = original.name;

                const pattern = new RegExp(`^${baseName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')} \\((\\d+)\\)$`);

                const existingCopiesNumbers = state.rulesets
                    .map(r => {
                        const match = r.name.match(pattern);
                        return match ? parseInt(match[1]) : null;
                    })
                    .filter((num): num is number => num !== null);

                const nextNumber = existingCopiesNumbers.length > 0 ? Math.max(...existingCopiesNumbers) + 1 : 1;

                const newName = `${baseName} (${nextNumber})`;

                const copiedRuleset: Ruleset = {
                    id: uuid(),
                    name: newName,
                    rules: original.rules.map(rule => ({
                        ...rule,
                        id: uuid()
                    }))
                };
                state.rulesets.push(copiedRuleset);
                state.currentRulesetId = copiedRuleset.id;
            }
        },
        addNewRuleset: (state, action: PayloadAction<Ruleset>) => {
            state.rulesets.push(action.payload);
            state.currentRulesetId = action.payload.id;
        },
        deleteRuleset: (state, action: PayloadAction<string>) => {
            state.rulesets = state.rulesets.filter(r => r.id !== action.payload);
            if (state.currentRulesetId === action.payload) {
                state.currentRulesetId = state.rulesets.length > 0 ? state.rulesets[0].id : null;
            }
        },
        reorderRulesInRuleset: (state, action: PayloadAction<{ rulesetId: string; newOrderedRules: Rule[] }>) => {
            const { rulesetId, newOrderedRules } = action.payload;
            const ruleset = state.rulesets.find(rs => rs.id === rulesetId);
            if (ruleset) {
                ruleset.rules = newOrderedRules;
            }
        }
    }
});

export const {
    setRulesets,
    setCurrentRuleset,
    setMode,
    updateRulesetName,
    addRule,
    updateRule,
    deleteRule,
    copyRuleset,
    addNewRuleset,
    deleteRuleset,
    reorderRulesInRuleset
} = rulesSlice.actions;

export default rulesSlice.reducer;