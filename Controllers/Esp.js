
// modelsusers 
const modelofOffice = require("../Models/Office"); // import model of Counter

exports.saveEspDatas = (req, res) =>{
    const reqDatas = req.query;
    console.log(reqDatas);
    console.log("send datas");

    modelofOffice.findOne() // saving new objet in data base
        .then((OfficeDatas)=> {
            if(OfficeDatas){
                modelofOffice.updateOne({
                    $set:{
                        StateEndOfRaceTop: reqDatas.StateEndOfRaceTop == '1'? true: false,
                        StateEndOfRaceBottom: reqDatas.StateEndOfRaceBottom == '1'? true: false,
                    }
                }).then(()=>{
                    console.log(OfficeDatas);
               
                    res.status(200);
                    res.json({
                        StateRotations:OfficeDatas.StateRotation,
                        StateEndOfRaceTop:reqDatas.StateEndOfRaceTop,
                        StateEndOfRaceBottom :reqDatas.StateEndOfRaceBottom})
                })
                .catch(()=>{
                    console.log("Echec mis a jour");
                    res.status(404);
                    res.json({msg: "Echec mis a jour"});
                })
                
            }

            else{
                console.log("Aucun Cabine");
                res.status(404);
                res.json({msg: "Error : Auncun Cabine"});
            }
            
    })
    .catch(error =>{
        console.log(error);
        console.log("Aucun cabine");
        res.status(500);
        res.json({msg: "Error: Auncun Cabine"});
    });
};

exports.changeState = (req, res) =>{       
    modelofOffice.updateOne({
        $set:{
            StateRotation:false,
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
