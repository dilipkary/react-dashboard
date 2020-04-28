import React from 'react';
import { MDBDataTable } from 'mdbreact';
import dataJson from './data';
const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'Title',  
        field: 'title',
        sort: 'asc',
        width: 150,
         
      },
      {
        label: 'Topic',
        field: 'topic',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Year',
        field: 'end_year',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Intensity',
        field: 'intensity',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Sector',
        field: 'sector',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Region',
        field: 'region',
        sort: 'asc',
        width: 100
      },
      {
        label: 'PESTLE',
        field: 'pestle',
        sort: 'asc',
        width: 100
      }
    ],
    rows:dataJson
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;