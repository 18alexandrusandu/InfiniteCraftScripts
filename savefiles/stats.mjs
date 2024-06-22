import { time } from 'node:console';
import fs from 'node:fs';


let mySave=null;
let recipless=[]
let recipes=0;

fs.readFile('result.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  mySave= JSON.parse(data)
 // console.log(mySave);
  
 mySave["elements"].forEach((element,index)=>
    {
      if(!(element.text in mySave["recipes"] ))
        {
            recipless.push({text:element.text, timeIndex:index});
		   
        }else
		{
		 recipes+=mySave["recipes"][element.text].length
		}
		
		
		
    });
 let forBytes={ elements: mySave["elements"]}
 
 let bytes=Buffer.byteLength(JSON.stringify(forBytes));
 const megabytes = bytes / 1048576;
 
   let Allbytes=Buffer.byteLength( JSON.stringify(mySave));
    console.log("Total lenght in bytes:",Allbytes);
 

    console.log("There are:",mySave["elements"].length," elements ","with ",megabytes," MB",recipes," recipes",recipless.length," elements without recipes");


});
