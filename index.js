console.log("hello !")
var express=require('express');
var app=express();
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1/connected';
const dbName='complaints';
const { WebhookClient } = require('dialogflow-fulfillment');
const { Payload }=require('dialogflow-fulfillment');
console.log("entering");
app.get('/',(req,res)=>{
    res.send("we are livelly");
});
console.log("done");
app.post("/dialogflow", express.json(), (req,res) => {
    const agent = new WebhookClient({request: req, response: res
    });

let db
var name="";var val="";var cid=0000;var myobj={};var phno=0987;
/*
//including bodyParser
const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
*/ 

//connecting mongo to nodejs
/*MongoClient.connect(url,(err,client)=>{
    if(err)
        return console.log("error is:"+ err);
    db=client.db(dbName);           //connects db to node

    console.log(`connected database: ${url}`);
    console.log(`database: ${dbName}`);
})*/

/*app.get('/phno', function(req,res){
    console.log("fetching data from register collection");
    //var s=db.collection('register').find().toArray().then(result=>res.json(result));
    var q=req.query.name;
    if(q)
        db.collection('register').find({'name':new RegExp(q,'i')}).toArray().then(result => res.json(result));
    else
        var data=db.collection('register').find({}).toArray().then(result => res.json(result));
});

app.get('/issues', function(req,res){
    console.log("fetching data from issues collection");
    //var s=db.collection('register').find().toArray().then(result=>res.json(result));
    var q=req.query.name;
    if(q)
        db.collection('register').find({'name':new RegExp(q,'i')}).toArray().then(result => res.json(result));
    else
        var data=db.collection('issues').find({}).toArray().then(result => res.json(result));
});

*/
//app.post('/register',
async function registering(agent){
    client = new MongoClient(url);await client.connect();
    console.log("adding data to register collection");
    name=agent.parameters.name;
    phno=agent.parameters.phno;
    console.log(name+ phno);
    var obj={name:name,phoneno:phno}
    await client.db("complaints").collection('register').insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    //console.log(name);
    custom_payload(agent);
};

function custom_payload(agent)
{   
    var payLoadData={"richContent": [   [
       
        {
            "type": "list",
            "title": "Price Issues",
            "subtitle": "Press '1' for Price Issues",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Missing Product",
            "subtitle": "Press '2' Missing Product",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Payment Fraud",
            "subtitle": "Press '3' for Payment Fraud",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Quality Concerns",
            "subtitle": "Press '4' for Quality Concerns",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "list",
        },
        {
            "type": "list",
            "title": "Product Specific",
            "subtitle": "Press '5' for Product Specific",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Delivery – related ",
            "subtitle": "Press '6' for Delivery – related ",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Refund amount not credited",
            "subtitle": "Press '7' for Refund amount not credited",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Wrong Item Delivered",
            "subtitle": "Press '8' for Wrong Item Delivered",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Order cancelled",
            "subtitle": "Press '9' for Order cancelled",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Products warranty",
            "subtitle": "Press '10' for Products warranty",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "list",
            "title": "Return order not picked",
            "subtitle": "Press '11' for Return order not picked",
            "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
            }
        },
        {
            "type": "divider"
        },

        ]
    ]
    }
    console.log("payload being sent to dialogflow");
    agent.add(new Payload(agent.UNSPECIFIED,payLoadData,{sendAsMessage:true, rawPayload:true }));


};

/*app.post('/issue',function(req,res){
    console.log("adding issue to issues collection");
    var cid = Math.floor(Math.random() * 90000) + 10000;
    var issue=req.body.issue;    var desc=req.body.desc;    var phno=req.body.phno;    var flag=false;
    console.log(cid + phno+ issue +desc);    
    db.collection('register').find({phoneno:phno},{projection:{ _id:0, name:1}}).toArray().then(result => {
        console.log(result+ result.length);
        try{
            if(result.length==0){
                throw ("Looks like you are not registered. Please enter your name");
        } 
            else{
            var obj={cid:cid,phoneno:phno, name:result[0].name, issue: issue, description:desc, status:"Active"}
            db.collection('issues').insertOne(obj, function(err, res) {
                if (err) {
                    throw (err);
            }
                else
                console.log("1 document inserted");
            });  
        }
    }
            catch(e){
                flag=true;
                console.log("please register "+ e+ flag);
            };
    console.log(flag);
    if(flag==true)
        res.send("register yourself");
    else
        res.send("your issue has been registered");
    });
    
});
*/
/*function yn(agent){
        var choice=agent.parameters.
}*/
async function yes(agent){
    client = new MongoClient(url);await client.connect();
    console.log("adding issue to issues collection");
   // var cid = Math.floor(Math.random() * 90000) + 10000;
    phno=agent.parameters.phno;    var flag=false;
    console.log(phno);    
    await client.db("complaints").collection('register').find({phoneno:phno},{projection:{ _id:0, name:1}}).toArray().then(result => {
        console.log(result+ result.length);
        try{
            if(result.length==0){
                agent.add ("Looks like you entered wrong phone number. please retry");
        } 
            else{
               // agent.add("Welcome  "+result[0].name);
           /* var obj={cid:cid,phoneno:phno, name:result[0].name, issue: issue, description:desc, status:"Active"}
            db.collection('issues').insertOne(obj, function(err, res) {
                if (err) {
                    throw (err);
            }
                else
                console.log("1 document inserted");
            });  */

                    name=result[0].name;
                    //console.log(name);
            custom_payload(agent);
            console.log("payload being sent to dialogflow");
            agent.add(new Payload(agent.UNSPECIFIED,payLoadData,{sendAsMessage:true, rawPayload:true }));


        }
    }
            catch(e){
                flag=true;
                // agent.add(e);
            };
    console.log(flag);
    });
    
};

	
function report_issue(agent)
{
 
  var issue_vals={1:"Price Issues",2:"Missing Product",3:"Payment Fraud",4:"Quality Concerns",5:"Product Specific",6:"Delivery – related ",7:"Refund amount not credited",8:"Wrong Item Delivered",9:"Order cancelled",10:"Products warranty",11:"Return order not picked"};
  
  const intent_val=agent.parameters.issue_num;
  
   var val=issue_vals[intent_val];
   console.log("repoting issue");
   cid = Math.floor(Math.random() * 90000) + 10000;

  //Generating trouble ticket and storing it in Mongodb
  //Using random module
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;      
  var dbo = db.db("complaints");
      
    var issue_val=  val; 
    var status="Active";
    console.log("issue reported"+ val);
	let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    var time_date=year + "-" + month + "-" + date;

	 myobj = { issue:issue_val,status:status,time_date:time_date,cid:cid };

    dbo.collection("issues").insertOne(myobj, function(err, res) {
    if (err) throw err;
    db.close();    
    });
});
    console.log(name+" name is ");
 agent.add("Thank you "+name+"\nThe issue reported is: "+ val +"\nComplaint ID is: "+cid);
}

function description(agent){
    desc=agent.parameters.des;
    
        console.log("updating data of ventilators collection");
        var p={phoneno:phno};
        des={$set: {description:desc}};
        db("complaints").collection('ventilators').updateOne(p,des,function(err,res){
            console.log("updated");
        });
        //db.collection('ventilators').find().toArray().then(result => res.send(result));
       // res.send("data updated");
       agent.add("Thank you "+name+"\nThe issue reported is: "+ val +"\nComplaint ID is: "+cid+"\nDescription:"+ desc);
    
}
/*
app.post('/issue',function(req,res){
    console.log("adding issue to issues collection");
    var cid = Math.floor(Math.random() * 90000) + 10000;
    var issue=req.body.issue;    var desc=req.body.desc;    var phno=req.body.phno;    var flag=false;
    console.log(cid + phno+ issue +desc);    
    db.collection('register').find({phoneno:phno},{projection:{ _id:0, name:1}}).toArray().then(result => {
        console.log(result+ result.length);
        try{
            if(result.length==0){
                throw ("Looks like you are not registered. Please enter your name");
        } 
            else{
            var obj={cid:cid,phoneno:phno, name:result[0].name, issue: issue, description:desc, status:"Active"}
            db.collection('issues').insertOne(obj, function(err, res) {
                if (err) {
                    throw (err);
            }
                else
                console.log("1 document inserted");
            });  
        }
    }
            catch(e){
                flag=true;
                console.log("please register "+ e+ flag);
            };
    console.log(flag);
    if(flag==true)
        res.send("register yourself");
    else
        res.send("your issue has been registered");
    });
    
});


*/


/*app.get('/status',function(req,res){
    console.log("checking status of your complaint");
    var phno=req.query.phno; var flag=false;
    console.log(phno);    
    db.collection('issues').find({phoneno:phno},{projection:{ _id:0, issue:1 , description:1, cid:1, status:1}}).toArray().then(result => {
        console.log(result);
        try{
            if(result.length==0){
                throw ("no issue found");
            } 
            else{
            //var obj={cid:cid,phoneno:phno, issue: issue, description:desc, status:status}
            res.json(result)
              
            }
        }
        catch(e){
                flag=true;
                console.log("no issues "+ e+ flag);
            };
    console.log(flag);
    if(flag==true)
        res.send("no issues found");
    });
    
});*/

var intentMap = new Map();
intentMap.set("number", yes);
intentMap.set("number - custom", report_issue);
intentMap.set("lodging - no - custom", registering);
intentMap.set("lodging - no - custom-2", report_issue);
agent.handleRequest(intentMap);

});
app.listen(process.env.PORT || 8000);
//app.listen(3005);