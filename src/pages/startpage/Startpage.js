import React, { useEffect, useState } from 'react';
//import './App.css';

import { query as getPersonsQuery } from '../../api/queries/getPersons';

import Am4chartMap from '../components/maps/am4chart/am4chartMap';

export default function Startpage()  {

  const [persons, setPersons] = useState([]);
  const [searchField, setSearchField] = useState('');

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => this.setState({ monsters: users }));
  // }


  useEffect(() => {
    fetch(`https://graphql.contentful.com/content/v1/spaces/rywkwx6777os/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer Elwb5oH4ZRZ4jAEM5F9lhTgRD3ZCGg0lbc6Si2FU00k",
        },
        body: JSON.stringify(
          { 
            query: getPersonsQuery 
          }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        data && data.personCollection && setPersons(data.personCollection.items);
      });
  }, []);


  // const onSearchChange = event => {
  //   //this.setState({ searchField: event.target.value });
  //   setSearchField(event.target.value);
  // };

  //   const filteredPersons = persons.filter(p =>
  //     p.name.toLowerCase().includes(searchField.toLowerCase())
  //   );

    return (
      <div className='main'>
        {
          <Am4chartMap />
        }
      </div>
    );
  }