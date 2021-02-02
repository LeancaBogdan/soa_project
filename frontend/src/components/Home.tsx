import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context';

function Home(): JSX.Element {
    let history = useHistory();
    const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
    const [cars, setCars ] = useState();

    const deleteCar = async(carId: string) => {
        const accessToken = await getIdTokenClaims();
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/car/car?carId=${carId}`, {
            method: "delete",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
                "authorization": `Bearer ${accessToken.__raw}`
            })
        });
        _removeCarFromView(carId);
        history.push('/');
    }

    const _removeCarFromView = (carId: string) => {
        const index = (cars as []).findIndex((car: { _id: string; }) => car._id === carId);
        (cars as []).splice(index, 1);
    }

    useEffect(() => {
        const fetchCars = async (): Promise<any> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/car/cars`);
            const json = await response.json();
            setCars(json);
        }
        fetchCars();
    }, []);

    return (
        <section className="blog-area section">
            <div className="container">
                <div className="row">
                    {cars && (cars as []).map((car: { _id: any; make_name: React.ReactNode; model_name: React.ReactNode; mileage: React.ReactNode; driver_name: React.ReactNode }) => (
                        <div className="col-lg-4 col-md-6" key={car._id}>
                            <div className="card h-100">
                                <div className="single-car car-style-1">
                                    <div className="car-info">
                                        <h4 className="car-make">
                                            <span>
                                                {car.make_name}
                                            </span>
                                        </h4>
                                        <h5 className="car-model">
                                            <span>
                                                {car.model_name}
                                            </span>
                                        </h5>
                                        <p className="car-mileage">
                                            <span>
                                                {car.mileage} KM
                                            </span>
                                        </p>
                                        <h6 className="car-driver-name">
                                            <span>
                                                Driver: {car.driver_name}
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                                <ul className="car-footer">
                                    <li>
                                        <Link to={`/car/${car._id}`} className="btn btn-sm btn-outline-secondary">View Car </Link>
                                    </li>
                                    <li>
                                        {isAuthenticated && (user.name === car.driver_name) &&
                                        <Link to={`/edit/${car._id}`} className="btn btn-sm btn-outline-secondary">Edit Car </Link>
                                        }
                                    </li>
                                    <li>
                                        {isAuthenticated && (user.name === car.driver_name) &&
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteCar(car._id)}>Delete Car </button>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Home;