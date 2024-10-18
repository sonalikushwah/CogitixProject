import React, { useState, useEffect } from 'react';
import { fetchEpisodes } from '../services';
import './EpisodeList.css'; // Importing the custom CSS file

interface Episode {
    id: number;
    name: string;
}

interface EpisodeListProps {
    onSelect: (id: string) => void;
    selectedEpisode: string | null;
}

const EpisodeList = ({ onSelect, selectedEpisode }: EpisodeListProps) => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    useEffect(() => {
        const getEpisodes = async () => {
            try {
                const data = await fetchEpisodes();
                setEpisodes(data.results);

                if (data.results.length > 0 && !selectedEpisode) {
                    onSelect(String(data.results[0].id));
                }
            } catch (error) {
                console.error("Error fetching episodes:", error);
            }
        };
        getEpisodes();
    }, [onSelect, selectedEpisode]);

    if (episodes.length === 0) {
        return (
            <div className="episode-list">
                <h2>Episodes</h2>
                <p>Loading episodes or no episodes available.</p>
            </div>
        );
    }

    return (
        <div className="episode-list">
            <h2>Episodes</h2>
            <ul>
                {episodes.map((episode) => (
                    <li
                        key={episode.id}
                        onClick={() => onSelect(String(episode.id))}
                        className={`episode-item ${selectedEpisode === String(episode.id) ? 'selected' : ''}`}
                    >
                        {episode.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EpisodeList;
