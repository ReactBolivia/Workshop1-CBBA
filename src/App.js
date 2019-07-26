import React, { Component } from 'react';
// importar css de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// importar componentes de reactstrap
import { Container, Col, Row } from 'reactstrap'; 
// importar componente de galeria de memes
import { MemeGallery } from './components/MemeGallery';
// importar cliente http axios
import axios from 'axios';

class App extends Component{
  state = {
    page: 1,
    isLoadingMemes: true,
    memes: []
  }

  componentDidMount(){
    // al montarse el componente, cargar y renderizar los memes mediante la
    // funcion loadMemes()
    this.loadMemes();
  }
  /**
   * @function loadMemes: Llama al servicio de TIcracia para cargar memes, y los pasa al state
   */

  async loadMemes(){
    // obtener la variable page para paginar los memes obtenidos
    const { page, isLoadingMemes } = this.state;
    // llamar a servicio web con axios
    const res = await axios.get(`https://api.ticracia.com/api/v1/memes/${page}`);
    // al terminar de hacer el servicio, ocultar el spinner
    this.setState({ isLoadingMemes: false });
    if(res.data.success){
      // en caso de exito, pasar array res.data.memes al state
      this.setState({ memes: res.data.memes });
    }else{
      // en caso de error, mostrar un alert
      alert('Error al cargar los memes')
    }
  }
  /**
   * @function loadMore <async>: Funcion para cargar más memes, actualizando la pagina actual
   *                            y llamando nuevamente al servicio web
   */
  loadMore = async () => {
    // obtener las variables page y memes del state
    const { page, memes } = this.state;
    // actualizar la pagina actual más 1
    const nextPage = page + 1;
    // llamar al servicio web de memes con el page actualizado
    const res = await axios.get(`https://api.ticracia.com/api/v1/memes/${nextPage}`);
    if(res.data.success){
      // si la peticion tiene exito, actualizar el array memes con el nuevo array obtenido del
      // servicio web
      const updated = [...memes, ...res.data.memes];
      // actualizar el state memes
      this.setState({ memes: updated, page: nextPage });
    }else{
      // en caso de error, decrementar nextPage 
      this.setState({ page: nextPage - 1 });
      alert('Error al cargar los memes')
    }
  }

  render(){
    const { memes, isLoadingMemes } = this.state;
    return(
      <Container fluid>
        <Row>
          <Col xs={6}>
            {/* POR HACER */}
          </Col>
          {/* Renderizar componente de MemeGallery */}
          <Col xs={6}>
            <MemeGallery
              data={memes}
              isLoading={isLoadingMemes}
              loadMore={this.loadMore.bind(this)}
              />
          </Col>
        </Row>
      </Container>
    );
  }
}


export default App;
