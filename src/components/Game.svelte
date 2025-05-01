<script>
    import { onMount } from "svelte";
    import KeyDisplay from "./KeyDisplay.svelte";
    import ProgressBar from "./ProgressBar.svelte";
    let isActive = true;
    const testPrompt = "ABAWKFJ";

    let keys = $state([]);
    let current;
    let length = $derived(keys.length);
    let timeInMs = $state(0);
    function start(prompt, ms) {
        keys = createKeyDisplay(prompt);
        current = 0;
        isActive = true;
        timeInMs = ms;
        console.log("Start!");
    }

    function createKeyDisplay(prompt) {
        console.log("CREATED");
        let keys = [];
        for (const char of prompt) {
            keys.push({
                key: char,
                isPressed: false,
            });
        }
        return keys;
    }
    function handleKey(e) {
        if (!isActive) return;

        const nextKey = keys[current];
        if (nextKey.key === e.key.toUpperCase()) {
            nextKey.isPressed = true;
            current++;
        }

        if (current === length) {
            console.log("WON?");
            isActive = false;
            return;
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });
</script>

<div class="flex flex-col mt-5 gap-5 text-center justify-center">
    <h1>THE GAME</h1>
    <ProgressBar ms={timeInMs} />
    <div class="flex justify-center">
        {#each keys as key}
            <KeyDisplay key={key.key} isPressed={key.isPressed} />
        {/each}
    </div>
    <button onclick={() => start(testPrompt, 1500)}>Start ABA</button>
    <button onclick={() => start("BEBLOY", 2500)}>Start BEB</button>
    <button>Stop</button>
</div>
