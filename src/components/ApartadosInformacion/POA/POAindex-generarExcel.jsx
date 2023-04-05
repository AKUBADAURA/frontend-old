import React, { useContext, useEffect } from 'react'
import ReactExport from "react-export-excel";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Button from '@material-ui/core/Button';
import { POAContext } from '../../../context/POAContext';
import { typesColumnsTableIndex } from '../../../types/types';
import Hidden from '@material-ui/core/Hidden';

const POAindexGenerarExcel = () => {

    const { POASXLS, setPOASXLS } = useContext(POAContext)
    ///export EXCEL 
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


    /////////////
    return (
        <ExcelFile
            element={
                <button
                    id="buttonXLS"
                    // onClick={() => console.log('dando click en el botoncito')}
                    style={{display:'none'}}
                >                    
                </button>
            }
        >

            <ExcelSheet data={POASXLS} name="POAS">
                {
                    typesColumnsTableIndex.map((column, i) => {
                        return <ExcelColumn label={column.headerName} value={column.field} key={i} />
                    })
                }
                {/* <ExcelColumn label="Name" value="name" />
                            <ExcelColumn label="Total Leaves" value="total" />
                            <ExcelColumn label="Remaining Leaves" value="remaining" /> */}
            </ExcelSheet>

        </ExcelFile>
    )
}

export default POAindexGenerarExcel
