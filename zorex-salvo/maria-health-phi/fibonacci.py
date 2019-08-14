count = 20
prev = 0
next = 1

for x in range(count):

    if prev % 3 == 0:
        print('Maria')

    elif prev % 5 == 0:
        print('Health')

    elif prev % 5 == 0 and prev % 3 == 0:
        print('Maria Health')

    else:
        print(prev)

    current = prev + next
    prev = next
    next = current
