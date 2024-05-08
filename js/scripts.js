document.addEventListener("DOMContentLoaded", function() {
   
    const formulario = document.getElementById('crear-anuncio');
    
    formulario.addEventListener("submit ", function(event) {
        event.preventDefault();
  
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const imagen = document.getElementById('formFileSm').files[0];
  
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen); 
  
  
        
    });
  });
  