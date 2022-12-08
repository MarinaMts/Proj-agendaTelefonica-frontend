const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
});

//Categorias
app.get('/cadastroCategorias', (req, res)=>{
    res.render('categoria/index');
});

app.get('/cadastroContatos', (req, res)=>{
    const urlListagemCategoria = 'http://localhost:3000/listarCategoria';
    axios.get(urlListagemCategoria)
        .then((response)=>{
            let categorias = response.data;
            res.render('contato/index',{categorias})
        })
});

app.get('/formEdicaoContatos/:id', (req, res)=>{
    const urlListagemCategoria = 'http://localhost:3000/listarCategoria';
    axios.get(urlListagemCategoria)
        .then((response)=>{
            let categorias = response.data;
            res.render('contato/editarContato',{categorias})
        })
});

app.get('/listagemCategorias', (req, res)=>{
    
    const urlListagemCategoria = 'http://localhost:3000/listarCategoria';
    axios.get(urlListagemCategoria)
        .then(
            (response)=>{
                let categorias = response.data;
                res.render('categoria/listagemCategoria', {categorias});
        }); 
    });

    app.get('/formEdicaoCategorias/:id', (req, res)=>{
        
        let {id} = req.params;
        // console.log(id);
        const urlListagemCategoria = `http://localhost:3000/listarCategoria/${id}`;
        console.log(urlListagemCategoria);
        axios.get(urlListagemCategoria)
        .then(
            (response)=>{
                let categoria = response.data;
                res.render('categoria/editarCategoria', {categoria});
            }
        )
    });

    app.post('/alterarCategoria', (req, res)=>{
        const urlAlterarCategoria = 'http://localhost:3000/alterarCategoria';
        console.log(req.body);
        axios.put(urlAlterarCategoria, req.body)
        .then(
            res.send('ALTERADO!')
        )
    });

    app.get('/excluirCategoria/:id', (req, res)=>{
        let {id} = req.params;
    
        const urlExcluirCategoria = `http://localhost:3000/excluirCategoria/${id}`;
        axios.delete(urlExcluirCategoria)
        .then((response)=>{
            const urlListarCategoria = 'http://localhost:3000/listarCategoria';
            axios.get(urlListarCategoria)
            .then((response)=>{
                let categorias = response.data;
                res.render('categoria/listagemCategoria', {categorias});
            });
        })
    });


//Contatos
    app.get('/cadastroContatos', (req, res)=>{
        res.render('contato/index');
    });
    
app.get('/listagemContatos', (req, res)=>{
    const urlListagemContato = 'http://localhost:3000/listarContato';
    axios.get(urlListagemContato)
        .then(
            (response)=>{
                let contatos = response.data;
                res.render('contato/listagemContato', {contatos});
        }); 
});
    
app.get('/formEdicaoContatos/:id', (req, res)=>{
    let {id} = req.params;
    const urlListagemContato = `http://localhost:3000/listarContato/${id}`;
    axios.get(urlListagemContato)
        .then(
            (response)=>{
                let contato = response.data;
                res.render('contato/editarContato', {contato});
            }
        )
});

app.post('/alterarContato', (req, res)=>{
    const urlAlterarContato = 'http://localhost:3000/alterarContato';
    console.log(req.body);
    axios.put(urlAlterarContato, req.body)
        .then(
            res.send('ALTERADO!')
        )
});

app.get('/excluirContato/:id', (req, res)=>{
    let {id} = req.params;
    const urlExcluirContato = `http://localhost:3000/excluirContato/${id}`;
        axios.delete(urlExcluirContato)
            .then((response)=>{
                const urlListarContato = 'http://localhost:3000/listarContato';
                axios.get(urlListarContato)
                .then((response)=>{
                    let contatos = response.data;
                    res.render('contato/listagemContato', {contatos});
                });
            })
        });


app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});