import React, { useState } from 'react';
import EpisodeList from '../app/components/EpisodeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterFeed from '../app/components/Character';
import './index.css'; // Import the custom CSS

const Home = () => {
    const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

    const handleSelectEpisode = (id: string) => {
        setSelectedEpisode(id);
    };

    return (
        <div className='containers' >
            {/* Sidebar */}
            <div className="sidebar">
                <EpisodeList onSelect={handleSelectEpisode} selectedEpisode={selectedEpisode} />
            </div>
            {/* Main Content */}
            <div className="main-content">
                {selectedEpisode && (
                    <CharacterFeed episodeId={selectedEpisode} />
                )}
            </div>
        </div>
    );
};

export default Home;
