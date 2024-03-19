import "./hotel.css"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Header from "../../components/Header/Header.jsx"
import { faLocationDot, faCircleXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MailList from "../../components/mailList/MailList.jsx"
import Footer from "../../components/footer/Footer.jsx"
import { useState, useContext } from "react"
import useFetch from "../../hookes/useFetch.js"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/searchContext.js";
import { AuthContext } from "../../context/authContext.js"
import Reserve from "../../components/reserve/Reserve.jsx"



function Hotel() {

  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const { data, loading, error, reFfetchData } = useFetch(`/hotels/find/${id}`)

  const { dates, options } = useContext(SearchContext)
  // console.log(dates)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)



  const handleOpen = (index) => {
    setSlideNumber(index)
    setOpen(true)
  }

  function handleMove(direction) {
    let newSlide;
    if (direction === "l") {
      newSlide = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlide = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlide)
  }
  const [openModal, setOpenModal] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    }
    else {
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "Loading Please Wait " : <div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close"
            onClick={() => setOpen(false)} />
          <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={() => handleMove('1')} />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={() => handleMove('2')} />
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />

            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">{data.distance}</span>
          <span className="hotelPriceHighlight">book a stay in our hotel over ${data.cheapestPrice}get free taxi</span>

          <div className="hotelImages"  >
            {data.photos?.map((photo, index) => {
              return (
                <div className="hotelImgWrapper" key={index} >
                  <img onClick={() => handleOpen(index)} src={photo.src} className="hotelImg" />
                </div>
              )
            })}
          </div>

          <div className="hotelDetails">
            <div className="hotelDeatilsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDeatilsPrice">
              <h1>perfect for {days} stay</h1>
              <span>This property has told us they are making large investments and efforts towards sustainability by taking steps that can have environmental and social impact. We’ve worked with experts including Travalyst and Sustainalize to create the Travel Sustainable programme – making it easier for you to experience the world more sustainably.</span>
              <h2>
                <b>${days * options.room * data.cheapestPrice}</b>({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/> }
    </div>
  )
}

export default Hotel