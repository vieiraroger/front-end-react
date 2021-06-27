import React from 'react'
import Axios from 'axios'
import ListaSerie from './ListaSerie'
import FormularioSerie from './FormularioSerie'

export default class Series extends React.Component{


    
    constructor(props){
        super(props)

        this.API_URL = "http://localhost:8080/serie"

        this.state = {
            "series": [],
            "serie": {"titulo": "", "streamming": ""},
            "selecionado": null,
            "search": ""
        }
    }

    selectSerie = (serie) => {
        console.log(serie)
        if(this.state.selecionado === serie){
            this.setState({
                'selecionado': null
            })
        } else {
            console.log("selecionado")
            this.setState({
                'selecionado': serie
            })
            this.render()
        }
    }

    addSerie = (serie) => {
        var requisicao = Axios.post(this.API_URL, serie)
        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllSeries()
            }
        })
    }

    componentDidMount = () => {
        this.getAllSeries()
    }

    getAllSeries = () => {
        console.log("dale")

        var url = this.API_URL
        if(url !== "") {
            url = url + "?streamming=" + this.state.search
        }
        console.log(url)
        var requisicao = Axios.get(url)
        requisicao.then((resposta) => {
            this.setState({
                "series": resposta.data
            })
        })
    }

    getASerie = (serieId) => {
        console.log("dale 123")
        var requisicao = Axios.get(this.API_URL + '/' + serieId)
        
        requisicao.then((resposta) => {
            console.log(resposta)
            this.setState({
                "serie": resposta.data
            })
        })
    }

    deleteSerie = (serieId) => {
        var requisicao = Axios.delete(this.API_URL + '/' + serieId)

        if(this.state.selecionado !== null && this.state.selecionado._id === serieId) {
            this.setState({
                "selecionado": null
            })
        }

        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllSeries()
            }
        })

        
    }

    putSerie = (serie) => {
        if(this.state.selecionado){
            var requisicao = Axios.put(this.API_URL + '/' + this.state.selecionado._id, serie)
            requisicao.then((resposta) => {
                console.log(resposta)
                if(resposta.status === 200){
                    this.setState({"selecionado": null})
                    this.getAllSeries()
                }
            })
        }
    }

    handleSearch = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render(){
        return <div className="container">
            <div className="row">
                <h2>Formulario</h2>
                <div className="col-md-12">
                    <section>
                        <FormularioSerie
                            series={this.state.series}
                            selecionado={this.state.selecionado}
                            add={this.addSerie}
                            put={this.putSerie}>
                        </FormularioSerie>
                    </section>
                </div>
            </div>
            <div className="row">
                <h2>Series:</h2>
                
                <div className="col-md-12">
                    <label for="search">Filtro Streamming:</label>
                    <input className="form-control" type="text" name="search" id="search" onChange={this.handleSearch} value={this.state.search}></input>
                    <button type="button" className="btn btn-primary" onClick={this.getAllSeries}>Refresh</button>
                    <section>
                        <ListaSerie
                            serie={this.state.serie}
                            getASerie={this.getASerie}
                            series={this.state.series}
                            select={this.selectSerie}
                            delete={this.deleteSerie}>
                        </ListaSerie>
                    </section>
                </div>
            </div>
        </div>
            
        
    }

}