import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';

function Create(): JSX.Element {
    let history = useHistory();
    const { user, getIdTokenClaims } = useAuth0();

    interface IValues {
        [key: string]: any;
    }
    const [currentUser, setCurrentUser] = useState<string>('');
    const [makeName, setMakeName] = useState<string>('');
    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setCurrentUser(user.name);
        }
    }, [user])

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            make_name: values.make_name,
            model_name: values.model_name,
            mileage: parseInt(values.mileage),
            driver_name: values.driver_name
        };
        const submitSuccess: boolean = await submitform(formData);
        setSubmitSuccess(submitSuccess);
        setValues({...values, formData});
        setLoading(false);
        setTimeout(() => {
            history.push('/');
        }, 1500);
    }

    const submitform = async (formdata: {}) => {
        try {
            const accessToken = await getIdTokenClaims();
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/car/car`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Authorization": `Bearer ${accessToken.__raw}`
                }),
                body: JSON.stringify(formdata)
            });
            return response.ok;
        } catch (ex) {
            return false;
        }
    }

    const setFormValues = (formValues: IValues) => {
        setValues({...values, ...formValues});
    }

    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormValues({ [e.currentTarget.name]: e.currentTarget.value });
    }

    return(
        <div>
            <div className={"col-md-12 form-wrapper"}>
                <h2> Create Car </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new car.
                    </div>
                )}
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submited!
                    </div>
                )}
                <form id={"create-car-form"} onSubmit={handleFormSubmission} noValidate={true}>
                    <div className="form-group col-md-12">
                        <label htmlFor="make"> Make </label>
                        <input type="text" id="make" onChange={(e) => handleInputChanges(e)} name="make_name" className="form-control" placeholder="Enter make"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="model"> Model </label>
                        <input type="text" id="model" onChange={(e) => handleInputChanges(e)} name="model_name" className="form-control" placeholder="Enter model"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="mileage"> Mileage </label>
                        <input type="text" id="mileage" onChange={(e) => handleInputChanges(e)} name="mileage" className="form-control" placeholder="Enter mileage"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="driver_name"> Driver Name </label>
                        <input type="text" id="driver_name" onChange={(e) => handleInputChanges(e)} name="driver_name" className="form-control" placeholder="Enter driver name"/>
                    </div>
                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Create Car
                        </button>
                        {loading &&
                            <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Create);