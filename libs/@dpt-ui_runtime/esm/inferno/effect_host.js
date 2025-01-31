export const InfernoEffectHost = {
    lockCount: 0,
    lock() {
        this.lockCount++;
    },
    callbacks: [],
    callEffects() {
        this.lockCount--;
        if (this.lockCount < 0) {
            throw new Error('Unexpected Effect Call');
        }
        if (this.lockCount === 0) {
            const effects = this.callbacks;
            this.callbacks = [];
            effects.forEach((callback) => callback());
        }
    },
};
