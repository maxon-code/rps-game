import type { Team } from "../types/gameLogic"

interface TeamSelectorProps {
    onSelect: (team: Team) => void;
}

export default function TeamSelector( {onSelect}: TeamSelectorProps ) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 mb-4 drop-shadow-lg">
                     Rock, Paper, Scissors
                </h1>
                <p className="text-amber-200/70 text-lg sm:text-xl tracking-widest uppercase">
                    Choose your team
                </p>
            </div>

            {/* Decorative divider */}
            <div className="w-64 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-12" />

            {/* Team buttons */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                {/* Blue Team */}
                <button onClick={() => onSelect('blue')} className="group cursor-pointer relative">
                    <div className="w-52 h-64 sm:w-60 sm:h-72 rounded-3xl">
                        {/* Background pattern */}

                        <img src="/src/assets/blue_team.png" alt="Blue Team" />
                        {/* Thai corner decorations */}

                    </div>
                </button>


                <div className="flex items-center justify-center">
                    <span className="text-amber-400 text-4xl sm:text-5xl font-black">VS</span>
                </div>


                <button
                    onClick={() => onSelect('red')}
                    className="group cursor-pointer relative"
                >
                    <div className=" w-52 h-64 sm:w-60 sm:h-72">
                       <img src="/src/assets/red_team.png" alt="Red team" />
                    </div>
                </button>
            </div>



        </div>
    )
}
