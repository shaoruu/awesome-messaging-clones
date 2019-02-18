import os
import base64
import string
import random


def removed_none(input):
    return {k: v for k, v in input.items() if v}


# removes none type and strips strings
def clean_input(input):
    cleaned_input = removed_none(input)
    for key in cleaned_input:
        if isinstance(cleaned_input[key], str):
            cleaned_input[key] = cleaned_input[key].strip()
    return cleaned_input


def id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def image_as_base64(image_file, format='jpeg'):
    if not os.path.isfile(image_file):
        return image_file

    encoded_string = ''
    with open(image_file, 'rb') as img_f:
        encoded_string = base64.b64encode(img_f.read()).decode('utf-8')
    return 'data:image/png;base64,{}'.format(encoded_string)
