import os
path = '/sneaky huh'
files = os.listdir(path)
i = 0

for file in files:
    print("renamed {}".format(file))
    os.rename(os.path.join(path, file), os.path.join(path, str(i)+'.jpg'))
    i = i+1
