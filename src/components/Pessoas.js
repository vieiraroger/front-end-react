import React from 'react'
import Axios from 'axios'
import ListaPessoa from './ListaPessoa'
import FormularioPessoa from './FormularioPessoa'
import NavBar from './NavBar'

export default class Pessoas extends React.Component{


    
    constructor(props){
        super(props)

        this.API_URL = "http://localhost:8080/pessoa"

        this.state = {
            "pessoas": [],
            "pessoa": {"nome": "", "idade": 0},
            "selecionado": null,
            "search": "",
            "message": ""
        }
    }

    selectPessoa = (pessoa) => {
        console.log(pessoa)
        if(this.state.selecionado === pessoa){
            this.setState({
                'selecionado': null
            })
        } else {
            console.log("selecionado")
            this.setState({
                'selecionado': pessoa
            })
            this.render()
        }
    }

    addPessoa = (pessoa) => {
        var requisicao = Axios.post(this.API_URL, pessoa)
        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllPessoas()
            }
        })
        requisicao.catch((error) => {
            this.setState({
                "message": "(400) Requet incorreto"
            })
        })
    }

    componentDidMount = () => {
        this.getAllPessoas()
    }

    getAllPessoas = () => {
        console.log("dale")

        var url = this.API_URL
        if(url !== "") {
            url = url + "?nome=" + this.state.search
        }
        console.log(url)
        var requisicao = Axios.get(url)
        requisicao.then((resposta) => {
            this.setState({
                "pessoas": resposta.data
            })
        })
    }

    getAPessoa = (pessoaId) => {
        console.log("dale 123")
        var requisicao = Axios.get(this.API_URL + '/' + pessoaId)
        
        requisicao.then((resposta) => {
            console.log(resposta)
            this.setState({
                "pessoa": resposta.data
            })
        })
    }

    deletePessoa = (pessoaId) => {
        var requisicao = Axios.delete(this.API_URL + '/' + pessoaId)

        if(this.state.selecionado !== null && this.state.selecionado._id === pessoaId) {
            this.setState({
                "selecionado": null
            })
        }

        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllPessoas()
            }
        })

        
    }

    putPessoa = (pessoa) => {
        if(this.state.selecionado){
            var requisicao = Axios.put(this.API_URL + '/' + this.state.selecionado._id, pessoa)
            requisicao.then((resposta) => {
                console.log(resposta)
                if(resposta.status === 200){
                    this.setState({"selecionado": null})
                    this.getAllPessoas()
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
        return  <div>
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
                        <FormularioPessoa
                            pessoas={this.state.pessoas}
                            selecionado={this.state.selecionado}
                            add={this.addPessoa}
                            put={this.putPessoa}>
                        </FormularioPessoa>
                    </section>
                </div>
            </div>
            <div className="row">
                <h2>Pessoas:</h2>
                
                <div className="col-md-12">
                    <label for="search">Filtro Nome:</label>
                    <input className="form-control" type="text" name="search" id="search" onChange={this.handleSearch} value={this.state.search}></input>
                    <button type="button" className="btn btn-primary" onClick={this.getAllPessoas}>Refresh</button>
                    <section>
                        <ListaPessoa
                            pessoa={this.state.pessoa}
                            getAPessoa={this.getAPessoa}
                            pessoas={this.state.pessoas}
                            select={this.selectPessoa}
                            delete={this.deletePessoa}>
                        </ListaPessoa>
                    </section>
                </div>
            </div>
        </div>
    </div>
        
    }

}