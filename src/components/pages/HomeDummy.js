import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomeDummy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(1);
  }, []);

  async function fetchUser(check=2) {
      setLoading(true)
    if(check === 1 ){
      await fetch(`https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json?_limit=20`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }

  const [input, setInput] = useState('');

  const onInputChange = (ev) => {
    setInput(ev.target.value);
    console.log(ev.target.value)
    searchUser(ev.target.value)
  }

  const onButton = (ev) => {
    setInput(ev.target.value);
    searchUser(ev.target.value)
  }

  async function searchUser(search){
    console.log(search+'rrrrrrrrrrrrr')
    if(search != ''){
      setData(null)
      await fetchUser(1);
      let filteredData = data.filter(x => String(x.first_name).toLowerCase().includes(search.toLowerCase()));
      console.log(filteredData);
      console.log('testtttt : ' + search)
      setData(filteredData);
    }else{
      setData(null)
      await fetchUser(1);
    }
  }

  return (
    <div className="App">
      <div>
        <input type="text"
        placeholder='Type Query'
        name="search"
        onChange={onInputChange}
        value={input} />
        <button type='button' onClick={onButton}> Search</button>
      </div>

      <h1>Data Sheet</h1>

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <table className='table table-hover table-responsive' >
            <thead>
                <tr className='table-active'>
                    <th className='table-primary'> Sr. No.</th>
                    <th className='table-secondary'>First Name </th>
                    <th className='table-success'>Last Name</th>
                    <th className='table-danger'>Email Address</th>
                    <th className='table-danger'>Website</th>
                    <th className='table-danger'>Age</th>
                </tr>
            </thead>
            <tbody>
                { data &&
                    data.map(({post, id, first_name, last_name, email, web, age, index})=> (
                        <tr key={id}>
                            <td className='table-primary'>{id}</td>
                            
                            <td className='table-secondary'>
                            <Link to={`/user/${id} `}>
                            {first_name} </Link>
                            </td>
                            <td className='table-success'>{last_name}</td>
                            <td className='table-success'>{email}</td>
                            <td className='table-success'>{web}</td>
                            <td className='table-success'>{age}</td>
                        </tr>
                    ))}
                
            </tbody>
        </table>
    </div>
  );
}
