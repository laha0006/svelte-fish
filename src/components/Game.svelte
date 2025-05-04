<script>
    import FishOnHook from "./FishOnHook.svelte";
    import MonkeyTypeQte from "./MonkeyTypeQTE.svelte";
    import { onMount } from "svelte";
    import { socketStore } from "../stores/socketStore";

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
            gameState = "idle";
        });

        $socketStore.emit("startFishing");
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
    {#if gameState === "idle"}
        <div class="min-h-52">
            <h1>Idle</h1>
        </div>
    {:else if gameState === "fishOnHook"}
        <div class="min-h-52">
            <FishOnHook />
        </div>
    {:else if gameState === "qte"}
        <div class="min-h-52">
            <MonkeyTypeQte {prompt} {duration} />
        </div>
    {/if}
    <div>
        <button onclick={stop}>Stop</button>
    </div>
</div>
