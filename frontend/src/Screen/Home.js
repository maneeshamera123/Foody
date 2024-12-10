import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
// import { search } from '../../backend/Routes/DisplayData';s

export default function Home() {
    const [search, setSearch] = useState(" ");
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setfoodItem(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div><div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-inner" id='carousel' style={{ objectFit: "contain !important" }}>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                        </div>
                    </div>
                    <div className="carousel-item active" style={{ height: '800px' }}>
                        <img src="https://images.unsplash.com/photo-1672099260380-4ba66eead8ed?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{ objectFit: 'cover', height: '100%' }}/>
                    </div>
                    <div className="carousel-item" style={{ height: '800px' }}>
                        <img src="https://plus.unsplash.com/premium_photo-1679924471066-dd984e92f395?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{ objectFit: 'cover', height: '100%' }}/>
                    </div>
                    <div className="carousel-item" style={{ height: '800px' }}>
                        <img src="https://plus.unsplash.com/premium_photo-1673581152327-f41d5914ccc3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{ objectFit: 'cover', height: '100%' }}/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>

            <div className='container'>
                {foodCat.length > 0 && foodCat.map((data) => (
                    <div key={data._id} className='row mb-3'>
                        <div className='fs-3 m-3 col-12'>{data.CategoryName}</div>
                        {foodItem.length > 0 &&
                            foodItem
                                .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                .map(filtereditem => (
                                    <div key={filtereditem._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card 
                                            foodItem={filtereditem}
                                            options={filtereditem.options[0]}
                                            >
                                        </Card>
                                    </div>
                                ))}
                    </div>
                ))}
            </div>


            <div><Footer /></div>
        </>
    );
}
