import "./featuredProperties.css"
import useFetch from "../../hookes/useFetch.js"
import React from 'react'

function FeaturedProperties() {

    const {data,loading,error} = useFetch("/hotels/find/hotel/featuredHotels?featured=true")
    console.log(data)


    return (
        <div className="fp">
         {loading? "Loading Please Wait" : <>
         {data.map((items,index)=>(
             <div className="fpItem" key={items._id}>
             <img src={items.photos[0]} alt="" className="fpImg" />
             <span className="fpName">{items.name}</span>
             <span className="fpCity">{items.city}</span>
             <span className="fpPrice">{items.cheapestPrice}</span>
             {items.rating && <div className="fpRating">
                 <button>{items.rating}</button>
                 <span>Excelent</span>
             </div>}
         </div>
         ))}
          </>}
        </div>

    )
}

export default FeaturedProperties