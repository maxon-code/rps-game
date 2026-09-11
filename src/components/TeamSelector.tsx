import type { Team } from "../types/gameLogic"
import blueTeam from "/assets/blue_team.png";
import redTeam from "/assets/red_team.png";
interface TeamSelectorProps {
    onSelect: (team: Team) => void;
}

export default function TeamSelector( {onSelect}: TeamSelectorProps ) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center gap-3 text-center mb-12">
                <h1 className="tf2-gradient-text text-3xl">
                    Rock, Paper, Scissors
                </h1>
                <p className="tf2-gradient-text text-xl">
                    Choose your team
                </p>
            </div>


            <div className="w-64 h-px bg-gradient-to-r from-transparent via-white to-transparent mb-12" />


            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                <button onClick={() => onSelect('blue')} className="group cursor-pointer relative">
                    <div className="w-52 h-64 sm:w-60 sm:h-72 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-500">
                        <img src={blueTeam} alt="Blue Team" />
                    </div>
                </button>


                <div className="flex items-center justify-center">
                    <span className="tf2-gradient-text text-4xl">VS</span>
                </div>


                <button onClick={() => onSelect('red')} className="group cursor-pointer relative">
                    <div className=" w-52 h-64 sm:w-60 sm:h-72 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-500">
                       <img src={redTeam} alt="Red team" />
                    </div>
                </button>
            </div>



        </div>
    )
}
