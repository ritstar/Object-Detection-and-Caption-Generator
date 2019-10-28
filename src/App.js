import React, { Component } from "react";
import ReactDOM from "react-dom";
import MagicDropzone from "react-magic-dropzone";
import Axios from 'axios';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import FormData from 'form-data';
import "@tensorflow/tfjs";
import { Container, Row, Col } from 'reactstrap';
import CreatedBy from './Component/CreatedBy';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import ShowObjectCount from './ShowObjectCount';
class App extends Component {
  state = {
    model: null,
    preview: "",
    predictions: [],
    predictionButtonClick: false,
    err: false,
    objects: {}
  };

  componentDidMount() {
    cocoSsd.load().then(model => {
      this.setState({
        model: model
      });
    });

  }

  onDrop = (accepted, rejected, links) => {
    if (accepted) {
      this.setState({ preview: accepted[0].preview || links[0] });
      this.state.err = true;

    }
    if (rejected == true) {
      alert("Input format not supported");
    }
  };

  cropToCanvas = (image, canvas, ctx) => {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (naturalWidth > naturalHeight) {
      ctx.drawImage(
        image,
        (naturalWidth - naturalHeight) / 2,
        0,
        naturalHeight,
        naturalHeight,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
    } else {
      ctx.drawImage(
        image,
        0,
        (naturalHeight - naturalWidth) / 2,
        naturalWidth,
        naturalWidth,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
    }
  };

  onImageChange = e => {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    this.cropToCanvas(e.target, c, ctx);
    this.state.model.detect(c).then(predictions => {

      const font = "16px sans-serif";
      ctx.font = font;
      ctx.textBaseline = "top";

      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];

        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });
      let obj = {};
      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];

        if (prediction.class in obj) {
          obj[prediction.class] += 1;
        }
        else {
          obj[prediction.class] = 1;
        }
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
      });
      this.setState({ objects: obj });
      console.log(this.state.objects);
      console.log(this.state.model);
    });
  };


  render() {
    return (
      <div className="App">
        <div className="Dropzone-page">
          <h2>Extraction of information from an image</h2>
          <Container>
            <Row>
              <Col>
                <div style={{ textAlign: 'center' }}>
                  {this.state.model ? (
                    <MagicDropzone
                      className="Dropzone"
                      accept="image/jpeg, image/png, .jpg, .jpeg, .png"
                      multiple={false}
                      onDrop={this.onDrop}
                      name="image"
                      id="image"
                    >

                      {this.state.err ? (
                        <img
                          alt="upload preview"
                          onLoad={this.onImageChange}
                          className="Dropzone-img"
                          src={this.state.preview}
                        />
                      ) : (
                          "Choose or drop a file."
                        )}
                      <canvas id="canvas" />
                    </MagicDropzone>
                  ) : (
                      <div className="Dropzone">Loading model...</div>
                    )}
                </div>
              </Col>
              <Col>
                <ShowObjectCount store={this.state.objects}></ShowObjectCount>
              </Col>
            </Row>
            <Row style={{ display: "flex", flexDirection: "verticle", justifyContent: "center", marginTop: "20px" }}>
              {this.state.preview ? (<a href='/predict'><button>Generate Prediction</button></a>)
                : <div></div>}
            </Row>
          </Container>
          <CreatedBy />
          <a href='/classes' className="list-class">List of classes which our app can detect</a>
        </div>
      </div>
    );
  }
}

export default App;
