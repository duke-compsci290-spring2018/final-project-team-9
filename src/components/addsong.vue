<template>
	<div id="addsong">
        <p>This adds your selected song to the song database.</p>
        <br>
        <input placeholder="Enter the Artist" v-model="artist">
        <input placeholder="Enter the Track Name" v-model="song">
        <button type="button" class="btn btn-primary btn-sm" v-on:click="addSong">Add Song to Database</button>
    </div>
</template>