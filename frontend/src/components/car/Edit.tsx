//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';

function Edit(): JSX.Element {
  const { getIdTokenClaims } = useAuth0();
  let history = useHistory();
  let { carId } = useParams<{ carId: string }>();

  interface IValues {
    [key: string]: any;
  }

  const [car, setCar] = useState()
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/car/car/${carId}`);
      const json = await response.json();
      setCar(json)
    }
    fetchData();    
  }, [carId]);

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const submitSuccess: boolean = await submitForm();
    setSubmitSuccess(submitSuccess);
    setLoading(false);
    setTimeout(() => {
      history.push('/');
    }, 1500);
  }

  const submitForm = async (): Promise<boolean> => {
    debugger;
    try {
      const accessToken = await getIdTokenClaims();
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/car/car?carId=${carId}`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(values)
      });
      return response.ok;      
    } catch(ex) {
      return false;
    }
  }
  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues});
  }

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValues({ [e.currentTarget.id]: e.currentTarget.value });
  }

    return (
        <div className={'page-wrapper'}>
            {car && 
            <div className={"col-md-12 form-wrapper"}>
                <h2> Edit Car </h2>
                {submitSuccess && (
                <div className="alert alert-info" role="alert">
                    The car has been successfully edited!
                </div>
                )}
            <form id={"edit-car-form"} onSubmit={handleFormSubmission} noValidate={true}>
                <div className="form-group col-md-12">
                    <label htmlFor="make_name"> Make </label>
                    <input type="text" id="make_name" defaultValue={car.make_name!} onChange={(e) => handleInputChanges(e)} name="make_name" className="form-control" placeholder="Enter make" />
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="model_name"> Model </label>
                    <input type="text" id="model_name" defaultValue={car?.model_name!} onChange={(e) => handleInputChanges(e)} name="model_name" className="form-control" placeholder="Enter model" />
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="mileage"> Mileage </label>
                    <input type="text" id="mileage" defaultValue={car?.mileage!} onChange={(e) => handleInputChanges(e)} name="mileage" className="form-control" placeholder="Enter mileage" />
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="driver_name"> Driver Name </label>
                    <input type="text" id="driver_name" defaultValue={car?.driver_name!} onChange={(e) => handleInputChanges(e)} name="driver_name" className="form-control" placeholder="Enter driver name" />
                </div>
                <div className="form-group col-md-4 pull-right">
                    <button className="btn btn-success" type="submit">
                        Edit Car
                    </button>
                    {loading &&
                        <span className="fa fa-circle-o-notch fa-spin" />
                    }
                </div>
            </form>
            </div>
            }
        </div>
  );
}
export default Edit;