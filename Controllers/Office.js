
// modelsusers 
const modelofOffice = require("../Models/Office"); // import model of Counter

exports.getOfficeDatas = (req, res) =>{

    modelofOffice.findOne() // saving new objet in data base
        .then((datas)=> {

            if(datas){
                res.status(200);
                res.json(datas);
        }

            else{
                console.log("Aucun Compteur");
                res.status(404);
                res.json({msg: "Error"});
            }
            
    })
    .catch(error =>{
        console.log(error);
        console.log("Aucun Compteur");
        res.status(500);
        res.json({msg: "Error"});
    });
};

exports.changeState = (req, res) =>{       
                modelofOffice.updateOne({
                    $set:{
                        StateRotation:true,
                    }
                }).then(()=>{
                     res.status(200);
                    res.json({msg: "Counter datas updated"});
                })
                .catch(()=>{
                    console.log("Echec mis a jour");
                    res.status(404);
                    res.json({msg: "Echec mis a jour"});
                })
                   
            }

