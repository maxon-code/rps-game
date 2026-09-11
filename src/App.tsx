import './index.css'
import {useState, useRef} from "react";
import TeamSelector from "./components/TeamSelector.tsx";
import Game from "./components/Game.tsx";
import type {Team, Move, Result} from "./types/gameLogic.ts"
import {getResult, MOVES, randomMove} from "./types/gameLogic.ts";
import { audio } from "./audio/audio.ts";
function App() {
    const [playerMove, setPlayerMove] = useState<Move | null>(null)
    const [botMove, setBotMove] = useState<Move | null>(null)
    const [result, setResult] = useState<Result | null>(null)
    const [score, setScore] = useState({player: 0, bot: 0})
    const [rolling, setRolling] = useState(false)
    const [previewMove, setPreviewMove] = useState<Move>("rock")
    const [playerTeam, setPlayerTeam] = useState<Team | null>(null)
    const rollInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const rollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [sfxOn, setSfxOn] = useState(audio.sfxOn);
    const [musicOn, setMusicOn] = useState(audio.musicOn);
    const handleSelectTeam = (team: Team) => {
        setPlayerTeam(team);
    };

    function handlePlay(move: Move) {
        if (rolling) return;

        audio.play("rps");
        audio.startRoll();

        setRolling(true);
        setResult(null);
        setPlayerMove(move);
        setBotMove(null);

        let tick = 0;
        rollInterval.current = setInterval(() => {
            tick += 1;
            setPreviewMove(MOVES[tick % MOVES.length]);
        }, 120);

        rollTimeout.current = setTimeout(() => {
            if (rollInterval.current) clearInterval(rollInterval.current);

            audio.stopRoll();

            const bot = randomMove();
            const res = getResult(move, bot);

            setBotMove(bot);
            setResult(res);
            setRolling(false);

            if (res === "win") {
                audio.play("win");
            }

            if (res === "lose") {
                audio.play("lose");
            }

            if (res === "draw") {
                audio.play("rps");
            }

            setScore((s) => ({
                player: s.player + (res === "win" ? 1 : 0),
                bot: s.bot + (res === "lose" ? 1 : 0),
            }));
        }, 1500);
    }

    const handleReset = () => {
        audio.stopRoll();
        setPlayerMove(null);
        setBotMove(null);
        setResult(null);
        setScore({player: 0, bot: 0});
        setPreviewMove("rock");
    };

    const handleChangeTeam = () => {
        handleReset();
        setPlayerTeam(null);
    };

    const handleToggleSfx = () => {
        setSfxOn(audio.toggleSfx());
    };

    const handleToggleMusic = () => {
        setMusicOn(audio.toggleMusic());
    };
    return (
        <>

            <div className="min-h-dvh relative overflow-hidden">
                <div className="min-h-dvh relative z-10">
                    {playerTeam === null ? (
                        <TeamSelector onSelect={handleSelectTeam}/>
                    ) : (
                        <Game team={playerTeam}
                            playerMove={playerMove}
                            botMove={botMove}
                            result={result}
                            score={score}
                            rolling={rolling}
                            previewMove={previewMove}
                            onPlay={handlePlay}
                            onReset={handleReset}
                            onChangeTeam={handleChangeTeam}
                              sound={{ sfxOn, musicOn }}
                              onToggleSfx={handleToggleSfx}
                              onToggleMusic={handleToggleMusic}
                        />
                    )}
                </div>
            </div>

        </>
    )
}

export default App
