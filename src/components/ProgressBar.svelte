<script>
    const { ms } = $props();
    let progress = $state(0);
    let interval;

    $effect(() => {
        clearInterval(interval);
        progress = 0;
        const tick = ms / 100;
        interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
            }
            progress++;
        }, tick);

        return () => clearInterval(interval);
    });
</script>

<div class="border-yellow-800 border h-12 w-80">
    <div class="bg-amber-800 h-12" style="width: {progress}%"></div>
</div>
