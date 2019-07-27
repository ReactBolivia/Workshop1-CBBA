import React, { Component } from 'react';
import { Spinner, Button, Row, Col, Card, CardImg } from 'reactstrap';

export const MyMemes = ({ data }) => {
    if(data.length === 0) return null;
    return(
        <>
        <h3 style={{textAlign: 'center'}}>Mis memes</h3>
        <Row>
            {
            // iterar array de memes
            data.map((e, i) => {
                return(
                    <Col key={e.id} xs={4}>
                        {/* Renderizar imagenes bajo el prefijo de la URL: https://api.ticracia.com/static/memes/ */}
                        <Card>
                            <CardImg top width="100%" src={`https://analytics.ticracia.com/static/memes_edited/${e.image}`}  alt="Card image cap"/>
                            <a style={{textAlign: 'center'}} href={`https://www.facebook.com/sharer/sharer.php?u=https://analytics.ticracia.com/static/memes_edited/${e.image}`} target="_blank">Compartir en Facebook</a>
                        </Card>
                    </Col>
                );
            })
            }
        </Row>
        </>
    );
}