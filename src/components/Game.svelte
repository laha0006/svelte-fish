<script>
    import { onMount } from "svelte";
    let isActive = false;
    const testPrompt = "ABWKFJ";

    function start() {
        console.log("Start!");
        isActive = true;
    }

    function handleKey(e) {
        if (!isActive) return;
        console.log(e.key.toUpperCase());
    }

    onMount(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });
</script>

<div class="flex flex-col mt-5 gap-5 text-center justify-center">
    <h1>THE GAME</h1>
    <button onclick={start}>Start</button>
    <button>Stop</button>
</div>
