import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let options = props.options;
    let priceOptions = Object.keys(options);
    let dispatch = useDispatchCart();
    let foodItem = props.item;

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(" ");

    let data = useCart();

    let finalPrice = qty * parseInt(options[size]);
    let priceRef = useRef();
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                // console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });

    }

    return (
        <div>
            <div className="card m-3" style={{ "width": "18rem", "maxHeight": "460px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <br></br>
                        <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
                        <hr></hr>
                        <div className='btn bg-success text-white' onClick={handleAddToCart}>Add to cart</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
