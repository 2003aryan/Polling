import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Dropdown, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const DownloadResult = ({ resultData, responseData }) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const exportToCSV = (apiData, fileName, bookType, fileExtension) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: bookType, type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    const handleMenuClick = (e) => {
        if (e.key === '1') {
            exportToCSV(resultData, 'Results', 'csv', ".csv")
        }
        if (e.key === '2') {
            exportToCSV(responseData, 'Responses', 'xlsx', ".xlsx")
        }
        if (e.key === '3') {
            exportToCSV(responseData, 'Responses', 'csv', ".csv")
        }
    };
    const items = [
        {
            label: 'Results (csv)',
            key: '1',
        },
        {
            label: 'Responses (xlsx)',
            key: '2',
        },
        {
            label: 'Responses (csv)',
            key: '3',
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <Tooltip overlay={!resultData || resultData.length === 0 ? 'No response submitted' : null}>
            <Dropdown.Button size='large' disabled={!resultData || resultData.length === 0}
                onClick={(e) => exportToCSV(resultData, 'Results', 'xlsx', ".xlsx")} menu={menuProps}>
                <DownloadOutlined /> Result (xlsx)</Dropdown.Button>
        </Tooltip>
    );
};

export default DownloadResult;