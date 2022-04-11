import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const onLinkClick = = () => {
  //   window.open("http://twitter.com/saigowthamr");
  // };

  useEffect(() => {
    fetchUser(1);
  }, []);

  async function fetchUser(check=2) {
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
      <table border="2" cellpadding="30" responsive="md">

    

      <td> <h3>Sr. No. </h3>
              {data &&
                data.map(({ id, first_name, last_name, email, web, age }) => (
                    <ol key={id}> {id}</ol>
               ))}
               </td>


         {/* First Name Table */}
        <td> <h3>First Name </h3>

              {data &&
                data.map(({ id, first_name, last_name, email, web, age }) => (
                  <Link to={`/user/${id} `}>
                    <p key={id}> {first_name}</p>
                    </Link>
               ))}

               </td>


          {/* Last Name Table */}
        <td > <h3>Last Name</h3>
              {data &&
                data.map(({ id, first_name, last_name, email, web, age }) => (
                    <p key={id}>{last_name}</p>
               ))}
               </td>

                {/* email Table */}
        <td> <h3>Email Address</h3>
              {data &&
                data.map(({ id, first_name, last_name, email, web, age }) => (
                    <p key={id}>{email}</p>
               ))}
               </td>

               {/* web Table */}
        <td> <h3>Website</h3>
              {data &&
                data.map(({ id, first_name, last_name, email, web, age }) => (
                    <p key={id}>{web}</p>
               ))}
               </td>

               {/* age Table */}
                      <td> <h3>Age</h3>
                        {data &&
                          data.map(({ id, first_name, last_name, email, web, age }) => (
                              <p key={id}>{age}</p>
                      ))}
                      </td>



             </table>
    </div>
  );
}
