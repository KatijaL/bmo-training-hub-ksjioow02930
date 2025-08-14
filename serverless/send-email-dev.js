// Simple local dev server for testing submissions
const http = require('http'); const fs = require('fs');
http.createServer((req,res)=>{
  if(req.method==='POST' && req.url==='/api/send-email'){
    let body=''; req.on('data',d=>body+=d);
    req.on('end',()=>{ try{ const data=JSON.parse(body||'{}');
      fs.writeFileSync('dev_submissions.json', JSON.stringify({ ts:Date.now(), ...data }, null,2));
      res.writeHead(200, {'Content-Type':'application/json'}); res.end(JSON.stringify({ok:true}));
    }catch(e){ res.writeHead(500); res.end(e.toString()); }});
  } else { res.writeHead(404); res.end('Not found'); }
}).listen(8080,()=>console.log('Dev send-email at http://localhost:8080/api/send-email'));
