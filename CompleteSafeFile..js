// ==UserScript==
// @name       Complete safeFile
// @namespace   Complete safeFile
// @match       https://neal.fun/infinite-craft/*
// @grant       unsafeWindow
// @version     1.0
// @author      -
// @description 6/7/2024, 12:17:13 AM
// ==/UserScript==


(async function()
 { let done=false;
 async function tryFindRecipeFor2(destination,element1,element2,takeText=x=>x)
  { console.log(element1.text,element2.text)
    let response=await unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].getCraftResponse({ text:takeText(element1)}, { text:takeText(element2) });
      console.log("destination:",destination);
      console.log("response:",response.result);
    if(response.result==destination)
         return true;

    return false;


  }

  let finishedLoop=false;
  let usedPreocess=false;
  async function tryFindRecipeFor1_body(i,j,elements,destination)
  {
        setTimeout( async function(){
             console.log("body ",destination);
        console.log(i,j);
          if(j<0)
         {
           i--;
           j=i;
         if(i<0)
           {
           finishedLoop=true;
           done=true;
           }

         }
           if(!finishedLoop)
             {
          let found=await tryFindRecipeFor2(destination,elements[i],elements[j],x=>x.text)
           if(found==true)
             {
                   finishedLoop=true;
               done=true;

             }


          if(!finishedLoop)
               tryFindRecipeFor1_body(i,j-1,elements,destination);


             }
        },500);
  }







   async function tryFindRecipeFor1(destination)
  { console.log("Destination",destination);
    let elements=await unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements;
    let index = elements.findIndex(x => x.text==destination);
    console.log("Index:",index);
    let found=false;
    finishedLoop=false;
    let i=index-1,j=i;
    tryFindRecipeFor1_body(i,j,elements,destination);



  }








  async function fixAlistOfElements(fixable=[])
  {
 let total=fixable.length;
 let index1=0;

 tryFindRecipeFor1(total>0?fixable[index1]:"Water");



    let interval=setInterval( function()
                {
       if(done==true)
         {  done=false;
          index1+=1;
           if(index1>total)
             clearInterval(interval);
              else
             tryFindRecipeFor1(total>0?fixable[index1].text:"Water");


         }



    },




    1000)




  }


async function makeFileInput()
  {
           let settings = document.querySelector(".settings-content");
           let fix_by_brute_settings_container = document.createElement("div");
           let input=  document.createElement("input");
           input.type="file";
           input.addEventListener("change",function(){

            let file= input.files[0];
            console.log("file:",file);
            let reader = new FileReader();
            reader.onload = function(event){
            let  result= JSON.parse(event.target.result)
            let recipes=result.recipes;
            let elements=unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements;
            let recipeless=elements.filter(elm=>!(elm.text in recipes));
            console.log("recipeless:",recipeless);
            fixAlistOfElements(recipeless);


            }
            reader.readAsText(file)

           })
           fix_by_brute_settings_container.appendChild(document.createTextNode('🔧 A 📁 By 🏋️'));
           fix_by_brute_settings_container.appendChild(input);
           settings.appendChild(fix_by_brute_settings_container);

  }







window.addEventListener('load', async () => {
  makeFileInput();

  ;},false);




})()