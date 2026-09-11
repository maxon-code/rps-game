import type {Team, Move, Result} from "../types/gameLogic"
import {MOVE_INFO, MOVES, otherTeam, TEAMS} from "../types/gameLogic"
import {cn} from "../utils/cn.ts";

type GameProps = {
    team: Team;
    playerMove: Move | null;
    botMove: Move | null;
    result: Result | null;
    score: { player: number; bot: number };
    rolling: boolean;
    previewMove: Move;
    onPlay: (move: Move) => void;
    onReset: () => void;
    onChangeTeam: () => void;
    sound: {
        sfxOn: boolean;
        musicOn: boolean;
    };
    onToggleSfx: () => void;
    onToggleMusic: () => void;
};


export default function Game({
                                 team,
                                 playerMove,
                                 botMove,
                                 result,
                                 score,
                                 rolling,
                                 previewMove,
                                 onPlay,
                                 onReset,
                                 onChangeTeam,
                                 sound,
                                 onToggleSfx,
                                 onToggleMusic,
                             }: GameProps) {
    const you = TEAMS[team];
    const enemy = TEAMS[otherTeam(team)];
    const revealed = result !== null;


    const leftImage = rolling
        ? MOVE_INFO[team][previewMove].image
        : playerMove
            ? MOVE_INFO[team][playerMove].image
            : MOVE_INFO[team].rock.image;
    const rightImage = rolling
        ? MOVE_INFO[otherTeam(team)][previewMove].image
        : botMove
            ? MOVE_INFO[otherTeam(team)][botMove].image
            : MOVE_INFO[otherTeam(team)].rock.image;

    const resultText: Record<Result, string> = {
        win: "You won the round!",
        lose: "Round won by the bot",
        draw: "Draw",
    };
    const resultColor: Record<Result, string> = {
        win: "text-emerald-400",
        lose: "text-rose-400",
        draw: "text-amber-400",
    };

    return (
        <div className="flex min-h-full flex-col">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-8">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">

                    <div className="flex flex-col items-center gap-3">
                        <span
                            className={cn("rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs", you.chip,)}>
                             You
                                  </span>


                        <div
                            className={cn("flex size-[clamp(4.5rem,24vw,9rem)] items-center justify-center overflow-hidden rounded-full border-2 bg-slate-950/70 sm:h-36 sm:w-36",
                                you.border,
                                rolling && "anim-roll-glow")}>
                            <img key={leftImage + String(rolling)}
                                 src={leftImage}
                                 alt="Your move"
                                 className={cn(
                                     "h-full w-full object-cover",
                                     rolling && "anim-image-switch",
                                     revealed && "anim-pop",
                                 )}
                            />
                        </div>
                        <span className={cn("text-xs font-semibold sm:text-sm", you.text)}>
              <span className={cn("mr-1 inline-block h-2 w-2 rounded-full", you.dot)}/>
                            {you.name}
            </span>
                    </div>

                    <div className="px-1 text-center">
                        <div className="text-lg font-black text-slate-500 sm:text-3xl">VS</div>
                    </div>

                    <div className="flex flex-col items-center gap-3">
            <span className={cn(
                "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs",
                enemy.chip,
            )}
            >
              Бот
            </span>
                        <div className={cn(
                            "flex size-[clamp(4.5rem,24vw,9rem)] items-center justify-center overflow-hidden rounded-full border-2 bg-slate-950/70 sm:h-36 sm:w-36",
                            enemy.border,
                            rolling && "anim-roll-glow",
                        )}
                        >
                            <img key={rightImage + String(rolling)}
                                 src={rightImage}
                                 alt="Bot move"
                                 className={cn(
                                     "h-full w-full -scale-x-100 object-cover",
                                     rolling && "anim-image-switch",
                                     revealed && "anim-pop",
                                 )}
                            />
                        </div>
                        <span className={cn("text-xs font-semibold sm:text-sm", enemy.text)}>
              <span className={cn("mr-1 inline-block h-2 w-2 rounded-full", enemy.dot)}/>
                            {enemy.name}
            </span>
                    </div>
                </div>


                <div className="mt-4 flex min-h-14 items-center justify-center text-center sm:mt-6"
                     aria-live="polite">
                    {!rolling && result && (
                        <div className="anim-rise">
                            <p className={cn("text-xl font-black", resultColor[result])}>{resultText[result]}</p>
                            <p className="mt-1 text-xs text-slate-400">
                                {playerMove && MOVE_INFO[team][playerMove].label} vs{" "}
                                {botMove && MOVE_INFO[otherTeam(team)][botMove].label.toLowerCase()}
                            </p>
                        </div>
                    )}
                    {!rolling && !result && <p className="text-sm text-slate-400">Make your move</p>}
                </div>


                <div className="mt-4 flex items-center justify-center gap-3 sm:gap-5">
          <span className={cn("w-20 text-right text-xs font-bold sm:w-24 sm:text-sm", you.text)}>
            You
          </span>
                    <div
                        className="rounded-2xl border border-white/15 bg-slate-950/70 px-5 py-2 text-2xl font-black text-white/80 tabular-nums sm:text-3xl">
                        {score.player} : {score.bot}
                    </div>
                    <span className={cn("w-20 text-left text-xs font-bold sm:w-24 sm:text-sm", enemy.text)}>
            Bot
          </span>
                </div>
            </div>


            <div className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-5">
                {MOVES.map((move) => (
                    <button key={move}
                            onClick={() => onPlay(move)}
                            disabled={rolling}
                            className={cn(
                                "TFButton",
                                you.border,
                                rolling ? "cursor-not-allowed opacity-40" : "hover:-translate-y-1 hover:bg-slate-800",
                            )}>
                        <img
                            src={MOVE_INFO[team][move].image}
                            alt="Image"
                            className="mx-auto h-14 w-14 rounded-xl object-cover sm:h-16 sm:w-16"
                        />
                        <div className="mt-1 text-xs font-bold text-slate-200 sm:text-sm">
                            {MOVE_INFO[team][move].label}
                        </div>
                    </button>
                ))}
            </div>


            <div className="flex flex-wrap justify-center gap-3 mt-6 sm:mt-10">
                <button
                    onClick={onReset}
                    disabled={rolling}
                    className={cn(
                        "min-h-11 rounded-xl px-5 text-sm font-bold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40",
                        you.button,
                    )}
                >
                    Reset count
                </button>
                <button
                    onClick={onChangeTeam}
                    disabled={rolling}
                    className="rounded-xl border border-white/20 px-5 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Switch team
                </button>

            </div>
            <div className="mt-4 flex justify-center gap-3">
                <button
                    type="button"
                    onClick={onToggleMusic}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                >
                    Music: {sound.musicOn ? "On" : "Off"}
                </button>

                <button
                    type="button"
                    onClick={onToggleSfx}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                >
                    SFX: {sound.sfxOn ? "On" : "Off"}
                </button>
            </div>
        </div>
    );
}
