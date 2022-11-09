import React, { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [values, setValues] = useState({
    name:'', email:'', password:'', occupation:'', state: ''
  });
  const [listOfOccupations, setOfOccupations] = useState([]);
  const [listOfStates, setOfStates] = useState([]);

  const handleChange = (event) => {
    return ({ target: { value } }) => {
      setValues(prev => ({...prev, [event]: value }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!values.name || !values.email || !values.password || !values.occupation || !values.state) {
        alert('Fill Out All Sections');
        return;
      }
      await axios.post('https://frontend-take-home.fetchrewards.com/form', {
        name:  values.name,
        email: values.email,
        password: values.password,
        occupation: values.occupation,
        state: values.state
      });
      alert('Submit Successful!')
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://frontend-take-home.fetchrewards.com/form');
        setOfOccupations(data.occupations);
        setOfStates(data.states);
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <form>
        <label>Full Name:  </label>
        <input id='full-name' type='text' value={values.name} onChange={handleChange('name')} />
        <br/>
        <label>Email:  </label>
        <input id='email' type='email' value={values.email} onChange={handleChange('email')} />
        <br/>
        <label>Password:  </label>
        <input id='password' type='password' value={values.password} onChange={handleChange('password')} />
        <br/>
        <label>Occupation:  </label>
        <select value={values.occupation} onChange={handleChange('occupation')}>
          <option></option>
          {listOfOccupations.map(occupation => (
            <option value={occupation} key={occupation}>{occupation}</option>
          ))}
        </select>
        <br/>
        <label>State:  </label>
        <select value={values.state} onChange={handleChange('state')}>
          <option value=""></option>
          {listOfStates.map(state => (
            <option value={state.name} key={state.name} >{state.name}</option>
          ))}
        </select>
        <br/>
        <button onClick={handleSubmit} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;
