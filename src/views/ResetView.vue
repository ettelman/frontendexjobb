<template>
    <h1 class="top-h">Glömt lösenord?</h1>
    
   <div class="login"> 
    <div class="infobox">
    <p>Skriv in den e-postadress du använde när du skapade kontot. Om mejlet inte kommer fram kan du behöva kolla din skräppost.</p>
</div>
      <form @submit.prevent="">
        <label for="email">Epostadress:</label><br />
        <input type="email" id="email" />
        
        <button type="submit">
         Skicka återställningslänk
        </button>
      </form>
  
     
    </div>
        <div class="login">
        <router-link class="nav-link" to="/"><i class="pi pi-chevron-left"></i>Tillbaka</router-link></div>
  </template>

<script>

</script>

