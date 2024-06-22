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


function All()
  {
     return complexFilter();

  }


function aliveElements(elements)
  {


        let children=elements;

        let savedNodes=[];
        //sortButton
        console.log("alive sorting starts here","before sorting:",elements);
       for(let ch of children)
   {
       let nodeText= ch.text.trim();


      let length=nodeText.length;

        if(length>=30)
          {
              continue ;
          }
     else
       {
         let ok=true;
         let tokens=nodeText.split(/\s+/);
         if(tokens.length>1)
           {


              for(let token of tokens)
             {
               if(ok==false)
                  break;
                if((token[0]>='A' && token[0]<='Z') || token[0]=="\"" || token[0]==".")
                  {

                 //   console.log(token,"substring",token.substring(1));

                    for(let t of token.substring(1))
                    {
                      if(t>='A' && t<='Z')
                        {
                          ok=false;
                         break;


                        }

                    }
                  }

             }



           }
            if(ok==true)
             {
               savedNodes.push(ch);
             }
   }



       }
     //console.log(nodeText,nodeText.length);
 console.log("after filtering  alive",savedNodes);
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
      let length=nodeText.length;
        if(length>=30)
          {
            savedNodes.push(ch);
          }
     else
       {

         let tokens=nodeText.split(/\s+/);
         if(tokens.length>1)
           {
             let ok=true;
              for(let token of tokens)
             {
               if(ok==false)
                  break;
                if((token[0]>='A' && token[0]<='Z') || token[0]=="\"" || token[0]==".")
                  {

                   // console.log(token,"substring",token.substring(1));

                    for(let t of token.substring(1))
                    {
                      if(t>='A' && t<='Z')
                        {
                          ok=false;
                          savedNodes.push(ch);
                          break;


                        }

                    }
                  }

             }



           }


   }



       }
     //console.log(nodeText,nodeText.length);
    console.log("after filtering  dead",savedNodes);
     return savedNodes;
  }

  function initialUpdate(applyMatcher)
  {
      let returnedByComplexFilter=complexFilter();
      let matched=applyMatcher(returnedByComplexFilter);





      let targetDiv=document.querySelector(".items-inner + div");
      let sourceDiv=document.querySelector(".items-inner");
      let items= sourceDiv.children;
         targetDiv.textContent="";
            for(let item of items)
              {
                 let text= item.childNodes[1].textContent.trim();

                 if(matched.some(elm=>elm.text==text))
                   {
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
           targetDiv.style.display="block";
           sourceDiv.style.display="none";

  }





















         let mode=0;
         let hidden=1;
  function  switchTheStyleDeads()
   {
     console.log("switch the style");
     makeLoadModal(false);


       setTimeout(function(){
     switch(mode)
       {
         case 1:
           {
              console.log("dead");
            basePart(deadElements);
            initialUpdate(deadElements);
           };break;
         case 2:
           {

              console.log("alive");
              basePart(aliveElements);
              initialUpdate(aliveElements);

           };
           break;
           default :
           {
              basePart(All);
              initialUpdate(All);

           }
           ;break;


       }
        console.log("out of switch");
        makeLoadModal(true);
         },5000);
       // loadModal.close();
   }


         function makeButton()
          {
          let modes=["All","Dead","Alive"]

            let settings                 = document.querySelector(".settings-content");
            let theme_settings_container = document.createElement("div");
            let ThemeButton              = theme_settings_container;
            console.log("seetings",settings);


            if(settings==null)
              {


                 settings                                = document.querySelector(".container");
                 theme_settings_container.style.position = 'absolute';
                 theme_settings_container.style.left     = '20px';
                 theme_settings_container.style.top      = '200px';
                 theme_settings_container.style.width    = '500px';
                 theme_settings_container.style.height   = '50px';

                 theme_settings_container.classList.add('theme_settings_cont');



              }
             else
              {
                 theme_settings_container.classList.add('setting');


              }

            theme_settings_container.appendChild(document.createTextNode('Sort for dead elements'));
            let optionsdiv=document.createElement("div");
            let selectedP=document.createElement("p");
            selectedP.textContent=modes[mode];
            selectedPrompt=selectedP;
            optionsdiv.classList.add('theme_settings_opt');
            let dropdown=optionsdiv;

            optionsdiv.style.height="100px";


            optionsdiv.style.overflowY="scroll";
            dropdown.id = "dropdown_theme";

            let index=0;

            for(let m of modes)
              {

                let option             = document.createElement("p");
                 option.classList.add("theme");
                 option.addEventListener("click",function(event,index,optionsdiv)
                                        {
                   console.log("event:",event);
                   console.log("index:",index);
                   console.log("opt:",optionsdiv);



                   optionsdiv.stopPropagation();
                   console.log("index:",event);


              mode   = event;
              selectedP.textContent=modes[mode];
              option.style.whiteSpace="nowrap";
              option.style.overflow="hidden";

              console.log("optdiv:",optionsdiv);
              console.log("fatherButton here is :",ThemeButton);

               switchTheStyleDeads();
               console.log("done switching");
                 }.bind(event,index,optionsdiv));


                option.textContent = m;
                option.style.whiteSpace="nowrap";
                option.style.overflow="hidden";
                //option.style.textOverflow="ellipsis";

                optionsdiv.appendChild(option);
                index=index+1;


              }

            let selectionDiv=document.createElement("div");

            selectedP.addEventListener("click",function(){
              selectionDiv.appendChild(optionsdiv);
                hidden=1;

            },false);

            selectionDiv.appendChild(selectedP);




            theme_settings_container.addEventListener("click",function(){
               console.log("hidden here:",hidden);


             if(hidden==1)
               {

                   if(!theme_settings_container.contains(selectionDiv))
                  theme_settings_container.appendChild(selectionDiv);

                  hidden = 0;

               }else
                 {   if(selectionDiv.contains(optionsdiv))
                         selectionDiv.removeChild(optionsdiv);

                    if(theme_settings_container.contains(selectionDiv))
                   theme_settings_container.removeChild(selectionDiv);
                   hidden = 1;
                 }


             },false);

        settings.appendChild(theme_settings_container);



          }



    function injectCSS() {

        let css = `
         .theme:hover
             {
               background:gray;

             }

        .theme_settings_cont
        {

        scrollbar-width: none;

        }
        .theme_settings_opt {
            overflow-y: scroll;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* Internet Explorer 10+ */}
         .theme_settings_opt::-webkit-scrollbar { /* WebKit */
            width: 0;
            height: 0;}
        `


        let style = document.createElement('style');
        style.appendChild(document.createTextNode(css.trim()));
        document.getElementsByTagName('head')[0].appendChild(style);


    }


    window.addEventListener('load', async () => {
        console.log("Welcome to hijack sorting");
           injectCSS();
           makeButton();

          console.dir();


        //  console.dir(searchBar);


    }, false);
})();