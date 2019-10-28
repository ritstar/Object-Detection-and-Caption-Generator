import React, { Component } from 'react';
import axios from 'axios';
import CreatedBy from './CreatedBy';
import { Container, Row, Button, Spinner } from 'reactstrap';
import './Predict.css';

class Predict extends Component {
    state = {
        imageSrc: "",
        loading: false
    }
    fileChangeHandler = e => {
        this.setState({ imageSrc: e.target.files[0] });
    }
    formSubmitHandler = e => {
        e.preventDefault();
        if (this.state.imageSrc == "") {
            alert("Select an image first!");
        }
        else {
            let formData = new FormData();
            formData.append(
                'image',
                this.state.imageSrc,
                this.state.imageSrc.name
            );
            this.setState({ loading: true });
            axios.post("http://max-image-caption-generator.max.us-south.containers.appdomain.cloud/model/predict",
                formData).then(e => {
                    document.getElementById('result').innerHTML = e.data.predictions[0].caption;
                    console.log(e.data.predictions);
                    this.setState({ loading: false });
                });
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <h2>Extraction of information from an image</h2>
                    <Row className="form1">
                        <div >
                            <form method='post' encType="multipart/form-data">
                                <input type='file' name='image' onChange={this.fileChangeHandler} required></input>
                                <Button color="primary" type='submit' onClick={this.formSubmitHandler}>Predict</Button>
                            </form>
                        </div>
                    </Row>
                    <Row style={{ marginTop: '20px' }} className="resultBox">
                        {this.state.loading ? <Spinner color="primary" /> : <div></div>}
                        <p className="result" id="result"></p>
                    </Row>
                    <Row>
                        <CreatedBy />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Predict;