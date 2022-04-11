import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

let pageSize = 50;
export default function HomeDummy() {
  const [data, setData] = useState(null);
  const [paginatedPost, setPaginatedPost] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');

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


  const onInputChange = (ev) => {
    setInput(ev.target.value);
    searchUser(ev.target.value)
  }

  const onButton = (ev) => {
    setInput(ev.target.value);
    searchUser(ev.target.value)
  }

  async function searchUser(search){
    
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

  const pageCount = data ? Math.ceil(data.length/pageSize):0;
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount+1);

  return (
    <div>
      <div className="float-xl-right">
        <input type="text"
        placeholder='Type Query'
        name="search"
        onChange={onInputChange}
        value={input} />
        <button type='button' onClick={onButton}> Search</button>
      </div>

      <h1 className="text-center text-primary text-uppercase">Data Sheet</h1>

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <table className='table table-hover table-responsive table-bordered' >
            <thead>
                <tr className='table-active'>
                    <th className='table-primary'> Sr. No.</th>
                    <th className='table-secondary'>First Name </th>
                    <th className='table-success'>Last Name</th>
                    <th className='table-danger'>Email Address</th>
                    <th className='table-warning'>Website</th>
                    <th className='table-info'>Age</th>
                </tr>
            </thead>
            <tbody>
                { 
                data &&
                data.map(({id, first_name, last_name, email, web, age})=> (
                        <tr key={id}>
                            <td className='table-primary'>{id}</td>
                            <td className='table-secondary'>
                            <Link to={`/user/${id} `}>
                            {first_name} </Link>
                            </td>
                            <td className='table-success'>{last_name}</td>
                            <td className='table-danger'>{email}</td>
                            <td className='table-warning'>{web}</td>
                            <td className='table-info'>{age}</td>
                        </tr>
                    ))}
                
            </tbody>
        </table>

        <nav className="Page navigation example">
          <ul className="pagination justify-content-center">

                  {
                    pages.map((data) =>(
                      <li className="page-item disabled page-link ">{data}</li>
                    ))
                  }

            
            
            
          </ul>
        </nav>

    </div>
  );
}
