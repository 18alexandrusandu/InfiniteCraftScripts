// ==UserScript==
// @name        Sorting for Dead Elements
// @namespace   Violentmonkey Scripts
// @match       https://neal.fun/infinite-craft/*
// @grant       unsafeWindow
// @version     1.0
// @author      -
// @description 5/11/2024, 7:54:23 PM
// ==/UserScript==
(function(){

  let complexFilter=null;
  let loadSvg=`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="rotate(0 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.9166666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(30 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.8333333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(60 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.75s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(90 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.6666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(120 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5833333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(150 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(180 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.4166666666666667s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(210 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.3333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(240 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.25s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(270 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.16666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(300 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.08333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(330 50 50)"><rect fill="%239760f4" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="0s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>`;
  let loadModal=null;
  let isDead=e=>e.length>30||!e.split(" ").every(x=>x[0]?.toUpperCase()===x[0]&&x.slice(1).toLowerCase()===x.slice(1));

function makeLoadModal(close=false)
  {     let container=document.querySelector(".container");
       console.log("modal making");
     if(loadModal==null)
       {  console.log("first making");

        console.log(container);
    let dialog=document.createElement("div");
     dialog.style.width="300px";
     dialog.style.height="300px";
    let img=document.createElement("img");
    img.src=loadSvg;
    img.style.margin="auto";

    let textNode=document.createElement("p");
    textNode.textContent="Wait for sorting";
    textNode.style.margin="auto";
    dialog.appendChild(img);
    dialog.appendChild(document.createElement("br"));

    dialog.appendChild(textNode);
    dialog.style.background=window.getComputedStyle(document.querySelector(".container")).getPropertyValue("--background-color").trim();
    dialog.style.color=window.getComputedStyle(document.querySelector(".container")).getPropertyValue("--text-color").trim();

       dialog.style.position="absolute";
       dialog.style.top="50%";
       dialog.style.left="50%";


    loadModal=dialog;


       }




        if(close==false)
          {        console.log("open");
                 container.appendChild(loadModal);

          }else
            {
               console.log("closing");
               container.removeChild(loadModal);
             //loadModal.close();
            }


  }







function basePart(applyMatcher)
{         if(complexFilter==null)
           complexFilter=  unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._computedWatchers.sortedElements.getter;


                  console.log("after apply filters",complexFilter());

           unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._computedWatchers.sortedElements.getter=
               exportFunction(() => {
               let returnedByComplexFilter=complexFilter();
              console.log("filtered  at sorting by complex:",returnedByComplexFilter);

             return cloneInto(applyMatcher(returnedByComplexFilter),unsafeWindow);

         }, unsafeWindow);

          unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._computedWatchers.filteredElements.getter=
               exportFunction(() => {
               let returnedByComplexFilter=complexFilter();
              console.log("filtered by complex:",returnedByComplexFilter);

             return cloneInto(applyMatcher(returnedByComplexFilter),unsafeWindow);

         }, unsafeWindow);

}


function All(elements)
  {
     return elements;

  }


function aliveElements(elements)
  {


        let children=elements;

        let savedNodes=[];
        //sortButton
       for(let ch of children)
   {
       let nodeText= ch.text.trim();
        if(!isDead(nodeText))
             {
               savedNodes.push(ch);
             }



   }


     return savedNodes;
 }

 function deadElements(elements)
  {

          console.log("search for dead elements");
        let children=elements;
        let savedNodes=[];
        //sortButton

       for(let ch of children)
   {

      let nodeText= ch.text;

          if(isDead(nodeText))
            {
               savedNodes.push(ch);

            }
   }
     return savedNodes;
  }

  function initialUpdate(applyMatcher)
  {
      let returnedByComplexFilter=complexFilter();
      let matched=applyMatcher(returnedByComplexFilter);





      let targetDiv=document.querySelector(".items-inner + div");
      let sourceDiv=document.querySelector(".items-inner");
      let items= sourceDiv.children;
         targetDiv.replaceChildren();
            for(let item of items)
              {
                 let text= item.childNodes[1].textContent.trim();

                 if(matched.some(elm=>elm.text==text))
                   {

                     console.log("YES");





                    let clone=item.cloneNode(true);
                        clone.addEventListener("mousedown",(e)=>{

                                         unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].selectElement(e,elements[0]);
                                         });
                        clone.addEventListener("touchStart",(e)=>{

                                         unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].mobileSelectElement(e,elements[0]);
                                         });
                     targetDiv.appendChild(clone);



                   }


              }
              console.log("NO");
           targetDiv.style.display="block";
           sourceDiv.style.display="none";

  }
