<script>
    const { ms } = $props();
    let progress = $state(0);
    let interval;
    let start;
    let end;
    $effect(() => {
        clearInterval(interval);
        start = Date.now();
        progress = 0;
        const tick = ms / 100;
        interval = setInterval(() => {
            if (progress >= 100) {
                end = Date.now();
                console.log(end - start);
                clearInterval(interval);
            }
            progress++;
        }, tick);

        return () => clearInterval(interval);
    });
</script>

<div class="flex justify-center">
    <div class="border-yellow-800 border h-12 w-80">
        <div class="bg-amber-800 h-12" style="width: {progress}%"></div>
    </div>
</div>
