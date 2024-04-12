document
  .getElementById("signupaction")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(password)

    if (username == "" || email == "" || password == "") {
      showMessage();
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(data.message);
      } else {
        showToast(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  });




  document.getElementById("onLogin").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const emaillogin = document.getElementById("loginemail").value;
    const passwordlogin = document.getElementById("loginpassword").value;

    if(email=='' || password==''){
        showToast("All fields are required");
        return;
    }


    try {

        const response = await fetch('http://localhost:3000/auth/login',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:emaillogin,password:passwordlogin})
        });

        const data = await response.json();

        if(response.ok){
           if(data.message=='success'){
            window.location.href='/dashboard';
           }
        }else{
            showToast(data.message)
        }
        
    } catch (error) {
        console.log(error)
    }

  })

  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    
    // Create a new toast element
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
  
    // Append the toast to the container
    toastContainer.appendChild(toast);
  
    // Show the toast
    toast.style.display = 'block';
  
    // Hide the toast after 3 seconds
    setTimeout(() => {
      toast.style.display = 'none';
      // Remove the toast from the DOM after hiding (optional)
      toast.remove();
    }, 3000);
  }
  