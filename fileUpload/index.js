

function upload(e){
  console.log("button is clicked")
  e.preventDefault();
  const files=document.getElementById("files");
  const file=files.files[0]
  const fullName=document.getElementsByTagName("input")[0].value;
  let formData=new FormData();
  const length=files.files.length
 // console.log(files.files.length)
  console.log(file);
  if(length==0){
    console.error("no files are selected");
    return;
  }
  if(length==1){
    formData.append("file",file);
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Log the server response
      // Handle the server response as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  

  }
  else{
    for(let i=0;i<length;i++){
      formData.append("file[]",file[i]);


    }

    fetch('/upload/multiple', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Log the server response
      // Handle the server response as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  

  }
  
}