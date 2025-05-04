<script>
    import Game from "./components/Game.svelte";
    let gameKey = $state(0);
    function startGame() {
        gameKey++;
    }
</script>

<main class="flex justify-center h-screen bg-slate-900 text-yellow-800">
    <div class="flex flex-col mt-28 text-6xl font-bold">
        {#key gameKey}
            <Game />
        {/key}
        <button onclick={startGame}>spawn</button>
    </div>
</main>
