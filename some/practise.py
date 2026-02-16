# questions = (("What is the capital of France?", ["London", "Paris", "Berlin"], "Paris"),)
# print(questions[0][1][questions[0][2].index("a")][2])


# data = (("apple", 150), ("banana", 120), ("cherry", 200))
# print(data[data[1][1] // 100 - 1][0][1])
 
# ListEmpty = []
# print(len(ListEmpty))

Num = [101, 201, 145]
Num
# print(len(Num))
# print("type(Num):::",type(Num))
# NumTuple = (10,['thget',"greger"])

# print("NumTuple::::",NumTuple)
# print("type(NumTuple)::::",type(NumTuple))
# print("type(NumTuple[1]):::",type(NumTuple[1]))
# print("NumTuple[1]::::",NumTuple[1])

# NumTuple[1][:]=["hello","doctor"]

# print("NumTuple::::",NumTuple)
# print("type(NumTuple)::::",type(NumTuple))
# print("type(NumTuple[1]):::",type(NumTuple[1]))
# print("NumTuple[1]::::",NumTuple[1])


# # input size of the list
# n = int(input("Enter the size of list : "))
# # store integers in a list using map,
# # split and strip functions
# lst = list(map(int, input("Enter the integer\
# elements:").strip().split()))[:n]

# # printing the list
# print('The list is:', lst)

# def list_methods():
#     i : int =0
#     for method in dir(list):
#         if '__' not in method:
#             i +=1
#             print(i,method,sep=":")

# list_methods()

# prolanglist = ["C++", "Java", "Python", "orange", "kiwi", "mango"]
# prolanglist[1:3] = ["C#", "Scala"]
# print(prolanglist)


# Defining the spaceship's storage compartment
storage_compartment = {
    "oxygen_tank", 
    "food_supply", 
    "first_aid_kit", 
    "emergency_flare"
}

# Checking if an item is in the set
has_oxygen_tank = "oxygen_tank" in storage_compartment
has_emergency_flare = "emergency_flare" in storage_compartment

print(f"Do we have an 'oxygen_tank'? {has_oxygen_tank}")
print(f"Do we have an 'emergency_flare'? {has_emergency_flare}")