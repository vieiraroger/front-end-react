import React from 'react'

export default class FormularioLivro extends React.Component{

    constructor(props){
        super(props)
        console.log("CONSTRUCTOR")
        if(this.props.selecionado){
            this.state = {
                "titulo": this.props.selecionado.titulo,
                "autor": this.props.selecionado.autor,
                "valor": this.props.selecionado.valor,
                "alterado": true
            }
        } else {
            this.state = {
                "titulo": "",
                "autor": "",
                "valor": 0,
                "alterado": false
            }
        }
    }

    refreshData(){
        console.log("daleeee", this.props.selecionado)
        if(this.props.selecionado){
            this.setState({
                "titulo": this.props.selecionado.titulo,
                "autor": this.props.selecionado.autor,
                "valor": this.props.selecionado.valor,
                "alterado": true
            })
        }
        else {
            this.setState({
                "alterado": false
            })
        }
    }

    setLivro = () => {
        if(this.props.selecionado == null) {
            this.props.add({
                "titulo": this.state.titulo,
                "autor": this.state.autor,
                "valor": this.state.valor
            })
        }
        else {
            this.props.put({
                "titulo": this.state.titulo,
                "autor": this.state.autor,
                "valor": this.state.valor
            })
        }

        this.setState({
            "alteado": false,
            "titulo": "",
            "autor": "",
            "valor": 0,
        })
    }

    handleInput = (event) => {
        this.setState({
            "alterado": true,
            [event.target.id]: event.target.value
        })
    }

    render() {
        var selecionado = this.props.selecionado ? this.props.selecionado._id : null
        var name = ""
        if(selecionado) {
            name = "Atualizar"
            if(!this.state.alterado) {
                this.refreshData()
            }
        }
        else {
            name = "Inserir"
            if(this.state.alterado) {
                this.refreshData()
            }
        }
        return(
            <div>
                <div>{selecionado}</div>
                <form>
                    <div className="form-group">
                        <label for="titulo">Titulo:</label>
                        <br></br>
                        <input  className="form-control" type="text" name="titulo" id="titulo" onChange={this.handleInput} value={this.state.titulo}></input>
                    </div>
                    <div className="form-group">
                        <label for="autor">Autor:</label>
                        <br></br>
                        <input className="form-control" type="text" name="autor" id="autor" onChange={this.handleInput} value={this.state.autor}></input>
                    </div>
                    <div className="form-group">
                        <label for="valor">Valor:</label>
                        <br></br>
                        <input className="form-control" type="number" name="valor" id="valor" onChange={this.handleInput} value={this.state.valor}></input>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.setLivro}>{name}</button>
                </form>
            </div>
        )
    }
}