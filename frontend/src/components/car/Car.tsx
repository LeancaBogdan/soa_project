import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function Car() {
    let { carId } = useParams<{ carId: string }>();
    const [car, setCar] = useState<any>({});

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/car/car/${carId}`);
            const json = await response.json();
            setCar(json);
        }
        fetchData();
    }, [carId]);

    return (
        <section className="car-area">
            <div className="container">
                <div className="col-lg-1 col-md-0" />
                <div className="col-lg-10 col-md-12">
                    {car &&
                    <div className="main-car">
                        <div className="car-top-area">
                            <h5 className="pre-title"> Nest React Car Management </h5>
                            <h3 className="Make">
                                <b>{car.make_name}</b>
                            </h3>
                            <h4 className="Model">
                                <b>{car.model_name}</b>
                            </h4>
                            <p className="para">
                                {car.driver_name}
                            </p>
                            <p className="para">
                                KM: {car.mileage}
                            </p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Car;