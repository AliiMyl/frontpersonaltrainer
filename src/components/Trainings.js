import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTraining from './AddTraining';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


function Trainings(){

    // haetaan REST rajapinnasta trainings
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
      // haetaan trainings
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        // fetch jolla haetaan tiedot 
        fetch("https://customerrest.herokuapp.com/gettrainings") 
            // https://customerrest.herokuapp.com/api/trainings
        .then(response => response.json())
        .then(data => setTrainings(data))
    };

    const fetchTrainingInfo = () => {
      fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(res => res.json())
      .then(data => setTrainings(data.content))
    }

     // hakee customer olion
     const addTraining = (training) => {
      console.log("ollaan Trainings.js addTraining metodissa");
      // rest rajapintaa käyttäen ptiäisi saada training lisättyä
      fetch("https://customerrest.herokuapp.com/gettrainings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(training),
      })
        .then((response) => {
          if (response.ok) {
            fetchTrainings();
          }
        })
    };
// koitetaan poistaa training
    const deleteTraining = () => {
      //deletoidaan training
      fetch("https://customerrest.herokuapp.com/gettrainings", { 
        method: "DELETE" 
      })
      .then(data => console.log(data))
      .then((response) => fetchTrainingInfo)
    };

 // TEE FUNKTIO JOKA OTTAA DATA.CUSTOMER.FIRSTNAME
 function FormatCustomerName(params){
  return params.data.customer.firstname + ' ' + params.data.customer.lastname;
 };

 // yritys saada date formatoitua :(
function FixedTime(param){
 const givenDate = param.data.customer.date;
const desired = givenDate.split("T");
return desired;
}

//headerName: 'fullname', valueGetter: FormatCustomerName
    // laitetaan tiedot columneihin nätisti
    const [columnDefs, setColumnDefs] = useState([

        { field: 'activity', sortable: true, filter: true  },
        { field: 'duration', sortable: true, filter: true  },
        { field: 'date', sortable: true, filter: true  }, // valueGetter: FixedTime
        {headerName: 'fullname', valueGetter: FormatCustomerName, sortable: true, filter: true},
        {
          headerName: '',
          width: 100, 
          field: 'links', //links.1.href
          cellRenderer: (params) => (
          <IconButton color="default" onClick={() => deleteTraining(params.value)}>
              <DeleteIcon />
          </IconButton>
          ),
        },
      ]);

return (
<div>
<AddTraining addTraining = {addTraining}/>
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

