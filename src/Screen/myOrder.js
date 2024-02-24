import React, { useEffect, useState } from 'react'

export default function MyOrders() {

    const [orderData, setorderData] = useState([])

    const fetchMyOrder = async () => {

        await fetch("http://localhost:5000/api/MyOrderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    // console.log(orderData)

    return (
        <>
            <div>
                <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'
                style={{ overflowY: 'auto'}} >
                    <table className='table '>
                        <thead className=' text-success fs-4'>
                            <tr>
                                <th scope='col' >#</th>
                                <th scope='col' >Name</th>
                                <th scope='col' >Quantity</th>
                                <th scope='col' >Size</th>
                                <th scope='col' >Amount</th>
                                <th scope='col' >Order Date</th>
                                <th scope='col' ></th>
                            </tr>
                        </thead>
                        <tbody className='text-black'>
                            {orderData.length > 0 &&
                                (() => {
                                    const rows = [];
                                    let index=1;
                                    for (let i = 0; i < orderData.length; i++) {
                                        for (let j = 1; j < orderData[i].length; j++) {
                                            rows.push(
                                                <tr>
                                                    <th scope='row'>{index}</th>
                                                    <td>{orderData[i][j].name}</td>
                                                    <td>{orderData[i][j].qty}</td>
                                                    <td>{orderData[i][j].size}</td>
                                                    <td>{orderData[i][j].price}</td>
                                                    <td>{orderData[i][0].Order_date}</td>
                                                </tr>
                                            );
                                            index++;
                                        }
                                    }
                                    return rows;
                                })()
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}