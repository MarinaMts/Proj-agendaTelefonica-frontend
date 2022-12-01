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

app.get('/cadastroCategorias', (req, res)=>{
    res.render('categoria/index');
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

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});