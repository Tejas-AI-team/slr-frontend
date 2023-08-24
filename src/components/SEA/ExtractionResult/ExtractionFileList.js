import React, { useRef, useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProcessedFileNames,
  fetchExtractionFileResults,
  deletePdfData,
  fetchAllExtractionResults,
} from "store/data-extraction-actions";
import ExtractionResult from "./ExtractionResult";

const btnCellRenderer = (props) => {
  const [deleteClicked, setDeleteClicked] = props.useState(false);
  const onClickHandler = async () => {
    await props.dispatch(
      fetchExtractionFileResults(
        props.data["file_id"],
        localStorage.getItem("selectedProject")
      )
    );
  };
  const onDeleteHandler = async () => {
    setDeleteClicked(true);
    try {
      await props.dispatch(deletePdfData(props.data["file_id"]));
      setDeleteClicked(false);
      // Stop the loader here since the deletion is successful
    } catch (error) {
      // Handle the error here if needed, and maybe stop the loader as well
    }
  };
  
  return (
    <>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        data-action="update"
        onClick={onClickHandler}
      >
        View Results <i className="fas fa-binoculars"></i>
      </button>
      <button
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={onDeleteHandler}
      >
        <i className={`fas fa-trash-can ${deleteClicked ? 'fa-flip' : ''}`}></i>
      </button>
    </>
  );
};

const ExtractionFileList = () => {
  const dispatch = useDispatch();
  const processedFiles = useSelector(
    (state) => state.dataExtraction.processedFiles
  );
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const selectedFileResult = useSelector(
    (state) => state.dataExtraction.extractionResult
  );
  const selectedFile = useSelector(
    (state) => state.dataExtraction.selectedFile
  );

  const columnDefs = [
    {
      headerName: "ID",
      valueGetter: "node.rowIndex + 1",
      width: 80,
    },
    {
      field: "file_name",
      headerName: "File Name",
      suppressSizeToFit: true,
      flex: 3,
      filter: true,
      editable: false,
    },
    {
      headerName: "Action",
      cellRenderer: btnCellRenderer,
      cellRendererParams: {
        dispatch,
        useState
      },
      editable: false,
      colId: "view",
      flex: 1,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );

  const fetchAllResults = async () => {
    const projectName = localStorage.getItem("selectedProject");
    await dispatch(fetchAllExtractionResults(projectName));
  };
  useEffect(() => {
    dispatch(fetchProcessedFileNames());
  }, [dispatch]);

  useEffect(() => {
    setRowData(processedFiles);
  }, [processedFiles]);

  return (
    <>
      {processedFiles.length !== 0 && (
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 shadow-lg">
          <div className="flex-auto p-4">
            <div className={`ag-theme-alpine h-screen`} style={{ height: 320 }}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                readOnlyEdit={true}
                enableCellChangeFlash={true}
                suppressClickEdit={true}
                paginationAutoPageSize={true}
                pagination={true}
              />
            </div>
            <div className="text-center mt-4">
              <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={fetchAllResults}
              >
                <i className="fas fa-file-export"></i> Export All
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedFile && (
        <ExtractionResult result={selectedFileResult} fileName={selectedFile} />
      )}
    </>
  );
};
export default ExtractionFileList;