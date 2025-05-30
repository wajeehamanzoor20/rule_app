import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppSelector } from '../../hooks/redux';
import ModalBox from "../Modal";

import { Button, Select, Input, Layout, Card, Col, Row } from 'antd';
import 'antd/dist/reset.css';
import { LeftOutlined } from '@ant-design/icons';

import useUniqueRulesetName from "../../hooks/useUniqueRulesetName";
import useRulesetEditing from '../../hooks/useRulesetEditing';
import useRulesetManagement from '../../hooks/useRulesetManagement';
import useModal from '../../hooks/useModal';
import useRulesetInteractionHandlers from '../../hooks/useRulesetInteractionHandlers';

import { getRulesTableColumns } from '../../utils/rulesTableColumns';

import DraggableTable from './DraggableTable';
import type { Rule } from '../../types';
import mockRulesets from '../../mock/mockRulesets';

const { Content } = Layout;

const Rules = () => {

    const { rulesets, currentRulesetId, mode } = useAppSelector(state => state.rules);

    const {
        isOpen: showCancelModal,
        openModal: openCancelModal,
        closeModal: closeCancelModal
    } = useModal();

    const {
        isOpen: showDeleteRulesetModal,
        openModal: openDeleteRulesetModal,
        closeModal: closeDeleteRulesetModal
    } = useModal();

    const [currentRulesetName, setCurrentRulesetName] = useState("");
    const [isNameModified, setIsNameModified] = useState(false);
    const [lastSelectedRulesetId, setLastSelectedRulesetId] = useState<string | null>(null);

    const selectedRuleset = useMemo(() => rulesets.find(ruleset => ruleset.id === currentRulesetId), [currentRulesetId, rulesets]);

    const {
        editedRules,
        handleEditField,
        handleAddRule: handleAddRuleLocally,
        reorderRules,
        resetEditedRules,
        tableRef: tableContainerRef,
    } = useRulesetEditing(selectedRuleset, mode);

    const rulesetManagement = useRulesetManagement();

    const generateUniqueName = useUniqueRulesetName();

    const {
        handleConfirmDeleteRuleset,
        handleCopyRuleset,
        handleSelectRuleset,
    } = useRulesetInteractionHandlers({
        currentRulesetId,
        closeDeleteRulesetModal,
        generateUniqueName,
        rulesetManagement,
    });


    const handleSaveChanges = useCallback(() => {
        if (currentRulesetId && isNameModified) {
            rulesetManagement.saveRulesetName(currentRulesetId, currentRulesetName);
            setIsNameModified(false);
        }
    }, [currentRulesetId, isNameModified, currentRulesetName, rulesetManagement]);

    const handleCancelClick = useCallback(() => {
        if (isNameModified) {
            openCancelModal();
        } else {
            rulesetManagement.setEditingMode('view');
        }
    }, [isNameModified, openCancelModal, rulesetManagement]);

    const handleConfirmCancel = useCallback(() => {
        closeCancelModal();
        setCurrentRulesetName(selectedRuleset?.name || '');
        setIsNameModified(false);
        resetEditedRules();
        rulesetManagement.setEditingMode('view');
    }, [closeCancelModal, selectedRuleset, resetEditedRules, rulesetManagement]);


    const columns = useMemo(() => getRulesTableColumns({
        mode,
        handleEditField,
        saveRule: rulesetManagement.saveRule,
        toggleRuleEditStatus: rulesetManagement.toggleRuleEditStatus,
        removeRule: rulesetManagement.removeRule,
        currentRulesetId
    }), [
        mode,
        handleEditField,
        currentRulesetId,
        rulesetManagement.saveRule,
        rulesetManagement.toggleRuleEditStatus,
        rulesetManagement.removeRule
    ]);

    useEffect(() => {
        if (rulesets.length === 0) rulesetManagement.initializeRulesets(mockRulesets);
    }, [rulesets]);

    useEffect(() => {
        if (selectedRuleset) {
            if (selectedRuleset.id !== lastSelectedRulesetId) {
                setCurrentRulesetName(selectedRuleset.name || '');
                setIsNameModified(false);
                setLastSelectedRulesetId(selectedRuleset.id);
            } else if (!isNameModified) {
                setCurrentRulesetName(selectedRuleset.name || '');
            }
        } else if (!isNameModified) {
            setCurrentRulesetName('');
            setIsNameModified(false);
            setLastSelectedRulesetId(null);
        }
    }, [selectedRuleset, isNameModified, lastSelectedRulesetId]);


    const handleRulesOrderChange = useCallback((newOrderedRules: Rule[]) => {
        reorderRules(newOrderedRules);
        if (currentRulesetId) {
            rulesetManagement.updateRulesOrder(currentRulesetId, newOrderedRules);
        }
    }, [currentRulesetId, reorderRules, rulesetManagement]);

    const handleAddNewRule = useCallback(() => {
        if (currentRulesetId) {
            const newRule = handleAddRuleLocally();
            rulesetManagement.handleAddRule(currentRulesetId, newRule);
        }
    }, [currentRulesetId, handleAddRuleLocally, rulesetManagement]);


    const tableData = mode === 'edit' ? editedRules : selectedRuleset?.rules;
    const draggableEnabled = mode === 'edit';

    const isRuleBeingEditedOrAdded = useMemo(() => {
        return editedRules.some(rule => rule.status === 'new' || rule.status === 'editing');
    }, [editedRules]);


    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Content style={{ padding: '32px', width: '100%' }}>
                <Card
                    style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
                    }}>
                    <Row gutter={[16, 16]} align="middle" style={{ marginBottom: '20px' }}>
                        {mode === "view" ? (
                            <>
                                <Col span={12}>
                                    <Select
                                        value={currentRulesetId}
                                        onChange={handleSelectRuleset}
                                        style={{ width: '100%' }}
                                        options={rulesets.map(ruleset => ({
                                            label: ruleset.name,
                                            value: ruleset.id,
                                        })).concat([{ label: '+ Add New Ruleset', value: 'add_new' }])}
                                    />
                                </Col>
                                <Col span={12}>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Button size="large" type="primary" style={rulesets.length === 0 ? {} : { backgroundColor: 'rgb(216 218 231)', color: "#4d4b4b" }} onClick={() => rulesetManagement.setEditingMode("edit")} disabled={rulesets.length === 0}>Edit Rules</Button> {/* Default gray button */}
                                        <Button size="large" type="primary" onClick={handleCopyRuleset} disabled={rulesets.length === 0}>Copy Ruleset</Button>

                                    </div>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col span={12}>
                                    <div style={{ display: "flex", width: '100%' }}>
                                        {!isRuleBeingEditedOrAdded && !isNameModified &&
                                            <Button
                                                icon={<LeftOutlined />}
                                                onClick={handleCancelClick}
                                                type="text"
                                            />}
                                        <Input
                                            value={currentRulesetName}
                                            onChange={(e) => {
                                                setCurrentRulesetName(e.target.value);
                                                setIsNameModified(true);
                                            }}
                                            placeholder="Enter ruleset name"
                                            style={{ flexGrow: 1, minWidth: "400px" }}
                                        />
                                    </div>
                                </Col>

                                <Col span={12}>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div style={{ display: 'flex', gap: '50px', justifyContent: 'space-around' }}>
                                            <Button size="large" type="primary" onClick={handleSaveChanges} disabled={!isNameModified}>Save Changes</Button>
                                            <Button size="large" type="primary" style={isNameModified ? { backgroundColor: 'rgb(216 218 231)', color: "#4d4b4b" } : {}} onClick={handleCancelClick} disabled={!isNameModified}>Cancel</Button>
                                        </div>
                                        <div style={{ display: 'flex', gap: '50px', justifyContent: 'space-around' }}>
                                            <Button size="large" color="cyan" variant="solid" onClick={handleAddNewRule}>
                                                Add New Rule
                                            </Button>
                                            <Button size="large" variant="solid" color="red" onClick={openDeleteRulesetModal}>Delete Ruleset</Button>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>

                    <Row>
                        <Col span={24}>
                            <div ref={tableContainerRef} style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: '2px' }}>
                                <DraggableTable
                                    dataSource={tableData || []}
                                    columns={columns as any}
                                    pagination={false}
                                    onSortEnd={handleRulesOrderChange}
                                    draggableEnabled={draggableEnabled}
                                />
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Content>
            <ModalBox
                isOpen={showDeleteRulesetModal}
                onClose={closeDeleteRulesetModal}
                onConfirm={handleConfirmDeleteRuleset}
                title="Delete Ruleset"
                description="Are you sure you want to delete this ruleset? This action cannot be undone."
                confirmText="Delete"
                cancelText="Continue Editing"
            />

            <ModalBox
                isOpen={showCancelModal}
                onClose={closeCancelModal}
                onConfirm={handleConfirmCancel}
                title="Cancel Changes"
                description="Are you sure you want to cancel? Any unsaved changes will be lost."
                confirmText="Yes, Cancel"
                cancelText="Continue Editing"
            />
        </Layout>
    );
};

export default Rules;