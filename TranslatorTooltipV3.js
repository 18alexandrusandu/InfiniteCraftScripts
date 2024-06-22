// ==UserScript==
// @name        Traslate script
// @namespace   Violentmonkey Scripts
// @match       https://neal.fun/infinite-craft/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/10/2024, 7:19:51 AM
// ==/UserScript==
(async function()
 {  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)
  function getFlagEmoji (countryCode) {
	let codePoints = countryCode.toUpperCase().split('').map(char =>  127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}





  async function make_A_call(text)
  {

    let url ="https://translate.googleapis.com/translate_a/single?";
    url+="client="+"gtx"+"&"
    url+="sl="+"auto"+"&"
    url+="tl="+"en"+"&"
    url+="dt="+"t"+"&"
    url+="q="+text


const options = {
	method: 'GET',

};

try {
   if(!isNumeric(text))
     {
	  const response = await fetch(url, options);
  	const result = await response.json();
	  console.log(result);

   if(result[2]!="en")
   return result[2].toUpperCase()+" "+result[0][0][0];
     }

  return "";
} catch (error) {
	console.error(error);
}

  }





  window.addEventListener('load', async () => {

    make_A_call("copil");

       const instanceObserver = new MutationObserver( async (mutations) => {
                  	for (const mutation of mutations) {
			               if (mutation.addedNodes.length > 0)
			               	for (const node of mutation.addedNodes) {


                               if(node.classList.contains("instance"))
                                 {
                                   let text= node.getAttribute("tooltip");
                                    let toTranslate=""

                                         console.log("exist",node.childNodes)
                                     for(let n of node.childNodes)
                                     {


                                       if(n.nodeType==3 && n.length!=0)
                                         {
                                           console.log("n:",n,"node-type:",n.nodeType)
                                           toTranslate+=n.textContent.trim();

                                         }




                                     }
                                     toTranslate=await make_A_call(toTranslate);

                                     if(text==null)
                                         text="";
                                      text=text+"\n"+toTranslate;
                                      node.setAttribute("tooltip",text);
                                 }

                              }}




                });

                instanceObserver.observe(document.getElementsByClassName("instances")[0], {
                    childList: true,
                    subtree  : true,

                });




  ;},false);




})()