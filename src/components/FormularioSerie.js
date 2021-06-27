import React from 'react'

export default class FormularioSerie extends React.Component{

    constructor(props){
        super(props)
        console.log("CONSTRUCTOR")
        if(this.props.selecionado){
            this.state = {
                "titulo": this.props.selecionado.titulo,
                "streamming": this.props.selecionado.streamming,
                "alterado": true
            }
        } else {
            this.state = {
                "titulo": "",
                "streamming": "",
                "alterado": false
            }
        }
    }

    refreshData(){
        console.log("daleeee", this.props.selecionado)
        if(this.props.selecionado){
            this.setState({
                "titulo": this.props.selecionado.titulo,
                "streamming": this.props.selecionado.streamming,
                "alterado": true
            })
        }
        else {
            this.setState({
                "alterado": false
            })
        }
    }

    setSerie = () => {
        if(this.props.selecionado == null) {
            this.props.add({
                "titulo": this.state.titulo,
                "streamming": this.state.streamming
            })
        }
        else {
            this.props.put({
                "titulo": this.state.titulo,
                "streamming": this.state.streamming
            })
        }

        this.setState({
            "alteado": false,
            "titulo": "",
            "streamming": "",
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
                        <label for="streamming">Streamming:</label>
                        <br></br>
                        <input  className="form-control" type="text" name="streamming" id="streamming" onChange={this.handleInput} value={this.state.streamming}></input>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.setSerie}>{name}</button>
                </form>
            </div>
        )
    }
}