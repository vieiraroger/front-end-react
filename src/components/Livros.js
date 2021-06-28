import React from 'react'
import Axios from 'axios'
import ListaLivro from './ListaLivro'
import FormularioLivro from './FormularioLivro'
import NavBar from './NavBar'
export default class Livros extends React.Component{


    
    constructor(props){
        super(props)

        this.API_URL = "http://localhost:8080/livro"

        this.state = {
            "livros": [],
            "livro": {"titulo": "", "autor": "", "valor": 0},
            "selecionado": null,
            "search": "",
            "message": ""
        }
    }

    selectLivro = (livro) => {
        console.log(livro)
        if(this.state.selecionado === livro){
            this.setState({
                'selecionado': null
            })
        } else {
            console.log("selecionado")
            this.setState({
                'selecionado': livro
            })
            this.render()
        }
    }

    addLivro = (livro) => {
        var requisicao = Axios.post(this.API_URL, livro)
        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllLivros()
            }
        })
        requisicao.catch((error) => {
            this.setState({
                "message": "(400) Requet incorreto"
            })
        })
    }

    componentDidMount = () => {
        this.getAllLivros()
    }

    getAllLivros = () => {
        console.log("dale")

        var url = this.API_URL
        if(url !== "") {
            url = url + "?autor=" + this.state.search
        }
        console.log(url)
        var requisicao = Axios.get(url)
        requisicao.then((resposta) => {
            this.setState({
                "livros": resposta.data
            })
        })
    }

    getALivro = (livroId) => {
        console.log("dale 123")
        var requisicao = Axios.get(this.API_URL + '/' + livroId)
        
        requisicao.then((resposta) => {
            console.log(resposta)
            this.setState({
                "livro": resposta.data
            })
        })
    }

    deleteLivro = (livroId) => {
        var requisicao = Axios.delete(this.API_URL + '/' + livroId)

        if(this.state.selecionado !== null && this.state.selecionado._id === livroId) {
            this.setState({
                "selecionado": null
            })
        }

        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllLivros()
            }
        })

        
    }

    putLivro = (livro) => {
        if(this.state.selecionado){
            var requisicao = Axios.put(this.API_URL + '/' + this.state.selecionado._id, livro)
            requisicao.then((resposta) => {
                console.log(resposta)
                if(resposta.status === 200){
                    this.setState({"selecionado": null})
                    this.getAllLivros()
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
        return <div>
        <NavBar></NavBar><div className="container">
            <div className="row">
                <h2>Formulario</h2>
                {this.state.message !== ""? 
                <div class="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
                : null }
                <div className="col-md-12">
                    <section>
                        <FormularioLivro
                            livros={this.state.livros}
                            selecionado={this.state.selecionado}
                            add={this.addLivro}
                            put={this.putLivro}>
                        </FormularioLivro>
                    </section>
                </div>
            </div>
            <div className="row">
                <h2>Livros:</h2>
                
                <div className="col-md-12">
                    <label for="search">Filtro Autor:</label>
                    <input className="form-control" type="text" name="search" id="search" onChange={this.handleSearch} value={this.state.search}></input>
                    <button type="button" className="btn btn-primary" onClick={this.getAllLivros}>Refresh</button>
                    <section>
                        <ListaLivro
                            livro={this.state.livro}
                            getALivro={this.getALivro}
                            livros={this.state.livros}
                            select={this.selectLivro}
                            delete={this.deleteLivro}>
                        </ListaLivro>
                    </section>
                </div>
            </div>
        </div>
            
        </div>
    }

}