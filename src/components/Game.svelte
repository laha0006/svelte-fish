<script>
    import { onMount } from "svelte";
    import KeyDisplay from "./KeyDisplay.svelte";
    let isActive = false;
    const testPrompt = "ABWKFJ";

    function start() {
        console.log("Start!");
        isActive = true;
    }

    function createKeyDisplay(prompt) {
        let keys = [];
        for (const char of prompt) {
            keys.push({
                key: char,
                isPressed: false,
            });
        }
        return keys;
    }

    const keys = $state(createKeyDisplay(testPrompt));

    function handleKey(e) {
        if (!isActive) return;
        for (const key of keys) {
            if (key.key == e.key.toUpperCase()) {
                key.isPressed = true;
            }
        }
        console.log(e.key.toUpperCase());
    }

    onMount(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });
</script>

<div class="flex flex-col mt-5 gap-5 text-center justify-center">
    <h1>THE GAME</h1>
    <div class="flex justify-center gap-5">
        {#each keys as key}
            <KeyDisplay key={key.key} isPressed={key.isPressed} />
        {/each}
    </div>
    <button onclick={start}>Start</button>
    <button>Stop</button>
</div>
