import React, { useState } from 'react';
import { FaUser, FaPlus, FaMinus, FaSmile, FaSadTear } from 'react-icons/fa';
import './App.css';

function App() {

    const [winner, setWinner] = useState(null);
    const [numParticipants, setNumParticipants] = useState(5);
    const [participantStatus, setParticipantStatus] = useState(Array(5).fill(''));
    const [isDrawn, setIsDrawn] = useState(false);
    const [showAllResults, setShowAllResults] = useState(false);
    const [shaking, setShaking] = useState(false);
    const [numLosers, setNumLosers] = useState(2); // '꽝'의 개수 설정

    const shakeParticipants = () => {
        setShaking(true);
        drawWinner();
        setTimeout(() => {
            setShaking(false);
        }, 1500);
    };

    const colors = [
        '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF',
        '#C0C0C0', '#808080', '#800000',
        '#808000'
    ];

    const drawWinner = () => {
        let losers = Array(numLosers).fill('꽝');
        let winners = Array(numParticipants - numLosers).fill('통과');
        let shuffled = [...losers, ...winners].sort(() => Math.random() - 0.5);
        setParticipantStatus(shuffled);
        setIsDrawn(true);
        setShowAllResults(true);  // 결과를 바로 보여주도록 설정
    };

    const addLoser = () => {
        if (numLosers < numParticipants - 1) {
            setNumLosers(numLosers + 1);
        }
    };
    const removeLoser = () => {
        if (numLosers > 0) {
            setNumLosers(numLosers - 1);
        }
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
                <div className="input-title">인원수:</div>
                <button className="input-button" onClick={removeParticipant}><FaMinus /></button>
                <span className="input-text">{numParticipants}명</span>
                <button className="input-button" onClick={addParticipant}><FaPlus /></button>
                <div className="input-title">꽝 수:</div>
                <button className="input-button" onClick={removeLoser}><FaMinus /></button>
                <span className="input-text">{numLosers}개</span>
                <button className="input-button" onClick={addLoser}><FaPlus /></button>
            </div>

            <div className="list-section">
                <h2>참가자 명단</h2>
                <div className="participants">
                    {Array.from({ length: numParticipants }, (_, index) => (
                        <div
                            className={`participant ${shaking ? 'shake' : ''}`}
                            key={index}
                            style={{ color: showAllResults ? colors[index] : 'black', backgroundColor: showAllResults ? '#f7f8fb' : '' }}
                        >
                            {showAllResults ? (
                                participantStatus[index] === '통과' ? <FaSmile size={50} /> : <FaSadTear size={50} />
                            ) : (
                                <FaUser size={50} color={colors[index]} />
                            )}
                            <span>{showAllResults ? participantStatus[index] : ''}</span>
                            {/* 참가자 번호를 표시하는 부분 */}
                            <div className="participant-number">{index + 1}번</div>
                        </div>
                    ))}
                </div>
            </div>
            {isDrawn ? (
                <>
                    <button className="draw-button" onClick={reset}>다시하기</button>
                </>
            ) : (
                <button className="draw-button" onClick={shakeParticipants}>제비 섞기!</button>
            )}

        </div>
    );
}

export default App;