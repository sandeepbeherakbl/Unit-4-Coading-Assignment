const express = require('express');
const books = require('./book.json');
const app = express();

app.use(express.json());

const auth = (name) =>{
    return (req,res,next) => {
        const originalSendFunc = res.send.bind(res);
        res.send = function(body){
            body.name = "Sandeep"
            console.log(body);
            return originalSendFunc(body)
        };
        next();
    };
};


app.get('/books',( req , res) => {
    res.send( {books});
});


app.post('/books',auth("name"),( req,res) => {
    const new_book = [ ...books,req.body];
    res.send(new_book);
    res.send(({name : "Sandeepta"}))
  
    
})


app.get('/books/:id',(req,res) => {
    const new_book = books.filter((book) => book.id == req.params.id);
    res.send(new_book)
})


app.patch('/books/:id' , (req,res) => {

    const new_book = books.map((book) => {
         
        if(req.params.id == book.id){
            if( req?.body?.id )book.id = req.body.id;
            if( req?.body?.book_name )book.book_name = req.body.book_name;
            if( req?.body?.page_no )book.page_no = req.body.page_no;
            if( req?.body?.published_year )book.published_year = req.body.published_year;
        }
        return book;
    });
      res.send(new_book);
})


app.delete('/books/:id',(req,res) => {
    const book_id = req.params.id 

    const newBook = books.filter((book) => book.id != book_id );
    res.send(newBook);

});

app.listen(2343, function(){
    console.log('Listenning on port 2343')
})