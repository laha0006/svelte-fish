<script>
    const { key, isPressed = false } = $props();
</script>

{#if isPressed}
    <p class="min-w-[60px] text-6xl font-light text-white opacity-30">{key}</p>
{:else}
    <p class="min-w-[60px] text-6xl font-bold text-white">{key}</p>
{/if}
