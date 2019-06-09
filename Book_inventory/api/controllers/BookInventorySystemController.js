/**
 * BookInventorySystemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    addBook722: function(req,res){
        console.log("in addbook");
        var bk_name = req.query.bookName;
        var bk_id = req.query.bookId;
        var auth_name = req.query.authorName;
        var auth_email = req.query.authorEmail;
        console.log("in addBook722",bk_name);
        BookInventorySystem.create({book_name: bk_name, book_id: bk_id}).exec(function (err){
            if(err){
                console.log("oh nooo",err);
            }
            console.log("inserted book",bk_id);
            AuthorInformation.create({author_name: auth_name, book_id: bk_id, author_email: auth_email, book_name: bk_name}).exec(function (err){
                console.log("inserted author", auth_name);
                res.ok();
            });
        });
       
        
    },

    deleteAuthorInfo722: function(req,res){
        var auth_name = req.query.authorName;
        console.log("input", auth_name);
        AuthorInformation.find({author_name: {contains : auth_name}}).exec(function(err,authInfo){
            console.log(authInfo);
            if(authInfo === undefined || authInfo.length == 0)
            {
                console.log("Cannot find the Author!");
                res.json({deleted:false});
            }
            else {
                AuthorInformation.destroy({author_name: {contains : auth_name}}).exec(function(err){
                    console.log("deleted author info");
                    res.json({deleted:true});
                });
            }
        });
    },

    retrieveAuthorBooks722: function(req,res){
        var auth_name = req.query.authorName;
        console.log(auth_name);
        var info = [];

        AuthorInformation.find({author_name: {contains : auth_name}}).exec(function(err,authInfo){
            var len = authInfo.length;
            console.log("Found author books: ",len);
            console.log(authInfo);
            if(authInfo === undefined || authInfo.length == 0)
            {
                res.json({found: false});
            }
            else{
                for (var i=0; i < len ; i++){
                    info.push({
                        book_name: authInfo[i].book_name,
                        book_id: authInfo[i].book_id
                    });
                    }
                    info.push({found:true});
                   res.json(info);
            }
        });
    },

    retrieveBookInfo722: function(req,res){
        var bk_name = req.query.bookName;
        var info = {};
        
        BookInventorySystem.find({book_name: bk_name}).exec(function(err,bookInfo){
            var len = bookInfo.length;
            console.log("Found book info");
            console.log(bookInfo);
            if(bookInfo === undefined || bookInfo.length == 0)
            {
                res.json({found: false});
            }
            else{
                info.bookId = bookInfo[0].book_id;
                AuthorInformation.find({book_id: info.bookId}).exec(function(err,authInfo){
                console.log("found book info",authInfo[0]);
                info.authorName = authInfo[0].author_name;
                info.authorEmail = authInfo[0].author_email;
                info.found = true;
                res.json(info);
            });
            }
        });
    }
};

