window.addEventListener('load',()=>{
    console.log("Calc page loaded");
    // Add your JS code here


    let addCard         = document.querySelector(".Addint"); 
    let addCardBtn      = document.querySelector(".Subbutton");  

    let num1            = document.querySelector("#num1"); 
    let num2            = document.querySelector("#num2"); 
 
    let mulCard         = document.querySelector(".Mulint");       // Query by HTML class & element type. Select <p> element
    let mulCardBtn      = document.querySelector(".Mulbutton"); 

    let mulnum1         = document.querySelector("#n1"); 
    let mulnum2         = document.querySelector("#n2"); 

    let tempCard        = document.querySelector(".TICint");
    let tempCardBtn     = document.querySelector(".Tbutton");

    let tempnum         = document.querySelector("#T1");

    addCardBtn.addEventListener("click", async ()=>{ 
        console.log("Add Button clicked");
        
            // console.log("FETCH TIME");
            
            // Create URL
            const URL = `/sum?number1=${num1.value}&number2=${num2.value}`;
            // console.log("GDI");
            // Send GET request
            const response = await fetch(URL);
            
            if(response.ok){
                // Convert response to text
                let res = await response.text();
                // Print response to console
                console.log(res);
                addCard.innerHTML=res;
            }
  });


    mulCardBtn.addEventListener("click", async ()=>{ 
        console.log("Product Button clicked");
    
        const URL = `/mul`;
        // Create data object for sending
        let data = {"number1":mulnum1.value,"number2":mulnum2.value}
        // Send POST request
        const response = await fetch(URL,{method:"POST", body:JSON.stringify(data),headers:
        {'Content-Type': 'application/json' }});
        if(response.ok){
                // Convert response to text
                let res = await response.text();
                // Print response to console
                console.log(res); 
                mulCard.innerHTML=res;
            }
});
  
tempCardBtn.addEventListener("click", async ()=>{ 
    console.log("Temp Button clicked");

    const URL = `/tempC`;
    // Create data object for sending
    let data = {"number1":tempnum.value}
    // Send POST request
    const response = await fetch(URL,{method:"POST", body:JSON.stringify(data),headers:
    {'Content-Type': 'application/json' }});
    if(response.ok){
            // Convert response to text
            let res = await response.text();
            // Print response to console
            console.log(res); 
            tempCard.innerHTML=res;
        }
});

    });