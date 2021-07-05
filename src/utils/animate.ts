export default function animate({
  timing,
  draw,
  duration,
}: {
  duration: number;
  timing(timeFraction: number): number;
  draw(progress: number): void;
}): void {
  const start = performance.now();

  requestAnimationFrame(function animate2(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);
    console.log(progress);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate2);
    }
  });
}
