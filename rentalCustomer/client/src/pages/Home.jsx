import React, { useContext, useEffect } from 'react'
import Card from '../components/card/Card';
import '../assets/css/style.css';
import { CarContext } from '../contexts/CarContext'

function Home() {
    const { carState: { cars, carsLoading }, getCars }
        = useContext(CarContext)

    useEffect(() => {
        getCars()
    }, [getCars])

    return (
        <div className='home mb-5'>
            <div className='p-5 m-3'>
                <h1 className=" section-title">Xe Có Sẵn</h1>
            </div>
            <div className="row">
                {
                    cars.map(car => (
                        <div key={car._id} className="col col-lg-4 col-md-6 col-sm-12 mb-4">
                            <Card >
                                {car}
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home