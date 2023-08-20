// src/components/NpcGenerator.js
import React, { useState } from 'react';
import styles from './NpcGenerator.module.css';

function NpcGenerator() {
  const [aesthetic, setAesthetic] = useState('');
  const [adjectives, setAdjectives] = useState('');
  const [role, setRole] = useState('');

  const [npcName, setNpcName] = useState('');
  const [npcBackstory, setNpcBackstory] = useState('');
  const [npcQuotes, setNpcQuotes] = useState([]);

  const submitValues = async () => {
    prompt = `An NPC who works as a ${role} described as ${adjectives} with the aesthetic ${aesthetic}.`
    const response = await fetch('http://localhost:3000/complete', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": prompt
      })
    });

    const resJson = await response.json();
    setNpcName(resJson.name);
    setNpcBackstory(resJson.backstory);
    setNpcQuotes(resJson.quotes);
  };

  return (
    <div className={styles.container}>
      
      <h1>NPC Generator</h1>
      <div className={styles.prompt}>
        <label htmlFor="aesthetic">What's the aesthetic of the NPC?</label>
        <input
          type="text"
          id="aesthetic"
          value={aesthetic}
          onChange={(e) => setAesthetic(e.target.value)}
        />
      </div>
      <div className={styles.prompt}>
        <label htmlFor="adjectives">Describe the NPC with 3 adjectives:</label>
        <input
          type="text"
          id="adjectives"
          placeholder="E.g., mysterious, brave, charming"
          value={adjectives}
          onChange={(e) => setAdjectives(e.target.value)}
        />
      </div>
      <div className={styles.prompt}>
        <label htmlFor="role">What's the NPC's role in the game?</label>
        <input
          type="text"
          id="role"
          placeholder="E.g., merchant, warrior, mage"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <button onClick={submitValues}>Generate NPC</button>
      
      <div style={{width: '50%'}}>
        <h3>NPC Name: {npcName}</h3>
        <h3>NPC Backstory: {npcBackstory}</h3>
        {npcQuotes.map((quote, i) => <h3>Quote #{i + 1}: {quote}</h3>)}
      </div>
    </div>
  );
}

export default NpcGenerator;
