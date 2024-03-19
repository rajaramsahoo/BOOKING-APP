import "./searchitem.css"
import { Link } from "react-router-dom"

function SearchItem({ item }) {
    return (
        <div className="searchItem">
            <img src={item.photos[0]}
                alt=""
                className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}m from center</span>
                <span className="siTaxiOp">free airport taxi</span>
                <span className="siSubtitle">Studio Aptment with AC</span>
                <span className="siFeatures">{item.desc}</span>
                <span className="siCancelOp">Free cancel</span>
                <span className="siCancelOpSubtitle">you can cancel it latter</span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>8.9</button>

                </div>}
                <div className="siDeatilsTexts">
                    <span className="siPrice">{item.cheapestPrice}</span>
                    <span className="siTaxOp">includes taxes ands fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">See Availability</button>
                    </Link>
                </div>
            </div>

        </div >
    )
}

export default SearchItem