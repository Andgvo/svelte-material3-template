<script lang="ts">

    let genericName = $state('');
    let identificador = $state('');
    let nombre = $state('');
    let descripcion = $state('');
    let activo = $state('');

    let llaveTipo = $state('');
    let llaveForanea = $state('');

    $effect(() => {
        
        identificador = "Identificador de '"+ genericName + "'.";
        nombre = "Nombre de '"+ genericName + "'. Máximo de 100 caracteres.";
        descripcion = "Descripción de '"+ genericName + "'. Máximo de 255 caracteres.";
        activo = "Bandera de '"+ genericName + "' que indica si esta activo.";
        llaveForanea = "Identificador de '' al que pertenece '"+ genericName + "'";
        llaveTipo = "Identificador que permite tipar '"+ genericName + "'.";
    });
    
    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }
</script>

<!-- HTML -->
<div>
    <input type="text" placeholder="Ingresa el nombre generico" bind:value={genericName}>
    <hr>
    <strong>Catalogo</strong>
    <p>{identificador} <button type="button" onclick={() => copyToClipboard(identificador)}>copy</button></p>
    <p>{nombre} <button type="button" onclick={() => copyToClipboard(nombre)}>copy</button></p>
    <p>{descripcion} <button type="button" onclick={() => copyToClipboard(descripcion)}>copy</button></p>
    <p>{activo} <button type="button" onclick={() => copyToClipboard(activo)}>copy</button></p>
    <hr>
    <strong>Dependencias</strong>
    <p>{llaveForanea} <button type="button" onclick={() => copyToClipboard(llaveForanea)}>copy</button></p>
    <p>{llaveTipo} <button type="button" onclick={() => copyToClipboard(llaveTipo)}>copy</button></p>
</div>

<!-- Style -->
<style>
    button{
        margin-left: 10px;
        background-color: #443bfa;
        border: none;
        cursor: pointer;
        color: #ffffff;
    }
</style>