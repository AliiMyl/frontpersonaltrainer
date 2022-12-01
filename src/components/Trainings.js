import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function Trainings(){

    // haetaan REST rajapinnasta trainings
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        console.log("Ollaan useEffectissä");
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        // fetch jolla haetaan tiedot asiakkaista
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            // https://customerrest.herokuapp.com/gettrainings
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    };

     // hakee customer olion


  const deleteTraining = (link) => {
    fetch(link, { method: "DELETE" }).then((response) => {
      if (response.ok) {
        fetchTrainings();
      }
    });
  };

 
    
    // laitetaan tiedot columneihin nätisti
    const [columnDefs, setColumnDefs] = useState([
        { field: 'activity', sortable: true, filter: true  },
        { field: 'duration', sortable: true, filter: true  },
        { field: 'date', sortable: true, filter: true  },
        {
          headerName: '',
          width: 100, 
          field: '_links.self.href',
          cellRenderer: (params) => (
          <IconButton color="default" onClick={() => deleteTraining(params.value)}>
              <DeleteIcon />
          </IconButton>
          ),
        },
      ]);

return (
<div>
  <div style={{ height: "100%", boxSizing: "border-box" }}>
    <div style={{height: 600, width: 900}} className="ag-theme-material">
      <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          paginationPageSize={18}
          pagination={true}/>
    </div>
  </div>
</div>
);
};
export default Trainings;

