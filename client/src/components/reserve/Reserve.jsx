import "./reserve.css"
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from "../../hookes/useFetch.js"
import { useState, useContext } from "react"
import { SearchContext } from "../../context/searchContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function Reserve({ setOpen, hotelId }) {

    const { data } = useFetch(`/hotels/room/${hotelId}`)
    const [selectedRooms, setSelectedRooms] = useState([])



    console.log(selectedRooms)

    const { dates } = useContext(SearchContext);

    const getDatesInRangle = (startDate, endDate) => {

        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime())
        let dates = [];

        while (date <= end) {
            dates.push(new Date(date))
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }
    const allDates = getDatesInRangle(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };


    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map((id) => {
                const res = axios.put(`/rooms/availability/${id}`, { dates: allDates })
                return res.data
            })
            )
            setOpen(false);
            navigate("/");
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="reserve">
            <div className="rContainer" >
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select Your rooms:</span>
                {data.map(item => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max People : <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>

                        <div className="rSelectedRooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onClick={handleSelect} disabled={!isAvailable(roomNumber)} />

                                </div>
                            ))}
                        </div>

                    </div>
                ))}
                <button onClick={handleClick} className="rButton"> Reserve Now </button>
            </div>
        </div>
    )
}

export default Reserve