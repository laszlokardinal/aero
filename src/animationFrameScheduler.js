const animationFrameScheduler = () => (done) => requestAnimationFrame(done);

module.exports = animationFrameScheduler;
