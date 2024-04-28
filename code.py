def get_max_score():
    scores = []
    for i in range(1, 11):
        score = int(input(f"Enter score of student {i}: "))
        scores.append(score)
    
    max_score = max(scores)
    print(f"The maximum score is: {max_score}")

get_max_score()
