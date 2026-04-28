sentence = 'automation in python'

splitted = sentence.split(' ')
print(splitted)
for word in splitted:
    print(word[::-1], end=' ')
print()   
    
number = [1,1,2,1,3,2,4]
unique = set(number)
print(unique)