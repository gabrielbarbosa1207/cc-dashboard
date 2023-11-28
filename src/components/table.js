import React, { useState, useEffect } from 'react';

function EditableTable({ onTableChange }) {
    // Initialize the table as a 5x5 array of empty strings
    const initialTable = Array(5).fill().map(() => Array(5).fill(''));
    const [table, setTable] = useState(initialTable);

    const addRow = (e) => {
        e.preventDefault();
        setTable([...table, Array(table[0].length).fill('')]);
    };

    const removeRow = (e) => {
        e.preventDefault();
        if (table.length > 1) {
            const newTable = [...table];
            newTable.pop();
            setTable(newTable);
        }
    };

    const addColumn = (e) => {
        e.preventDefault();
        setTable(table.map(row => [...row, '']));
    };

    const removeColumn = (e) => {
        e.preventDefault();
        if (table[0].length > 1) {
            setTable(table.map(row => row.slice(0, row.length - 1)));
        }
    };

    const generateHTML = () => {
        const rowsHtml = table.map(row => {
            const colsHtml = row.map(cell => `<td>${cell}</td>`).join('');
            return `<tr>${colsHtml}</tr>`;
        }).join('');
        return `<table>${rowsHtml}</table>`;
    };

    const handleInputChange = (rowIndex, colIndex, value) => {
        const newTable = [...table];
        newTable[rowIndex][colIndex] = value;
        setTable(newTable);
        onTableChange(generateHTML());
    };

    // This effect ensures that the initial table state is communicated to the parent.
    useEffect(() => {
        onTableChange(generateHTML());
    }, []);

    return (
        <div>
            <table>
                <tbody>
                    {table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        value={cell}
                                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addRow}>Add Row</button>
            <button onClick={removeRow}>Remove Row</button>
            <button onClick={addColumn}>Add Column</button>
            <button onClick={removeColumn}>Remove Column</button>
        </div>
    );
}

export default EditableTable;
