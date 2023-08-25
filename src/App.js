import React, { useState } from 'react';
import { FaUser, FaPlus, FaMinus, FaSmile, FaSadTear } from 'react-icons/fa';
import './App.css';

function App() {
    const [numParticipants, setNumParticipants] = useState(5);
    const [winner, setWinner] = useState(null);
    const [isDrawn, setIsDrawn] = useState(false);
    const [participantStatus, setParticipantStatus] = useState(Array(5).fill(null));
    const [showAllResults, setShowAllResults] = useState(false);

    const colors = [
        '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF',
        '#C0C0C0', '#808080', '#800000',
        '#808000'
    ];

    const drawWinner = () => {
        const randomIndex = Math.floor(Math.random() * numParticipants);
        setWinner(randomIndex);
        setIsDrawn(true);
    };

    const reset = () => {
        setIsDrawn(false);
        setWinner(null);
        setShowAllResults(false);
        setParticipantStatus(Array(numParticipants).fill(null));
    };

    const showResults = () => {
        const newStatus = Array(numParticipants).fill(null).map((_, index) => (index === winner ? '통과' : '꽝'));
        setParticipantStatus(newStatus);
        setShowAllResults(true);
    };

    const addParticipant = () => {
        if (numParticipants < 10) {
            setParticipantStatus([...participantStatus, null]);
            setNumParticipants(numParticipants + 1);
        }
    };

    const removeParticipant = () => {
        if (numParticipants > 0) {
            setParticipantStatus(participantStatus.slice(0, -1));
            setNumParticipants(numParticipants - 1);
        }
    };

    return (
        <div className="App">
            <h1>제비뽑기</h1>
            <div className="input-section">
                <button onClick={removeParticipant}><FaMinus /></button>
                <span>{numParticipants}명</span>
                <button onClick={addParticipant}><FaPlus /></button>
            </div>
            <div className="list-section">
                <h2>참가자 명단</h2>
                <div className="participants">
                    {Array.from({ length: numParticipants }, (_, index) => (
                        <div
                            className="participant"
                            key={index}
                            style={{ backgroundColor: showAllResults ? colors[index] : 'transparent' }}
                        >
                            {showAllResults ? (
                                participantStatus[index] === '통과' ? <FaSmile size={50} /> : <FaSadTear size={50} />
                            ) : (
                                <FaUser size={50} color={colors[index]} />
                            )}
                            <span>{showAllResults ? participantStatus[index] : ''}</span>
                        </div>
                    ))}
                </div>
            </div>
            {isDrawn ? (
                <>
                    {!showAllResults && <button className="draw-button" onClick={showResults}>제비뽑기 결과 보기</button>}
                    <button className="draw-button" onClick={reset}>제비뽑기 다시하기</button>
                </>
            ) : (
                <button className="draw-button" onClick={drawWinner}>제비뽑기 시작!</button>
            )}
        </div>
    );
}

export default App;