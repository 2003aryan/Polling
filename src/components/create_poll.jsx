import React from 'react';

class Poll {
    constructor(question, options) {
        this.question = question;
        this.options = options;
        this.votes = new Array(options.length).fill(0);
      }
    
      vote(index) {
        if (index >= 0 && index < this.options.length) {
          this.votes[index]++;
          console.log('Vote recorded!');
        } else {
          console.log('Invalid option!');
        }
      }

  getResults() {
    const results = {};

    for (let i = 0; i < this.options.length; i++) {
      results[this.options[i]] = this.votes[i];
    }

    return results;
  }
}

function CreatePoll() {
  const myPoll = new Poll('What is your favorite color?', ['Red', 'Blue', 'Green']);
  myPoll.vote(1); // Vote for 'Blue'
  const pollResults = myPoll.getResults();

  return (
    <div>
      {/* JSX content here */}
      <h1>{myPoll.question}</h1>
      <ul>
        {myPoll.options.map((option, index) => (
          <li key={index}>
            {option}: {pollResults[option]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreatePoll;
