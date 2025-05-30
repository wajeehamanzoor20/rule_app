import { Space, Select, Input } from 'antd';
import { EditOutlined, DeleteFilled, SaveOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import EditableMeasurement from '../components/Rules/EditableMeasurement';
import EditableFinding from '../components/Rules/EditableFinding';

import type { Rule } from '../types';

interface GetRulesTableColumnsProps {
    mode: 'view' | 'edit';
    handleEditField: (id: string, field: keyof Rule, value: any) => void;
    saveRule: (rulesetId: string, rule: Rule) => void;
    toggleRuleEditStatus: (rulesetId: string, rule: Rule) => void;
    removeRule: (rulesetId: string, ruleId: string) => void;
    currentRulesetId: string | null;
}

export const getRulesTableColumns = ({
    mode,
    handleEditField,
    saveRule,
    toggleRuleEditStatus,
    removeRule,
    currentRulesetId,
}: GetRulesTableColumnsProps) => {

    const requiredFields = ['measurement', 'comparator', 'comparedValue', 'findingName', 'action'];

    const columns: any[] = [
        {
            title: 'Rule #',
            key: 'ruleNumber',
            width: 60,
            align: 'center',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Measurement Condition',
            dataIndex: 'measurement',
            key: 'measurement',
            colSpan: 3,
            align: 'center',
            render: (_: any, record: Rule) => (
                ["new", "editing"].includes(record.status || 'saved') ? (
                    <EditableMeasurement
                        value={record.measurement}
                        onChange={(val: string) => handleEditField(record.id, 'measurement', val)}
                    />
                ) : (
                    record.measurement
                )
            ),
        },
        {
            title: '',
            dataIndex: 'comparator',
            key: 'comparator',
            colSpan: 0,
            align: 'center',
            render: (_: any, record: Rule) =>
                ["new", "editing"].includes(record.status || 'saved') ? (
                    <Select
                        value={record.comparator}
                        onChange={(val: 'is' | '>=' | '<') => {
                            handleEditField(record.id, 'comparator', val);
                            if (val === 'is') {
                                handleEditField(record.id, 'comparedValue', 'Not Present');
                                handleEditField(record.id, 'unitName', '');
                            } else {
                                handleEditField(record.id, 'comparedValue', '');
                            }
                        }}
                        options={[
                            { label: 'is', value: 'is' },
                            { label: '>=', value: '>=' },
                            { label: '<', value: '<' },
                        ]}
                        style={{ width: '100%' }}
                    />
                ) : (
                    record.comparator
                ),
        },
        {
            title: '',
            dataIndex: 'comparedValue',
            key: 'comparedValue',
            colSpan: 0, 
            align: 'center',
            render: (_: any, record: Rule) => {
                if (!["new", "editing"].includes(record.status || 'saved')) {
                    return record.comparator !== 'is'
                        ? `${record.comparedValue} ${record.unitName}`
                        : record.comparedValue;
                }

                return (
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {record.comparator === 'is' ? (
                            <Input disabled value="Not Present" />
                        ) : (
                            <div style={{ display: 'flex' }}>
                                <Input
                                    type="number"
                                    value={record.comparedValue}
                                    onChange={(e) => handleEditField(record.id, 'comparedValue', e.target.value)}
                                    placeholder="Enter numeric value"
                                    style={{ width: '70%' }}
                                />
                                <Select
                                    value={record.unitName || "mm"}
                                    onChange={(val: string) => handleEditField(record.id, 'unitName', val)}
                                    options={[
                                        { label: 'mm', value: 'mm' },
                                        { label: 'ms', value: 'ms' },
                                        { label: 'kg', value: 'kg' },
                                        { label: 'cm³', value: 'cm³' },
                                    ]}
                                    style={{ width: '30%' }}
                                />
                            </div>
                        )}
                    </Space>
                );
            },
        },

        {
            title: 'Finding Item',
            dataIndex: 'findingName',
            key: 'findingName',
            width: 150,
            align: 'center',
            render: (_: any, record: Rule) => (
                ["new", "editing"].includes(record.status || 'saved') ? (
                    <EditableFinding
                        value={record.findingName}
                        onChange={(val: string) => handleEditField(record.id, 'findingName', val)}
                    />
                ) : (
                    record.findingName
                )
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 200,
            align: 'center',
            render: (_: any, record: Rule) => (
                ["new", "editing"].includes(record.status || 'saved') ? (
                    <Select
                        value={record.action}
                        onChange={(val: string) => handleEditField(record.id, 'action', val)}
                        placeholder="Select action"
                        options={[
                            { label: 'Normal', value: 'Normal' },
                            { label: 'Reflux', value: 'Reflux' },
                        ]}
                        style={{ width: '100%' }}
                    />
                ) : (
                    <b>
                        {`Select "${record.action}"`}
                    </b>)
            ),
        },
    ];

    if (mode === 'edit') {
        columns.push({
            title: '',
            key: 'actions',
            width: 80,
            align: 'center',
            render: (_: any, record: Rule) => (
                <Space>
                    {["new", "editing"].includes(record.status || 'saved') ? (
                        <SaveOutlined
                            style={{ cursor: 'pointer', color: '#a0a0a0', filter: 'blur(0.5px)' }}
                            onClick={() => {
                                const isValid = requiredFields.every(
                                    (field) => {
                                        if (field === 'comparedValue' && record.comparator === 'is') {
                                            return true;
                                        }
                                        return record[field as keyof Rule] !== undefined &&
                                            record[field as keyof Rule] !== null &&
                                            String(record[field as keyof Rule]).trim() !== '';
                                    }
                                );

                                if (!isValid) {
                                    toast.error('Please fill in all required fields before saving.');
                                    return;
                                }
                                if (currentRulesetId) {
                                    saveRule(currentRulesetId, record);
                                }
                            }}
                        />
                    ) : (
                        <EditOutlined
                                style={{ cursor: 'pointer', color: '#a0a0a0', filter: 'blur(0.5px)' }}
                            onClick={() => {
                                if (currentRulesetId) {
                                    toggleRuleEditStatus(currentRulesetId, record);
                                }
                            }}
                        />
                    )}
                    <DeleteFilled
                        style={{ cursor: 'pointer', color: '#a0a0a0', filter: 'blur(0.5px)' }}
                        onClick={() => {
                            if (currentRulesetId) {
                                removeRule(currentRulesetId, record.id);
                            }
                        }}
                    />
                </Space>
            ),
        });
    }

    return columns;
};