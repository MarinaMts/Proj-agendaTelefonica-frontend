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
})

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
        const urlListagemCategoria = `http://localhost:3000/listarCategoria/${id}`;
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


app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});