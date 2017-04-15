/**
 * Created by Rohit on 15-Mar-17.
 */
function flip(cardName){
    if(document.getElementById("div-flip-toggler").className.indexOf("flip-flip")>-1){
        document.getElementById("card-body1").innerHTML=document.getElementById(cardName).innerHTML;
    }else{
        document.getElementById("card-body2").innerHTML=document.getElementById(cardName).innerHTML;
    }
    document.getElementById("div-flip-toggler").classList.toggle("flip-flip");
}