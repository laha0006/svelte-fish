<script>
    import FishOnHook from "./FishOnHook.svelte";
    import MonkeyTypeQte from "./MonkeyTypeQTE.svelte";
    import { onMount } from "svelte";
    import { socketStore } from "../stores/socketStore";
    import "../util/bot.js";
    let gameState = $state("idle"); //idle -> fish -> success? -> qte -> success? -> idle
    let fishCount = $state(0);
    function stop() {
        console.log("stop");
        $socketStore.emit("stopFishing");
    }
    let duration = $state(2500);
    let prompt = $state("ABA");

    onMount(() => {
        $socketStore.on("FishOnHook", () => {
            console.log("FishOnHook!");
            gameState = "fishOnHook";
        });

        $socketStore.on("FishCaught", () => {
            gameState = "qte";
        });

        $socketStore.on("QTESuccess", () => {
            fishCount++;
            gameState = "idle";
        });

        $socketStore.on("FishEscaped", () => {
            console.log("FishEscaped");
            gameState = "idle";
        });

        // $socketStore.emit("startFishing");
        return () => {
            $socketStore.emit("stopFishing");
            $socketStore.off("FishEscaped");
            $socketStore.off("QTESuccess");
            $socketStore.off("FishCaught");
            $socketStore.off("FishOnHook");
        };
    });
</script>

<div class="flex flex-col justify-center text-center">
    <div class="text-4xl mb-10">fish caught:&nbsp{fishCount}</div>
    <div class="min-h-52">
        {#if gameState === "idle"}
            <h1>Idle</h1>
        {:else if gameState === "fishOnHook"}
            <FishOnHook />
        {:else if gameState === "qte"}
            <MonkeyTypeQte {prompt} {duration} />
        {/if}
    </div>
    <div>
        <button onclick={stop}>Stop</button>
    </div>
</div>
