def estimate_cost(days, people):
    return days * people * 3000

def check_budget(budget, estimated_cost):
    if budget >= estimated_cost:
        return "Budget is sufficient"
    else:
        return "Budget is NOT sufficient"
