import "./featured.css"
import useFetch from "../../hookes/useFetch.js"

function Featured() {

const {data,loading,error} = useFetch("/hotels/countByCity?cities=angul,bbsr,puri")



    return (
        <div className="featured">
           {loading?"Loading Please Wait ":<>
           
           <div className="featuredItem">
                <img src="/puri.jpeg"
                    alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Angul</h1>
                    <h2>{data[0]}</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                    alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>BBSR</h1>
                    <h2>{data[1]}</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                    alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>PURI</h1>
                    <h2>{data[2]}</h2>
                </div>
            </div></> }
        </div>
    )
}

export default Featured