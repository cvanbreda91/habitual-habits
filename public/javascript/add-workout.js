async function workoutFormHandler(event) {
    event.preventDefault();

    const exercise_type = document.querySelector('input[name="exercise_type"]').value.trim();
    const exercise_duration = document.querySelector('input[name="exercise_duration"]').value.trim();
    const calories_burned = document.querySelector('input[name="calories_burned"]').value.trim();
    const calories_consumed = document.querySelector('input[name="calories_consumed"]').value.trim();
    const current_weight = document.querySelector('input[name="current_weight"]').value.trim();
    
    const response = await fetch(`/api/workouts`, {
        method: 'POST',
        body: JSON.stringify({
            exercise_type,
            exercise_duration,
            calories_burned,
            calories_consumed,
            current_weight
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }


}

document.querySelector('#workout-form').addEventListener('submit', workoutFormHandler);