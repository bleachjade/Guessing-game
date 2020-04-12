with open('app\\views\\randomNoun.txt', 'r') as f:
    myNames = f.read().splitlines()
    print(myNames)