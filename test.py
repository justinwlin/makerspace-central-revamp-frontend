import random
arr = [True, False, False, False]

k = 48


def q5(k):
    numTries = 0
    loop = True
    while(loop):
        counter = k
        for _ in range(k):
            if(counter == 0):
                loop = False
                return
            idxChosen = random.randint(0,3)
            value = arr[idxChosen]
            if(numTries / 1000000 == 1):
                k-= 1
                numTries = 0
                print('reset')
            
            if(value == False):
                counter -= 1
            else:
                numTries += 1
                break
            if(numTries % 10000 == 0):
                print("numtries: " + str(numTries) + " K: " + str(k) +\
                     " consecutive vanillas: " + str(counter) + " idx chosen: " + str(idxChosen))
q5(2)