const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const views = '../public/views/';
const styles = '../public/styles/';
const pictures = views + 'pictures/';
const hostname = '0.0.0.0';
const port = 3000;


const server = http.createServer((req,res)=>{
    var q = url.parse(req.url,true);
    var filename = path.basename(q.pathname);
    if(filename == 'style.css')
    {
        fs.readFile(styles + filename, (err, css) => {
            if(err)
            {
            }
            else
            {
                res.statusCode = 200;
                res.setHeader('Content-type','text/css');
                res.write(css);
                res.end();
             }
        });
    }
    else if(filename == 'favicon.ico')
    {
        fs.readFile(views + filename, (err, ico) => {
            if(err)
            {
            }
            else
            {
                res.statusCode = 200;
                res.setHeader('Content-type','ico');
                res.write(ico);
                res.end();
             }
        });
    }
    else if((filename == 'hiking.jpg')||(filename == 'olymp_marble_d.png'))
    {
        fs.readFile(pictures + filename, (err, data) => {
            if(err)
            {
            }
            else
            {
                res.statusCode = 200;
                res.setHeader('Content-type','image/jpg');
                res.write(data);
                res.end();
            }
        });
    }
    else if((filename == 'resume')||
    (filename == 'hobbies')||(filename == 'contact')||(filename == ''))
    {
        fs.readFile(views + filename + '/index.html', (err, html) => {
            if(err)
            {
            }
            else
            {
                res.statusCode = 200;
                res.setHeader('Content-type','text/html');
                res.write(html);
                res.end();
            }
        });
    }
    else if(filename == 'myScript.js')
    {
        fs.readFile(views + filename, (err, js) => {
            if(err)
            {
            }
            else
            {
                res.statusCode = 200;
                res.setHeader('Content-type','js');
                res.write(js);
                res.end();
            }
        });
    }
    else
    {
        fs.readFile('../public/views/not_found/index.html', (err, html) => {
            if(err)
            {
            }

            res.statusCode = 200;
            res.setHeader('Content-type','text/html');
            res.write(html);
            res.end();
        });
    }
});

server.listen(port, hostname, ()=> {
});
