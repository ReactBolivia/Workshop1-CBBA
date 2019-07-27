import React, { Component } from 'react';
// importar css de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// importar componentes de reactstrap
import { Container, Col, Row } from 'reactstrap'; 
// importar componente de galeria de memes
import { MemeGallery } from './components/MemeGallery';
import { EditMeme } from './components/EditMeme';
import { MyMemes } from './components/MyMemes';
// importar cliente http axios
import axios from 'axios';

const MEME_EDITED_URL = "https://analytics.ticracia.com/static/meme_edited/";
const MEME_GENERATOR_URL = "https://api.ticracia.com/api/v1/memes/new";
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php?u=#url";

class App extends Component{
  state = {
    page: 1,
    isLoadingMemes: true,
    memes: [],
    selectedMeme: null,
    upperText: '',
    lowerText: '',
    isUploading: false,
    myMemes: [],
  };

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
      this.setState({ memes: res.data.memes, selectedMeme: res.data.memes[0] });
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

  selectMeme = (meme) => {
    // COMPLETAR, asignar la variable selectedMeme del state con `meme` 
    // como parametro de esta funcion
    this.setState({ selectedMeme: meme });
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  postMeme = async (data) => {
    try{
      const { upperText, lowerText, selectedMeme, myMemes } = this.state;
      if(upperText.trim() === '' || lowerText.trim() === ''){
        return alert('Debe llenar un texto superior e inferior');
      }
      if(!selectedMeme){
        return alert('Debe seleccionar un meme');
      }
      this.setState({ isUploading: true });

      const res = await axios.post(MEME_GENERATOR_URL, {
                 memeId: selectedMeme.id, 
                 upper: upperText, 
                 lower: lowerText 
                });
      this.setState({ isUploading: false });
      
      if(res.data.success){
        // si la peticion tiene exito, actualizar el array memes con el nuevo array obtenido del
        // servicio web
        const updated = [...myMemes, res.data.meme];
        // actualizar el state memes
        this.setState({ myMemes: updated, upperText: '', lowerText: '' });
      }else{
        alert('Error al cargar subir su meme')
      }
    }catch(e){
      console.log(e);
      alert('Hubo un error en el servidor o su conexión a internet');
    }
  }

  render(){
    const { memes, isLoadingMemes, selectedMeme, upperText, lowerText, isUploading, myMemes } = this.state;
    return(
      <Container fluid>
        <Row>
          <Col xs={6}>
            {/* POR HACER */}
            <EditMeme
              inputUpper={upperText}
              inputLower={lowerText}
              selectedMeme={selectedMeme}
              uploadMeme={this.postMeme}
              isLoading={isUploading}
              changeInput={this.changeInput}
              />
            <MyMemes 
              data={myMemes}
              />
          </Col>
          {/* Renderizar componente de MemeGallery */}
          <Col xs={6}>
            <MemeGallery
              data={memes}
              isLoading={isLoadingMemes}
              loadMore={this.loadMore}
              selectMeme={this.selectMeme}
              />
          </Col>
        </Row>
      </Container>
    );
  }
}


export default App;
