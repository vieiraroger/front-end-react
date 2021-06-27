import React from 'react'

export default class FormularioPessoa extends React.Component{

    constructor(props){
        super(props)
        console.log("CONSTRUCTOR")
        if(this.props.selecionado){
            this.state = {
                "nome": this.props.selecionado.nome,
                "idade": this.props.selecionado.idade,
                "alterado": true
            }
        } else {
            this.state = {
                "nome": "",
                "idade": 0,
                "alterado": false
            }
        }
    }

    refreshData(){
        console.log("daleeee", this.props.selecionado)
        if(this.props.selecionado){
            this.setState({
                "nome": this.props.selecionado.nome,
                "idade": this.props.selecionado.idade,
                "alterado": true
            })
        }
        else {
            this.setState({
                "alterado": false
            })
        }
    }

    setPessoa = () => {
        if(this.props.selecionado == null) {
            this.props.add({
                "nome": this.state.nome,
                "idade": this.state.idade
            })
        }
        else {
            this.props.put({
                "nome": this.state.nome,
                "idade": this.state.idade
            })
        }

        this.setState({
            "alteado": false,
            "nome": "",
            "idade": 0,
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
                        <label for="nome">Nome:</label>
                        <br></br>
                        <input  className="form-control" type="text" name="nome" id="nome" onChange={this.handleInput} value={this.state.nome}></input>
                    </div>
                    <div className="form-group">
                        <label for="idade">Idade:</label>
                        <br></br>
                        <input className="form-control" type="number" name="idade" id="idade" onChange={this.handleInput} value={this.state.idade}></input>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.setPessoa}>{name}</button>
                </form>
            </div>
        )
    }
}