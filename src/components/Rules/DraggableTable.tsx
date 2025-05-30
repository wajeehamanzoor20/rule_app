import React, { useRef, useCallback } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import type { DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { Rule } from '../../types';
import { MenuOutlined } from '@ant-design/icons';

interface DragItem extends Rule {
    index: number;
}

const type = 'DraggableRow';

interface DraggableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
    'data-row-key'?: string;
    draggableEnabled: boolean;
}

const DraggableRow = ({ index, moveRow, draggableEnabled, ...props }: DraggableRowProps) => {
    const ref = useRef<HTMLTableRowElement>(null);

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any }>({
        accept: type,
        collect (monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover (item, monitor: DropTargetMonitor<DragItem, unknown>) {
            if (!ref.current || !draggableEnabled) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
        type,
        item: { index, id: props['data-row-key'] || '' } as DragItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: draggableEnabled,
    });

    drag(drop(ref));

    const style: React.CSSProperties = {
        ...props.style,
        cursor: draggableEnabled ? 'grab' : 'default',
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <tr ref={ref} style={style} {...props} data-handler-id={handlerId} />
    );
};

interface DraggableTableProps extends TableProps<Rule> {
    onSortEnd: (sortedRules: Rule[]) => void;
    dataSource: Rule[];
    draggableEnabled: boolean;
}

const DraggableTable: React.FC<DraggableTableProps> = ({ onSortEnd, dataSource, components, draggableEnabled, ...restProps }) => {

    const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragRow = dataSource[dragIndex];
        const newDataSource = [...dataSource];
        newDataSource.splice(dragIndex, 1);
        newDataSource.splice(hoverIndex, 0, dragRow);
        onSortEnd(newDataSource);
    }, [dataSource, onSortEnd]);

    const tableComponents = {
        body: {
            row: DraggableRow,
        },
        ...components,
    };

    const dragHandleColumn = {
        title: '',
        dataIndex: 'sort',
        width: 30,
        className: draggableEnabled ? 'drag-visible' : 'drag-hidden',
        render: () => <MenuOutlined style={{ cursor: 'grab' }} />,
    };

    const finalColumns = React.useMemo(() => {
        if (draggableEnabled && restProps.columns) {
            return [dragHandleColumn, ...restProps.columns];
        }
        return restProps.columns;
    }, [draggableEnabled, restProps.columns]);


    return (
        <DndProvider backend={HTML5Backend}>
            <Table
                className="custom-table fixed-row-height"
                {...restProps}
                dataSource={dataSource}
                components={tableComponents}
                rowKey="id"
                columns={finalColumns as any}
                onRow={(record, index) => ({
                    index: index || 0,
                    moveRow: moveRow,
                    'data-row-key': record.id,
                    draggableEnabled: draggableEnabled,
                }) as DraggableRowProps}
            />
        </DndProvider>
    );
};

export default DraggableTable;