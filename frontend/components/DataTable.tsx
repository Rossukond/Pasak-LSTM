// DataTable.tsx
import React from 'react';
import {
  Table,
} from '@radix-ui/themes';

type DataRow = {
  [key: string]: string | number;
};

type DataTableProps = {
  columns: string[];
  data: DataRow[];
};

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col}>{col}</Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={columns.length}>No data available</Table.Cell>
          </Table.Row>
        ) : (
          data.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {columns.map((col) => (
                <Table.Cell key={col}>{row[col]}</Table.Cell>
              ))}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default DataTable;
