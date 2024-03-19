import "./list.css"
import { useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Header from "../../components/Header/Header.jsx"
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem.jsx";
import useFetch from "../../hookes/useFetch.js"


function List() {
  const location = useLocation()
  console.log(location)

const[min,setMin] = useState(undefined);
const[max,setMax] = useState(undefined);


  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const { data, loading, error ,reFfetchData} = useFetch(`/hotels/find/hotel/featuredHotels?city=${destination}&min= ${min || 10}&max=${max||1000}`)

function handleClick(){
  reFfetchData()
}

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} onChange={(e)=>setDestination(e.target.value)}  />
            </div>
            <div className="lsItem">
              <label>Check-In date</label>
              <span onClick={() => setOpenDate(!openDate)}> {`${format(dates[0].startDate, "MMMM/dd/yyyy")}  -  
              ${format(dates[0].endDate, "MMMM/dd/yyyy")} `}
              </span>
              {openDate &&
                <DateRange
                  onChange={item => setDates([item.selection])}
                  ranges={dates}
                  minDate={new Date()}
                />}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>per night</small>
                  </span>
                  <input onChange={(e)=>setMin(e.target.value)} type="number" className="lsOptionInput" />

                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price <small>per night</small>
                  </span>
                  <input onChange={(e)=>setMax(e.target.value)} type="number" className="lsOptionInput" />
                </div>


                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adults
                  </span>
                  <input type="number" className="lsOptionInput" placeholder={options.adult} />
                </div>



                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input type="number" className="lsOptionInput" placeholder={options.children} />
                </div>


                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    room
                  </span>
                  <input type="number" className="lsOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick} >Search</button>
          </div>

          <div className="listResult">
            {loading ? "Loading Please Wait" : <>
              {data.map((item) => (
                <SearchItem item={item} key = {item._id}/>
              ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List