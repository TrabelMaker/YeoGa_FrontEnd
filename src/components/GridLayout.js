import React, { useEffect, useState } from "react";
import '../styles/GridLayout.css';
import axios from "axios";


function GridLayout() {

    const [tourData, setTourData] = useState([]);

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await axios.get('http://apis.data.go.kr/B551011/PhotoGalleryService1', {
                    params: {
                        ServiceKey: 'MYzcOkxXNy9aeiJzwYdYjCBPbNloErIAb%2BqqPy%2FGjOsKURai1yNknPnsH6zRiiizyUyX9V8MRNPif4GKUWqKNw%3D%3D',
                        pageNo: 1,
                        numOfRows: 4,
                        arrange: 'A',
                    }
                });
            const items = response.data.response.body.items.item;
            setTourData(items);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchTourData();
    }, []);

    return(
        <div className="grid-container">
        <div className="trip">
        <h2>국내 추천 여행지</h2>
        </div>
        <div className="boxone">
        {tourData.map((item, index) => (
            <div className={`box box${index + 1}`} key={item.galContentId}>
                <h3>{item.galTitle}</h3>
                <img src={item.galWebImgeUrl} alt={item.galTitle} />
            </div>
        ))}
        
        
        </div>
        <div className="boxtwo">
            <div className="box box5"></div>
            <div className="box box6"></div>
            <div className="box box7"></div>
            <div className="box box8"></div>

        </div>
    </div>
    )
};




export default GridLayout;