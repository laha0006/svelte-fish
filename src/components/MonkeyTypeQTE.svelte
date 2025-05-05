<script>
    const { prompt, duration } = $props();
    import { onMount } from "svelte";
    import KeyDisplay from "./KeyDisplay.svelte";
    import ProgressBar from "./ProgressBar.svelte";
    import { socketStore } from "../stores/socketStore";

    let isActive = true;
    let keys = $state([]);
    let current;
    let length = $derived(keys.length);
    let timeInMs = $state(0);
    let startTime;
    let keyTimings = [];
    function start(prompt, ms) {
        keys = createKeyDisplay(prompt);
        current = 0;
        isActive = true;
        timeInMs = ms;
        console.log("Start!");
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
    function handleKey(e) {
        if (!isActive) return;

        const nextKey = keys[current];
        if (nextKey.key === e.key.toUpperCase()) {
            nextKey.isPressed = true;
            const diff = Date.now() - startTime;
            startTime = Date.now();
            keyTimings.push(diff);
            current++;
        }

        if (current === length) {
            isActive = false;
            console.log(keyTimings);
            $socketStore.emit("qteComplete");
            return;
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKey);
        start(prompt, duration);
        startTime = Date.now();
        return () => window.removeEventListener("keydown", handleKey);
    });
</script>

<div class="flex flex-col mt-5 gap-5 text-center justify-center">
    <ProgressBar ms={timeInMs} />
    <div class="flex justify-center">
        {#each keys as key}
            <KeyDisplay key={key.key} isPressed={key.isPressed} />
        {/each}
    </div>
</div>
