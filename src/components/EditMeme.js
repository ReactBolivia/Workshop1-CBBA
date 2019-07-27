import React, { Component } from 'react';
import { Spinner, Button, Row, Col, Input } from 'reactstrap';

export const EditMeme = ({ inputUpper, inputLower, selectedMeme, uploadMeme, isLoading, changeInput }) => {
    const image = selectedMeme 
                    ? `https://api.ticracia.com/static/memes/${selectedMeme.image}` 
                    : require('../image.png');
    return(
        <>
        <h1 style={{textAlign: 'center'}}> Crear meme </h1>
        <Row>
            <Col sm={{size: 6, offset: 3}}>
                <Input 
                    type="text" 
                    name="upperText" 
                    placeholder="Texto superior" 
                    value={inputUpper} 
                    onChange={changeInput}/>
                <img src={image} style={{width: 250, height: 250, margin: 'auto'}}/>
                <Input 
                    type="text" 
                    name="lowerText" 
                    placeholder="Texto superior" 
                    value={inputLower} 
                    onChange={changeInput} />
                <Button color="success" block onClick={uploadMeme} disabled={isLoading}>
                    Subir meme { isLoading && <Spinner color="secondary" size="sm"/> }
                </Button>
            </Col>
        </Row>
        </>
    );
}