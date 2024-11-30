// nodemailer importing
const nodemailer = require("nodemailer");

// modelsusers 
const modelOfUsers = require("../Models/Users"); // import model of Users
const modelOfCounter = require("../Models/Office"); // import model of Counter

// controller Check Auth user
exports.deleteUser =(req, res)=>{
        //search user in dataBase
        console.log(req.params);
        modelOfUsers.deleteOne({_id:req.params.id})
        .then(() =>{

            // delete counter datas
            modelOfCounter.deleteOne({userId:req.params.id})
            .then(datas=>{
                console.log("user and counter deleted");
                res.status(200).json("user Deleted");
            })
            
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        })        
};

// controller Check Auth user
exports.logout =(req, res)=>{
    //search user in dataBase
    console.log(req.body);
    modelOfUsers.updateOne({_id:req.body.id},{
        $set:{
            socketID:null
        }
    })
    .then(()=>{
        console.log("user Logout")
        res.status(200).json({msg:"User Logout"});
    })

    .catch((error)=>{
        console.log(error);
        res.status(500).json({msg:"Deconnexion echouée, Error Server"});
    })
};

exports.getAllUsers =(req, res)=>{

    //Querry datas
    const parameters = req.params;
    const query = req.query;

    //type of Filter datas
    const status ={
        ALL:"ALL",
        ACTIVE:"ACTIVE",
        DESACTIVE:"DESACTIVE",
    }
    
    //filter datas
    const filter ={
        useRole:parameters.useRole
    }

    // check status filter
    switch(parameters.status){
        case status.ACTIVE:{
            filter.isActive = true;
            break;
        };
        case status.DESACTIVE:{
            filter.isActive = false;
            break;
        };
        default:{
            console.log("Return all datas");
        }
    }
    console.log(parameters);
    console.log(query);

        //if Keyword content value
        if(query.keyword){
                modelOfUsers.find(
                    {$text: {$search: query.keyword, $language: "fr" }}, 
                    {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
                .then(userFund =>{
                        res.status(200).json({msg:"Tout les utilisateurs du reseau", AllUsers:userFund});
                    
                })
                .catch(error =>{
                    console.log(error);
                    res.status(500).json({error});
                }) 
            }

        else{
        //search AllStudents in dataBase
        modelOfUsers.find(filter)
        .then(userFund =>{
                res.status(200).json({msg:"Tout les utilisateurs du reseau", AllUsers:userFund});
            
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        }) 
        }
          
};
