export type SfxName = 'win' | 'lose' | 'rps';
const SFX: Record<SfxName, { url: string; volume: number }> = {
    win: { url: '/sfx/win.mp3', volume: 0.75 },
    lose: { url: '/sfx/lose.mp3', volume: 0.75 },
    rps: { url: '/sfx/rps.mp3', volume: 0.65 },
};

const ROLL_URL = '/sfx/roling.mp3';
const MUSIC_URL = '/sfx/music.mp3';
class AudioEngine {
    private oneShots = new Map<SfxName, HTMLAudioElement>();
    private roll: HTMLAudioElement | null = null;
    private music: HTMLAudioElement | null = null;
    sfxOn = true;
    musicOn = false;
    constructor() {
        if (typeof window === 'undefined') return;
        this.sfxOn = localStorage.getItem('rps.sfx') !== '0';
        for (const [name, cfg] of Object.entries(SFX) as [SfxName, { url: string; volume: number }][]) {
            const a = new Audio(cfg.url);
            a.preload = 'auto'; // прогреваем декодирование, чтобы первый тап не лагал
            a.volume = cfg.volume;
            this.oneShots.set(name, a);
        }
        this.roll = new Audio(ROLL_URL);
        this.roll.loop = true; // звук крутится вместе с рулеткой
        this.roll.volume = 0.5;
        this.roll.preload = 'auto';
    }
    /** Разовый звук: win / lose / rps */
    play(name: SfxName) {
        if (!this.sfxOn) return;
        const a = this.oneShots.get(name);
        if (!a) return;
        try {
            a.pause(); // перемотка на начало — повторный тап не обрывается странно
            a.currentTime = 0;
            void a.play().catch(() => {});
        } catch {
            /* ignore */
        }
    }
    /** Старт лупа прокрутки (звать в момент начала rolling) */
    startRoll() {
        if (!this.sfxOn || !this.roll) return;
        try {
            this.roll.currentTime = 0;
            void this.roll.play().catch(() => {});
        } catch {
            /* ignore */
        }
    }
    /** Стоп лупа (звать в момент показа результата) */
    stopRoll() {
        if (!this.roll) return;
        this.roll.pause();
        this.roll.currentTime = 0;
    }
    /**
     * Музыку стартуем ТОЛЬКО из обработчика пользовательского жеста —
     * иначе iOS Safari заблокирует автоплей.
     */
    toggleMusic(): boolean {
        if (!this.music) {
            this.music = new Audio(MUSIC_URL);
            this.music.loop = true;
            this.music.volume = 0.25;
            this.music.preload = 'auto';
        }
        this.musicOn = !this.musicOn;
        if (this.musicOn) void this.music.play().catch(() => (this.musicOn = false));
        else this.music.pause();
        localStorage.setItem('rps.music', this.musicOn ? '1' : '0');
        return this.musicOn;
    }
    toggleSfx(): boolean {
        this.sfxOn = !this.sfxOn;
        if (!this.sfxOn) this.stopRoll(); // выключили посреди прокрутки — глушим луп
        else this.play('rps');
        localStorage.setItem('rps.sfx', this.sfxOn ? '1' : '0');
        return this.sfxOn;
    }
}
export const audio = new AudioEngine();