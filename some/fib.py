n = 1000000

def fibonacci(n):
    if n <=1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)
for i in range(n):
    print(fibonacci(i))
    
# fiblist = []
# for i in range(n):
#     fiblist.append(fibonacci(i))

# # print(fiblist)


# num = 4321
# reverse= 0
# while num > 0:
#     digit = num % 10
#     reverse = reverse * 10 + digit 
#     # num = int(num / 10)
#     num = num // 10

# print( "reverse:: " , reverse)

# planets = [("Mercury", 70), ("Venus", 41), ("Mars", 78), ("Jupiter", 628), ("Saturn", 1274)]

# # Use a lambda function to filter planets based on distance
# close_planets = list(filter(lambda planet: planet[1] < 100, planets))

# print(close_planets)  # Outputs: [('Mercury', 70), ('Venus', 41), ('Mars', 78)]

# list_of_builtins = dir(__builtins__)

# # print(list_of_builtins)

# import builtins
# import inspect

# categories = {
#     "Functions": [],
#     "Types": [],
#     "Exceptions": [],
#     "Constants": []
# }

# for name in dir(builtins):
#     obj = getattr(builtins, name)

#     if inspect.isbuiltin(obj):
#         categories["Functions"].append(name)
#     elif inspect.isclass(obj):
#         if issubclass(obj, BaseException):
#             categories["Exceptions"].append(name)
#         else:
#             categories["Types"].append(name)
#     else:
#         categories["Constants"].append(name)


# # Pretty table printing
# for category, items in categories.items():
#     print(f"\n{category}")
#     print("-" * len(category))
#     for item in sorted(items):
#         print(item)


data = [
    {"name": "Marcus", "age": 28, "city": "New York"},
    {"name": "Sarah", "age": 22, "city": "Seattle"},
    {"name": "Kevin", "age": 45, "city": "Chicago"},
    {"name": "Anya", "age": 31, "city": "Austin"},
    {"name": "David", "age": 19, "city": "Miami"}
]

# Sorting by age (youngest to oldest)
# data.sort(key=lambda person: person['age'])

# Displaying the result
# for person in data:
#     print(person)

# print((lambda x, y: x if x > y else y)(-10, 20))