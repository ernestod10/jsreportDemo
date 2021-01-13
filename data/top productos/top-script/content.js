const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Demo_Ambiente',
  password: '0809', 
  port: 5432,
});

function beforeRender(req, res, done) {
 const min = req.data.min;
  const max = req.data.max;
db.connect();
 

  let query = "select s.nombre_producto as nombre, count(s.*) as total from importado c inner join producto s on c.producto_id_producto = s.id_producto group by nombre order by total desc limit 10";

  db.query(query, (err, result) => {
    
    console.log(err);
    req.data = {
      rows: result.rows
      
    };
    db.end();
    done();
  });
}