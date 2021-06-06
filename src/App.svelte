<script>
	import api from './Api';
	import { repos, selected, setSelected } from './store';
	const labels = ['React', 'Svelte', 'Vue'];


</script>

<style>
	button{
		margin-right:8px;
		background-color: #7ac0c0;
		color: white;
		border:none;
		padding:10px;
		cursor:pointer;
	}

	.active{
		background-color: #006a6a;
	}

</style>

{#each labels as label}
	<button class:active={$selected === label} on:click={()=> $selected =label}>{label}</button>
{/each}

{#if $repos.status === 'loading'}
	<span>Loading...</span>
{:else if $repos.status === 'loaded'}
	{#each $repos.items as item(item.id)}
		<h3>{item.name}</h3>
		<p>{item.description}</p>
		<a herf="{item.html_url}">Repo Link</a>
	{/each}
{:else if $repos.status === 'error'}
	<span>{$repos.error}</span>
{/if}