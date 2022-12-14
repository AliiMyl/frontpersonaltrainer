import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpdateCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';


function Customers(){

    // haetaan REST rajapinnasta asiakkaat
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        console.log("Ollaan useEffectissä");
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        // fetch jolla haetaan tiedot asiakkaista
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    };

     // hakee customer olion
  const addCustomer = (customer) => {
    console.log("ollaan customers.js addCustomer metodissa");
    // rest rajapintaa käyttäen ptiäisi saada customer lisättyä
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
        }
      })
  };

  // tässä poistamme customerin kun olemme saaneet linkin alempaa
  const deleteCustomer = (link) => {
    console.log("Deletoidaan");
    fetch(link, {
      method: "DELETE"
   })
    .then(response => fetchCustomers())
    .catch(error => console.error(error))
      }

// päivitetään customer tiedot
const updateCustomer = (customer, link) => {
  console.log("Update funktio");
  fetch(link , {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  })
    .then(response => fetchCustomers())
    .catch(err => console.error(err));
};

    
    // laitetaan tiedot columneihin nätisti
    const [columnDefs, setColumnDefs] = useState([
  
        { field: 'firstname', sortable: true, filter: true  },
        { field: 'lastname', sortable: true, filter: true  },
        { field: 'streetaddress', sortable: true, filter: true  },
        { field: 'postcode',  sortable: true, filter: true  },
        { field: 'city',  sortable: true, filter: true  },
        { field: 'email', sortable: true, filter: true  },
        { field: 'phone', sortable: true, filter: true  },
        {
          headerName: "",
          width: 100,
        //  field: "data.links[1].href", //MITÄ VITTUA //params={params}
          cellRenderer: (params) => (
            <UpdateCustomer  data={params.data} updateCustomer={updateCustomer} params={params}/>
          //  <IconButton color="secondary" onClick={() => updateCustomer(params.value)}>
           //   <EditIcon />
         // </IconButton>
    
          ),
        },
        {
          headerName: "",
          width: 100, 
          field: "links.0.href",
          cellRenderer: (params) => (
          <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
              <DeleteIcon />
          </IconButton>

          ),
        },
      ]);

return (
<div>
<AddCustomer addCustomer = {addCustomer}/>
  <div style={{ height: "100%", boxSizing: "border-box" }}>
    <div style={{height: 600, width: 900}} className="ag-theme-material">
      <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          paginationPageSize={18}
          pagination={true}/>
    </div>
  </div>
</div>
);
};
export default Customers;
