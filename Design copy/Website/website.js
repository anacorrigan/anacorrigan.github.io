

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      
     
  }



//gradient following cursor:
// Set-up to use getMouseXY function onMouseMove
document.onmousemove = getMouseXY;

// Temporary variables to hold mouse x-y pos.s
var tempX = 0
var tempY = 0

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;


// Main function to retrieve mouse x-y pos.s

function getMouseXY(e) {
   // grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
    
  // catch possible negative values in NS4
  if (tempX < 0){tempX = 0}
  if (tempY < 0){tempY = 0}  


$("#mouse").css({"left" : tempX,
                  "top" : tempY})

  return true
};


var contactTog = true
$("#contact").on("click", function(){
   $(".contactInfo").toggleClass("contactInfoVis")  

})

var toggle = true
$("#pastWork").on("click", function(){

  $(".archive").toggleClass("archiveVis")

  if (toggle) {
     $("html, body").animate({ scrollTop: $(this).offset().top }, 400)
     $(this).children(".otherInfo").html("(Less Reading)")
     toggle = false
  } else{
    $("html, body").animate({ scrollTop: 0 }, 400)
    $(this).children(".otherInfo").html("Further Reading...")
    toggle = true

  }

  //remove content of current displayed project

  //each project
   $(".projectSentence.open").removeClass("open") //remove existing class open
   $("#projectContent").fadeOut(0)
   $(".projectDescription").css({"margin-top" : "0px"})
  
})



$(".projectSentence").on("click", function(){
     
    $("#projectContent").fadeOut(0)

    if($(this).attr("class") === "projectSentence open"){
        //essentially acts as a toggle  
      $(".projectSentence.open").removeClass("open") //remove existing class open


    } else{
      $(".projectSentence.open").removeClass("open") //remove existing class open
      $(this).addClass("open")

         $("#loader").fadeIn(50)

      var projectCoordinates = $(this).offset()
      var projectFromTop = projectCoordinates.top

      //var rounded = Math.round(projectFromTop)

      var windowWidth2 = $(window).width()
      console.log(windowWidth2)
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||  windowWidth2 <= 800 ) {
        var rounded = Math.round($(".projectDescription").offset().top)

      } else{
        var rounded = Math.round(projectFromTop)
        $(".projectDescription").css({"margin-top" : rounded + "px"})
      }



      //ajax request: getting project content
      var ajaxContent = $(this).parents(".primaryContent").siblings(".projectDescription").children("#projectContent"),
      currentId = $(this).attr("id"),
      pageToLoad = $(this).attr('href'),
      currentDistance = $(this).scrollTop(),
      ajaxPlaceholder = '<div>Loading</div>', 
      pageContent;

      $.get(pageToLoad, function(data){
        pageContent = data;
        ajaxContent.html(ajaxPlaceholder).load(pageToLoad, function(){
          $("#loader").fadeOut(50)
          ajaxContent.fadeIn(400)
          $("html, body").animate({ scrollTop: rounded }, 400)
        });
      }, 'html')

    }




return false;
});



//back to top functions

$( window ).scroll(function() {


  var height = $(window).height()
  var scrollTop = $(window).scrollTop()

  if (scrollTop > height/2) {
   $(".backToTop").fadeIn(400)
  } else{
    $(".backToTop").fadeOut(400)
  }

})


$(".backToTop").on("click", function(){
   $("html, body").animate({ scrollTop: 0 }, 400)
   //each project
  $(".projectSentence.open").removeClass("open") //remove existing class open


   $("#projectContent").fadeOut(400)
    setTimeout(function(){
         $(".projectDescription").css({"margin-top" : "0px"})
          $(".archive").removeClass("archiveVis")

            //$("html, body").animate({ scrollTop: 0 }, 400)
            $("#pastWork").children(".otherInfo").html("Further Reading...")
            toggle = true

          

    }, 500)


})
