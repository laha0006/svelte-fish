<script>
    import Game from "./components/Game.svelte";
    let gameKey = $state(0);
    let prompt = $state("ABA");
    let duration = $state(1500);
    function startGame() {
        duration += 100;
        prompt += "B";
        gameKey++;
    }
</script>

<main class="flex justify-center h-screen bg-slate-900 text-yellow-800">
    <div class="mt-28 text-6xl font-bold">
        {#key gameKey}
            <Game />
        {/key}
    </div>
</main>
