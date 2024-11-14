var express = require('express');
var router = express.Router();
var db = require('../config/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/libros',(req, res, next) => {
  const sql = 'SELECT * FROM libros';
  db.query(sql, (error, resultados) => {
    if (error){
      console.log('Error en la consulta', error );
    }
    res.render('libros', {libros : resultados});
    //res.json(resultados);
  } );
 
});

router.get('/formLibro',  function(req, res, next){
res.render('formulario');
});


router.post('/nuevoLibro',(req,res,next)=>{
  console.log(req.body);
  //const titulo = req.body.titulo;
  //const autor = req.body.autor;
  const {titulo,autor}= req.body
  const sql = "INSERT INTO libros(titulo,autor) VALUES( ? , ? )";

  db.query(sql,[titulo,autor], (err,result)=>{
    if(err){
      console.error('ERROR',err)
      return res.status(500).send("error al guardar")
    }else{
      console.log(result)
      res.render('creado',{nuevo:
        {
          id : result.insertId,
          titulo: titulo,
          autor:autor
        }
      });
    } 
  });

});


router.get('/detalleLibro',(req,res,next)=>{
    //recuperar datos de la lista
    const libroid = req.query.id;
    // validacion, que si exista el id del que quieres mostrar detalle
    sql = "SELECT * FROM libros WHERE id = " + libroid;
    db.query(sql,(error, resultado) => {
      if (error){
        // Mandar vista de error 
        console.log(error);
      }else{
        res.render('detalle',{libro:resultado[0]});
      }
    });

  });

module.exports = router;
