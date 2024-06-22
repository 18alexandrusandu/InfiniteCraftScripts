import fs from 'node:fs';
import { clearInterval } from 'node:timers';
import { exec  } from "node:child_process";

let done=false;
let mySave=null;
let filesSaves=[]
let mySaved=0;

fs.readFile('mine.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  mySave= JSON.parse(data)
 // console.log(mySave);
 mySaved=1;



});

let count=0;
let countDown=0;

console.log("PATH:",fs.realpathSync('./'));

fs.readdir('./', (err, files) => {
  console.log("FILES:",files);
 
  const regExpLiteral = /^save/;
 for(let file of files)
    { console.log("file before:",file);
      
    if(regExpLiteral.test(file))
     { 
      count+=1;
      console.log("file after:",file);
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          countDown+=1;
          console.error(err);
          return;
        }
        countDown+=1;
        filesSaves.push(JSON.parse(data));
      
      
      
      
      });

     }
   


    }

      let interval=setInterval(async function(){ if(countDown==count && mySaved==1)
      
        {   let addedElements=0;
          do{
          let countFixed=0;
          addedElements=0;
          let fixedElemns=[]
          let fixedRecipesCount=0;
          
          let listAddedElements=[]
          
          countDown=-1;
          console.log("files read");


          for(let element of mySave["elements"])
            {
              if(!(element.text in mySave["recipes"] ))
                {
                  for(let savefile of filesSaves)
                    {
             
                           if(element.text in savefile["recipes"])
                              {  
                                console.log(element ,"found!!!!");
                                console.log(savefile["recipes"][element.text]);
                                mySave["recipes"][element.text]=savefile["recipes"][element.text];
                                countFixed++;
                                fixedElemns.push(element.text);


                              }


             
                    }
             
            

                }}
                //await new Promise(resolve => setTimeout(resolve, 1000));
                     console.log(`fixed ${countFixed} elements`);
                     console.log(`elements fixed: ${fixedElemns}`);

                     console.log(`Add elements missing from recipes stage`);
                     let neKeys=Object.keys(mySave["recipes"] ).length;
                     let foundRecipes=0; 
                    for(let recipe in mySave["recipes"]  )
                         { foundRecipes++;
                          let recipeObject=mySave["recipes"][recipe][0]; 
                          if(recipeObject!=null){
                          let first=recipeObject[0].text
                          let second=recipeObject[1].text
                          //console.log("fs:",first,second)


                          let array1=mySave["elements"].find(x=>x.text==first);
                          let array2=mySave["elements"].find(x=>x.text==second);

                          if(array1==null || array2==null)
                           {
                                console.log("missing element:",first)

                                for(let savefile of filesSaves)
                                  {   let elem=null;
                                            if(array1==null && (elem=savefile.elements.find(x=>x.text==first)))
                                               {
                                                  if(elem!=null)
                                                    {
                                                         if("discovered" in elem)
														  elem["discovered"]=false;

 													mySave["elements"].push(elem)
                                                      console.log("added elem",elem)
                                                      addedElements++;
                                                      listAddedElements.push(elem.text)
                                                      break;
                                                    }
                                               }
                                               elem=null;
                                               if(array2==null && (elem=savefile.elements.find(x=>x.text==second)))
                                                {

                                                   if(elem!=null)
                                                     { mySave["elements"].push(elem)
                                                       console.log("added elem",elem)
                                                       addedElements++;
                                                       listAddedElements.push(elem.text)
                                                       break;
                                                     }
                                                }
                                  }




                           }

                  
                          }
                          console.log(`traversed:${foundRecipes} out of ${neKeys}`);

                         
                        }
                         console.log(`added ${addedElements} elements`)
                         console.log(`added elements: ${listAddedElements}`)
                         console.log(`fixed ${countFixed} elements`);
                         console.log(`elements fixed: ${fixedElemns}`);


                         mySave["elements"] = mySave["elements"].filter((el,index)=> mySave["elements"].indexOf(mySave["elements"].find(e=>e.text==el.text))==index   )
                           
                      let newText=JSON.stringify(mySave);

                   if(addedElements==0)
                      fs.writeFile('result.json', newText, 'utf8', (error) => {
                        if (error) {
                            console.error('An error occurred while writing to the file:', error);
                            return;
                        }
                        
 


      
                        console.log('File has been written successfully.');
                    });
                   else
                   {

                    fs.writeFile('mine.json', newText, 'utf8', (error) => {
                      if (error) {
                          console.error('An error occurred while writing to the file:', error);
                          return;
                      }
                      
                      console.log('File  mine has been written successfully.');
                   
                  });
                      

                   }
                  }while(addedElements!=0);

          
                       clearInterval(interval);  


        }
        
      
        
      
      
      },100);



});

