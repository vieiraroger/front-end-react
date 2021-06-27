import React from 'react'

export default class ListaPessoa extends React.Component{


    handleModal(itemId) {
        this.props.getAPessoa(itemId)
        var pessoa = this.props.pessoa
        console.log("AEWWW", pessoa)
    }

    render(){
        var lista = this.props.pessoas
        var elements = ""
        elements = lista.map((item) => {
            return <tr>
                        <th scope="row">{item._id}</th>
                        <td>{item.nome}</td>
                        <td>{item.idade}</td>
                        <td><button type="button" className="btn btn-info" onClick={() => this.handleModal(item._id)} data-toggle="modal" data-target="#exampleModal">Info</button></td>
                        <td><button type="button" className="btn btn-warning" onClick={() => {this.props.select(item)}}>Editar</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={() => {this.props.delete(item._id)}}>Deletar</button></td>
                    </tr>
        })

        return <div>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Nome</th>
            <th scope="col">Idade</th>
            <th scope="col">Info</th>
            <th scope="col">Editar</th>
            <th scope="col">Deletar</th>
          </tr>
        </thead>
            <tbody>
            {elements}
            </tbody>
        </table>
        <div className="modal" id="exampleModal" tabindex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Pessoa: {this.props.pessoa.nome}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Nome: {this.props.pessoa.nome}</p>
                    <p>Idade: {this.props.pessoa.idade}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    }
}