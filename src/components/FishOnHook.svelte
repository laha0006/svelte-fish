<script>
    import { onMount } from "svelte";
    import ProgressBar from "./ProgressBar.svelte";
    import { socketStore } from "../stores/socketStore";

    function handleKey(e) {
        if (e.code !== "Space") return;
        $socketStore.emit("catchFish");
        console.log("SPACE!");
    }

    onMount(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });
</script>

<div class="flex flex-col justify-center">
    <ProgressBar ms={600} />

    <h1>A fish is on the hook! Press Space!</h1>
</div>
