
import {  useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

function App() {
  const [value, setValue] = useState('')
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(false)
 
  const [filter, setFilter] = useState(false)

  const [message, setMessage] = useState('')
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleClick = async () => {
  
      setLoading(true)
      const res = await fetch(`https://api.postalpincode.in/pincode/${value}`)
      const data = await res.json()

      console.log(data)
      setPost(data[0].PostOffice)
      setMessage(data[0].Message)
      setFilter(true)
      setLoading(false)
    if (data[0].PostOffice == null) {
      setPost([])
    }
  }
  

  
  if (loading) {
    return <div>Loading...</div>
  }

  const handleFilter = (e) => {
    let input = e.target.value
    console.log(input)

    let x = post.filter((item) => {
      return item.Name.toLowerCase().includes(input.toLowerCase())
    })
    setPost(x)
  }

  return (
    <section className="main">
      {!filter ? (
        <div className="pincode-container">
          <b>Enter pin code</b>
          <input
            type="number"
            placeholder="Pincode"
            id="input"
            onChange={handleChange}
          />
          <div>
            <button className="btn" onClick={handleClick}>
              Lookup
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="message">
            <b>pin code:{value}</b>
            <p>
              <b>Message</b>
              {message}
            </p>
            <div className="search-container">
              <IoSearchSharp />
              <input
                type="text"
                placeholder="filter"
                id="filter"
                onChange={handleFilter}
              />
            </div>
          </div>
          <div className="card-container">
            {post.length <= 0 && <h1>No Items Found</h1>}
            {post.map((item, index) => {
              const { DeliveryStatus, Name, BranchType, District, State } = item
              return (
                <div className="card" key={index}>
                  <p>
                    <b>Name:</b> {Name}
                  </p>
                  <p>
                    <b>Type:</b>Branch {BranchType}
                  </p>
                  <p>
                    <b>Delivery Status :</b> {DeliveryStatus}
                  </p>
                  <p>
                    <b>District:</b> {District}
                  </p>
                  <p>
                    <b>State:</b> {State}
                  </p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

export default App
