import { time } from 'node:console';
import fs from 'node:fs';


let mySave=null;
let recipless=[]

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
        }
    });


  let result={count:recipless.length,recipless:recipless}
  fs.writeFile('missing.json', JSON.stringify(result), 'utf8', (error) => {
    if (error) {
        console.error('An error occurred while writing to the file:', error);
        return;
    }});
    


});
