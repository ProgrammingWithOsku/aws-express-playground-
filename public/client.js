async function fetchQuestions() {
    try {
        const response = await fetch('/questions');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);  // Handle HTTP errors
        }
        const data = await response.json();
        const questionsContainer = document.getElementById('questions');
        questionsContainer.innerHTML = ''; // Clear previous content

        data.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            questionElement.innerHTML = `
                <h3>${question.question}</h3>
                <p>A: ${question.option_a}</p>
                <p>B: ${question.option_b}</p>
                <p>C: ${question.option_c}</p>
                <p>D: ${question.option_d}</p>
                <p>Correct Answer: ${question.correct_answer}</p>
            `;

            questionsContainer.appendChild(questionElement);
        });
    } catch (err) {
        console.error('Error fetching questions:', err);  // Log any errors from the server or JSON parsing
    }
}

window.onload = fetchQuestions;