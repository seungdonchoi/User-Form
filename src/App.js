import React, { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [enteredFullName, setFullName] = useState('');
  const [enteredEmail, setEmail] = useState('');
  const [enteredPassword, setPassword] = useState('');
  const [listOfOccupations, setOfOccupations] = useState([]);
  const [enteredOccupation, setOccupation] = useState('');
  const [listOfStates, setOfStates] = useState([]);
  const [enteredState, setState] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  }
  const handleStateChange = (event) => {
    setState(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!enteredEmail || !enteredFullName || !enteredPassword || !enteredOccupation || !enteredState) {
        alert('Fill Out All Sections');
        return;
      }
      await axios.post('https://frontend-take-home.fetchrewards.com/form', {
        name: enteredFullName,
        email: enteredEmail,
        password: enteredPassword,
        occupation: enteredOccupation,
        state: enteredState
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
        <input id='full-name' type='text' value={enteredFullName || ''} onChange={handleFullNameChange} required />
        <br/>
        <label>Email:  </label>
        <input id='email' type='email' required value={enteredEmail} onChange={handleEmailChange} />
        <br/>
        <label>Password:  </label>
        <input id='password' type='password' required value={enteredPassword} onChange={handlePasswordChange} />
        <br/>
        <label>Occupation:  </label>
        <select value={enteredOccupation} onChange={handleOccupationChange}>
          <option></option>
          {listOfOccupations.map(occupation => (
            <option value={occupation} key={occupation}>{occupation}</option>
          ))}
        </select>
        <br/>
        <label>State:  </label>
        <select value={enteredState} onChange={handleStateChange}>
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
