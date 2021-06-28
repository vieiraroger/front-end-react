import React from 'react'

export default class NavBar extends React.Component{
    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="http://localhost:3000/livro">Livros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/serie">Series</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/pessoa">Pessoas</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}