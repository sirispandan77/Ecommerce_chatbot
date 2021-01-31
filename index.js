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

//registering the user is he isn't a registered user

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

// a payload of all possible complaints but user
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

// if a user is registered getting their phone number
async function yes(agent){
    client = new MongoClient(url);await client.connect();
    console.log("adding issue to issues collection");
    phno=agent.parameters.phno;    var flag=false;
    console.log(phno);    
    await client.db("complaints").collection('register').find({phoneno:phno},{projection:{ _id:0, name:1}}).toArray().then(result => {
        console.log(result+ result.length);
        try{
            if(result.length==0){
                throw ("Looks like you entered wrong phone number. please retry");
        } 
            else{              
            name=result[0].name;                   
            custom_payload(agent);
            console.log("payload being sent to dialogflow");
            agent.add(new Payload(agent.UNSPECIFIED,payLoadData,{sendAsMessage:true, rawPayload:true }));
        }
    }
            catch(e){
                flag=true;
                    agent.add(e);
            };
    console.log(flag);
    });
    
};

//getting the issue number from list 	
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

//mapping dialogflow intents to JS functions
var intentMap = new Map();
intentMap.set("number", yes);
intentMap.set("number - custom", report_issue);
intentMap.set("lodging - no - custom", registering);
intentMap.set("lodging - no - custom-2", report_issue);
agent.handleRequest(intentMap);

});
//creating a port to listen
app.listen(process.env.PORT || 8000);