import React, { useState, useEffect } from 'react';
import './App.css';
import MUIDataTable from "mui-datatables";
import { Grid, Card, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function App() {

  const URL = process.env.REACT_APP_SERVER_HOST + ":" + process.env.REACT_APP_SERVER_PORT;
  const [companies, setCompanies] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // Column definitions
  const columns = [
    {
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "description",
     label: "Description",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "category_code",
      label: "Category",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "email_address",
      label: "Email",
      options: {
       filter: true,
       sort: false,
      }
     }

   ];

useEffect(() => {

    //Fetch data from server
    fetch(URL + '/companies', {method: 'GET',})
          .then(response => response.json())
          .then(data => {
              setCompanies(data.data);
              setTotalRecords(data.total);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
}, []);

/**
 * Fetch data from server based on searchText and page number. Server side pagination
 *  
 * @param {*} page Pagination page number 
 * @param {*} searchText Search text
 */
  const changePage = (page, searchText) => {

    if(searchText == null)
    {
      searchText = '';
    }

    fetch(URL + '/companies?page=' + page + '&search=' + searchText, {
              method: 'GET',
        })
    .then(response => response.json())
    .then(data => {
        setCompanies(data.data);
        setTotalRecords(data.total);
      })
        .catch((error) => {
        console.error('Error:', error);
      });
  }

   // Options for the Data grid
   const options = {
     filterType: 'checkbox',
     selectableRows : 'none',
     filter : false,
     print : false,
     download: false,
     searchOpen: true,
     serverSide: true,
     rowsPerPage: 10,
     count : totalRecords,
     onTableChange: (action, tableState) => {
      
      console.log(action);
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.searchText);
          break;
        case 'search':
          changePage(tableState.page, tableState.searchText);
          break;
        default:
          console.log('action not handled.');
      }
    },

   };

  return (
    <Container>
          <Grid style={{ marginTop: '20px'}}>
            <Card>
              <Typography style={{paddingLeft: '20px', paddingTop: '10px', marginTop: '10px'}} variant="h3" component="h2" gutterBottom>
                Companies
              </Typography>
            </Card>
          </Grid>
          <Grid style={{ marginTop: "50px"}}>
            <Card>
              <MUIDataTable
                  title={"Company List"}
                  data={companies}
                  columns={columns}
                  options={options}
              />
            </Card>              
          </Grid>
    </Container>          
  );
}

export default App;