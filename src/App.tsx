import './index.css'
import { useState } from "react";
import TeamSelector from "./components/TeamSelector.tsx";
import type { Team } from "./types/gameLogic.ts"
function App() {
  const [playerTeam, setPlayerTeam] = useState<Team | null>(null)
  const handleSelectTeam = (team: Team) => {

    setPlayerTeam(team);
  };
  console.log('playerTeam value:', playerTeam);
  return (
    <>

        <div className="min-h-screen bg-gradient-to-r from-stone-500 to-stone-700 relative overflow-hidden">
            <div className="relative z-10">
                {!playerTeam && (
                    <TeamSelector onSelect={handleSelectTeam} />
                )}
            </div>
        </div>

    </>
  )
}

export default App
