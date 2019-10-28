import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './Classes.css';

const Classes = () => {

    const names = ["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light", "fire", "hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports", "ball", "kite", "baseball bat", "baseball", "glove", "skateboard", "surfboard", "tennis", "racket", "bottle", "wine", "glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed", "dining", "table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"];
    let count = 0;
    return (
        <div>
            <h2>List of classes which we can detect from an image:- </h2>
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {names.map(name => (
                            <tr>
                                <td>{++count}</td>
                                <td>{name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <a href='/'><p><i className="fas fa-arrow-circle-left"></i> Go to home</p></a>
        </div>
    );
}

export default Classes;