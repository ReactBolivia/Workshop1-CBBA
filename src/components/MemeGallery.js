import React, { Component } from 'react';
import { Spinner, Button, Row, Col, Badge } from 'reactstrap';

export const MemeGallery = ({ data, isLoading, loadMore, selectMeme }) => {
    // si la peticion http esta cargando, mostrar un spinner
    if(isLoading) {
        return (
            <Spinner type="grow" color="primary" size="lg"/>
        );
    }
    // si el array data aun no se ha inicializado, retornar nulo para prevenir errores
    if(!data || data.length === 0) return null;
    // renderizar todos los memes
    return(
        <>
        <h1 style={{textAlign: 'center'}}>Galeria de memes</h1>
        <Row>
            {
            // iterar array de memes
            data.map((e, i) => {
                return(
                    <Col key={e.id} xs={4}>
                        {/* Renderizar imagenes bajo el prefijo de la URL: https://api.ticracia.com/static/memes/ */}
                        <img 
                            onClick={() => selectMeme(e)}
                            src={`https://api.ticracia.com/static/memes/${e.image}`} 
                            style={{width: 250, height: 250}} />
                        <Badge color={'secondary'}> { e.name } </Badge>
                    </Col>
                );
            })
            }
        </Row>
        <Button size="lg" outline color="primary" onClick={loadMore} block style={{marginTop: '10px', marginBottom: '10px'}}>Cargar más</Button>
        </>
    );
}