import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchCharactersByEpisode } from '../services';
import './Character.css';

interface Character {
    id: number;
    name: string;
    image: string;
}

const CharacterFeed = ({ episodeId }: { episodeId: string }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [episode, setEpisode] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const charactersPerPage = 10;

    useEffect(() => {
        const fetchCharacters = async () => {
            const responses = await fetchCharactersByEpisode(episodeId);
            setEpisode(responses.name);
            const characterData = await Promise.all(
                responses.characters.map((url: string) => axios.get(url))
            );
            setCharacters(characterData.map((response) => response.data));
            setCurrentPage(1); // Reset to first page when episode changes
        };
        fetchCharacters();
    }, [episodeId]);

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const totalPages = Math.ceil(characters.length / charactersPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="character-feed">
            <h2>Characters</h2>
            <p>{`${characters.length} Characters in episode "${episode}"`}</p>
            <div className="character-grid">
                {currentCharacters.map((character: Character) => (
                    <div key={character.id} className="character-card">
                        <img src={character.image} alt={character.name} className="character-image" />
                        <h3 className="character-name">{character.name}</h3>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CharacterFeed;
